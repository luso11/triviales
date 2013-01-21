# Create your views here.
# -*- encoding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from models import Game
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.contrib import auth
import hashlib

#Pagina inicial
#TODO: ponerla bonita!
def home(request):
    return render_to_response('home.html',context_instance=RequestContext(request))

#Pagina de acceso al juego
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = hashlib.sha224(request.POST['password']).hexdigest()
        user = authenticate(username=username, password=password)
        print user
        if user is not None:
            if user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect('games/'+str(user.id))
                # Redirect to a success page.
            else:
                return HttpResponseRedirect('register')
        else:
            return render_to_response('login.html',
                                {"mensaje": 'Ususario o contraseña incorrectos'},
                                context_instance=RequestContext(request))
            # Return an 'invalid login' error message.
    elif request.method == 'GET':
        t = loader.get_template('login.html')
        c = RequestContext(request)
        return HttpResponse(t.render(c))


#Pagina de registro
def register(request):
    t = loader.get_template('register.html')
    c = RequestContext(request)
    if request.method == 'POST':
        dict = request.POST
        user = User()
        user.username = dict['username']
        user.mail = dict['correo']
        user.password = hashlib.sha224(dict['password1']).hexdigest()
        user.save()
        return HttpResponseRedirect('games/'+str(user.id))
    return HttpResponse(t.render(c))

# Historial de partidas del jugador
#TODO: cambiar el orden del jugador en las partidas en que es user2
def games(request,id):
    usuario = User.objects.get(id = id)
    listado = list()
    for game in Game.objects.filter(user1 = usuario):
        if game not in listado:
            listado.append(game)
    for game in Game.objects.filter(user2 = usuario):
        juego = game
        usuario = game.user2
        juego.user1 = game.user2
        juego.user2 = game.user1
        print juego.user1
        print juego.user2
        listado.append(juego)
    listado.reverse()
    return render_to_response('games.html',
                             {'games_list': listado},
                             context_instance=RequestContext(request))

def actualGame(request):
    return render_to_response('games.html',context_instance = RequestContext(request))

def newgame(request):
    return render_to_response('newgame.html',context_instance = RequestContext(request))


"""
    Codigo para reusar en caso de crearPartida
    dict = request.POST
    if dict['otroUsuario'] != "":
        creaPartida(dict['otroUsuario'])
    elif dict['mail'] != "":
        creaPartidaMail(dict['mail'])
    else:
        creaPartidaRandom()
    """
def check_username_availability(request):
    try:
        User.objects.get(username=request.POST['username'])
        mensaje = '<div id="Error" style="color: red;">Usuario ya existente</div>'
        json = simplejson.dumps(mensaje)
        return HttpResponse(json, mimetype='application/json')
    except User.DoesNotExist:
        mensaje =  '<div id="Success" style="color: green;">Disponible</div>'
        json = simplejson.dumps(mensaje)
        return HttpResponse(json, mimetype='application/json')
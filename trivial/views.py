# Create your views here.
# -*- encoding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from models import Game
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.contrib import auth

#Pagina inicial
#TODO: ponerla bonita!
def home(request):

    return render_to_response('home.html',
                {"title": "Triviales"},
                context_instance=RequestContext(request))

#Pagina de acceso al juego
def login(request):
    title = "Triviales Login"
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username,password=password)
        if user is not None:
            if user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect('games/'+str(user.id))
            else:
                return HttpResponseRedirect('register')
        else:
            return render_to_response('login.html',
                                    {"mensaje": 'Ususario o contraseña incorrectos',
                                    "title": title},
                                    context_instance=RequestContext(request))
    elif request.method == 'GET':
        return render_to_response('login.html',
                {"mensaje": '',
                 "title": title},
            context_instance=RequestContext(request))

#Pagina de registro
def register(request):
    title = "Registro"
    if request.method == 'POST':
        dict = request.POST
        user = User.objects.create_user(dict['username'], dict['correo'], dict['password1'])
        user.save()
        usuario = authenticate(username = user.username, password = user.password)
        print usuario
        return HttpResponseRedirect('games/'+str(user.id))
    else:
        return render_to_response('register.html',
                {'title': title},
                context_instance=RequestContext(request))

# Historial de partidas del jugador
#TODO: cambiar el orden del jugador en las partidas en que es user2
def games(request,id):
    title = "Partidas"
    if not request.user.is_authenticated():
        return render_to_response('login.html',request)
    usuario = User.objects.get(id = id)
    listado = list()
    for game in Game.objects.filter(user1 = usuario):
        if game not in listado:
            listado.append(game)
    for game in Game.objects.filter(user2 = usuario):
        juego = game
        juego.user1 = game.user2
        juego.user2 = game.user1
        print 'user1: ',juego.user1
        print 'user2: ',juego.user2
        print 'game.user1: ',game.user1
        print 'game.user2: ',game.user2
        print 'game.id: ',game.id
        listado.append(juego)
    listado.reverse()
    return render_to_response('games.html',
                             {'games_list': listado,
                              'title': title,
                              'nombre': usuario.username},
                             context_instance=RequestContext(request))

def actualGame(request):
    return render_to_response('games.html',context_instance = RequestContext(request))

def newgame(request):
    print request.method, request.user
    if not request.user.is_authenticated():
        return login(request)
    elif request.method == "POST":
        dict = request.POST
        print dict
        if dict['otroUsuario'] != "":
            creaPartida(request.user,dict['otroUsuario'])
        elif dict['mail'] != "":
            creaPartidaMail(dict['mail'])
        else:
            creaPartidaRandom()
    else:
        return render_to_response('newgame.html',context_instance = RequestContext(request))

def creaPartida(user1,user2):
    print "hla"
    game = Game.objects.create()
    game.user1 = user1
    game.user2 = User.objects.get(id = user2)
    game.pos1 = game.pos2 = 1
    game.quesitos1 = game.quesitos2 = ""
    print game
    return render_to_response('home.html',{'title':"partida creada"},context_instance = RequestContext(request))

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
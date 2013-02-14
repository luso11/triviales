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
import random

quesitos_inicial = simplejson.dumps({'deportes': 0, 'ciencia': 0, 'series': 0, 'historia': 0, 'literatura': 0, 'juegos':0})

#Pagina inicial
def home(request):
    return render_to_response('home.html',
                {"title": "Triviales",
                 "logout": True},
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
                response = HttpResponseRedirect('games/'+str(user.id))
                response.set_cookie('user', user.id)
                return response
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
        authenticate(username = user.username, password = user.password)
        return HttpResponseRedirect('games/'+str(user.id))
    else:
        return render_to_response('register.html',
                {'title': title},
                context_instance=RequestContext(request))

# Historial de partidas del jugador
#TODO: cambiar el orden del jugador en las partidas en que es user2
def games(request,id):
    title = "Partidas"
    if not request.user.is_authenticated:
        return HttpResponseRedirect("/login")
    usuario = User.objects.get(id = id)
    listado = list()
    for game in Game.objects.filter(user1 = usuario):
        if game not in listado:
            listado.append(game)
    for game in Game.objects.filter(user2 = usuario):
        juego = game
        juego.user1 = game.user2
        juego.user2 = game.user1
    listado.reverse()
    return render_to_response('games.html',
                             {'games_list': listado,
                              'title': title},
                             context_instance=RequestContext(request))

#pantalla de partida
def actualGame(request,id):
    #1.- cargar partida de bbdd
    #2.- comprobar turno
    #3.- pintar tablero
    #4.- colocar posiciones
    return render_to_response('actualGame.html',context_instance = RequestContext(request))

def oponenteAleatorio(request):
    total = User.objects.count()
    num = random.randint(1,total)
    if num != request.user.id:
        return User.objects.get(id = num)
    else:
        return oponenteAleatorio(request)

def newgame(request):
    if not request.user.is_authenticated():
        return login(request)
    elif request.method == "POST":
        if request.POST['eleccion'] == "user":
            try:
                user2 = User.objects.get(username = request.POST['datos'])
                return creaPartida(request,request.user,user2)
            except User.DoesNotExist:
                return render_to_response('newgame.html',{'error': 1},context_instance = RequestContext(request))
        elif request.POST['eleccion'] == "mail":
            try:
                user2 = User.objects.get(email = request.POST['datos'])
                return creaPartida(request,request.user,user2)
            except User.DoesNotExist:
                return render_to_response('newgame.html',{'error': 1},context_instance = RequestContext(request))
        else:
            try:
                    user2 = oponenteAleatorio(request)
                    return creaPartida(request,request.user,user2)
            except User.DoesNotExist:
                return render_to_response('newgame.html',{'error': 1},context_instance = RequestContext(request))
    else:
        return render_to_response('newgame.html',context_instance = RequestContext(request))

def creaPartida(request,user1,user2):
    print "hola"
    game = Game.objects.create(user1=user1,user2=user2,pos1=1,pos2=1,quesitos1 = quesitos_inicial, quesitos2=quesitos_inicial,turno=1)
    print game
    return HttpResponseRedirect('/partida/'+str(game.id))

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


def logout_user(request):
    auth.logout(request)
    response = HttpResponseRedirect('/')
    response.delete_cookie("sessionid")
    response.delete_cookie("user")
    return response

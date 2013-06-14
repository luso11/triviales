# Create your views here.
# -*- encoding: utf-8 -*-
from re import T
from django.core.context_processors import request

from django.http import HttpResponseRedirect,HttpResponse
from django.template import RequestContext
from models import Game, Question
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.contrib import auth
from django.http import Http404
import random

#Pagina inicial
def home(request):
    return render_to_response('home.html',
                {"title": "Triviales",
                 "logout": True,
                 "volver": True},
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
                "title": title,
                "logout": True,
                "volver": True},
                context_instance=RequestContext(request))

    elif request.method == 'GET':
        return render_to_response('login.html',
                {"mensaje": '',
                    "title": title,
                    "logout": True,
                    "volver": True},
                    context_instance=RequestContext(request))

#Pagina de registro
def register(request):
    title = "Registro"
    if request.method == 'POST':
        dict = request.POST
        user = User.objects.create_user(dict['username'], dict['correo'], dict['password1'])
        user.save()
        usuario = authenticate(username=dict['username'],password=dict['password1'])
        auth.login(request, usuario)
        response = HttpResponseRedirect('games/'+str(usuario.id))
        response.set_cookie('user', usuario.id)
        return response
    else:
        return render_to_response('register.html',
                {'title': title,
                 "logout": True,
                 "volver": True},
                context_instance=RequestContext(request))

# Historial de partidas del jugador
def games(request,id):
    title = "Partidas"
    if not request.user.is_authenticated:
        return HttpResponseRedirect("/login")
    usuario = User.objects.get(id = id)
    listado_juega1 = list()
    listado_juega2 = list()
    listado_espera1 = list()
    listado_espera2 = list()
    for game in Game.objects.filter(user1 = usuario.id):
        print game.turno
        if (game.turno == 1):
            listado_juega1.append(game)
        else:
            listado_espera1.append(game)

    for game in Game.objects.filter(user2 = usuario.id):
        if (game.turno == 2):
            listado_juega2.append(game)
        else:
            listado_espera2.append(game)


    return render_to_response('games.html',
                             {'games_list_juega1': listado_juega1,
                              'games_list_juega2': listado_juega2,
                              'games_list_espera1': listado_espera1,
                              'games_list_espera2': listado_espera2,
                              'title': title,
                              "volver": True},
                              context_instance=RequestContext(request))

#pantalla de partida
def actualGame(request,id):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("/login")
    else:
    #1.- cargar partida de bbdd
        try:
            partida = Game.objects.get(id = id)
            #2.- comprobar turno y colocar posiciones
            if (request.user == partida.user1):
                posicionActualUsuario = partida.pos1
                posicionActualOtro = partida.pos2
                usuario = partida.user1
                rival = partida.user2
                if partida.turno == 1:
                    turno = True
                else:
                    turno = False
            else:
                posicionActualUsuario = partida.pos2
                posicionActualOtro = partida.pos1
                usuario = partida.user2
                rival = partida.user1
                if partida.turno == 2 :
                    turno = True
                else:
                    turno = False
            return render_to_response('actualGame.html',{'turno':turno,
                                                 'posicionActualUsuario':posicionActualUsuario,
                                                 'usuario':usuario,
                                                 'rival':rival,
                                                 'posicionActualOtro':posicionActualOtro},
                                                  context_instance = RequestContext(request))
        except:
            return HttpResponseRedirect('/')

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
    game = Game.objects.create(user1=user1,user2=user2,pos1=1,pos2=1,
        rombitos1 = simplejson.dumps({"Ciencia":0, "Deportes":0, "Historia":0, "Espectaculos":0, "Literatura":0}),
        rombitos2 = simplejson.dumps({"Ciencia":0, "Deportes":0, "Historia":0, "Espectaculos":0, "Literatura":0}),
        turno=1)
    return HttpResponseRedirect('/partida/'+str(game.id))

def logout_user(request):
    auth.logout(request)
    response = HttpResponseRedirect('/')
    response.delete_cookie("sessionid")
    response.delete_cookie("user")
    return response

def pregunta(request):
    if not request.user.is_authenticated():
        return login(request)
    elif request.method == "GET":
        try:
            questions = Question.objects.filter(category = request.GET['tipo'])
            tope =  questions.count()
            num = random.randint(0,tope-1)
            pregunta = questions[num]
            json = simplejson.dumps({"pregunta":pregunta.question,"respuesta_correcta":pregunta.correct_answer,
                                    "respuesta_incorrecta1":pregunta.wrong_answer_1,
                                    "respuesta_incorrecta2":pregunta.wrong_answer_2,
                                    "respuesta_incorrecta3":pregunta.wrong_answer_3,})
            return HttpResponse(json,mimetype ='application/json')
        except:
            raise Http404

def cambia_turno(request):
    if request.method == "POST":
        partida = Game.objects.get(id=request.POST['id'])
        if partida.turno == 1:
            partida.turno = 2
        else:
            partida.turno = 1
        #Actualizamos la posicion del usuario que acaba de fallar.
        if request.user == partida.user1:
            partida.pos1 = request.POST['posicionActualUsuario']
        else:
            partida.pos2 = request.POST['posicionActualUsuario']

        partida.save()

        return HttpResponse('ok')
#funcion de actualizacion de los rombitos de cada jugador
def rombito(request):
    if request.method == "POST":
        partida = Game.objects.get(id=request.POST['id'])
        if (request.user == partida.user1):
            rombitos = simplejson.loads(partida.rombitos1)
        else:
            rombitos = simplejson.loads(partida.rombitos2)

        rombitos[request.POST['clase']] = 1
        if (request.user == partida.user1):
            partida.rombitos1 = simplejson.dumps(rombitos)
        else:
            partida.rombitos2 = simplejson.dumps(rombitos)

        partida.save()
        if ((rombitos["Historia"] == 1) and (rombitos["Ciencia"] == 1) and (rombitos["Literatura"] == 1) and
            (rombitos["Espectaculos"] == 1) and (rombitos["Deportes"] == 1)):
            partida.turno = 0;
            partida.save()
            return HttpResponse('fin')
        else:
            return HttpResponse('ok')

def fichas(request):
    if request.method == "GET":
        partida = Game.objects.get(id=request.GET['id'])
        if (request.user == partida.user1):
            rombitos1 = partida.rombitos1
            rombitos2 = partida.rombitos2
        else:
            rombitos1 = partida.rombitos2
            rombitos2 = partida.rombitos1



        json = simplejson.dumps({"rombitos1":rombitos1,"rombitos2":rombitos2})
        return HttpResponse(json,mimetype ='application/json')

def borrar(request):
    if not request.user.is_authenticated():
        return login(request)
    elif request.method == "POST":
        game = Game.objects.get(id=request.POST['id'])
        game.delete()
        return HttpResponse('ok')

def posicion(request):
    if not request.user.is_authenticated():
        return login(request)
    elif request.method == "POST":
        game = Game.objects.get(id=request.POST['id'])
        if (request.user == game.user1):
            game.pos1 = request.POST['posicion']
        else:
            game.pos2 = request.POST['posicion']
        game.save()
    return HttpResponse('ok')

def compruebaNombreDisponible(request):
    if request.method == "GET":
        try:
            user = User.objects.get(username=request.GET['username'])
            return HttpResponse('error')
        except:
            return HttpResponse('ok')


def compruebaMailDisponible(request):
    if request.method == "GET":
        try:
            user = User.objects.get(email=request.GET['correo'])
            return HttpResponse('error')
        except:
            return HttpResponse('ok')

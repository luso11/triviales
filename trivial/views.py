# Create your views here.
# -*- encoding: utf-8 -*-
from re import T

from django.http import HttpResponseRedirect,HttpResponse
from django.template import RequestContext
from models import Game, Question
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.contrib import auth
import random

quesitos_inicial = simplejson.dumps({'deportes': 0, 'ciencia': 0, 'espectaculo': 0, 'historia': 0, 'literatura': 0})

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
        print username,password;
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
        authenticate(username = user.username, password = user.password)
        return HttpResponseRedirect('games/'+str(user.id))
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
        return HttpResponseRedirect("/login");
    usuario = User.objects.get(id = id);
    listado_enviados = list()
    for game in Game.objects.filter(user1 = usuario.id):
        if game not in listado_enviados:
            listado_enviados.append(game);

    listado_recibidos = list()
    for game in Game.objects.filter(user2 = usuario.id):
        if game not in listado_recibidos:
            listado_recibidos.append(game)


    return render_to_response('games.html',
                             {'games_list_enviados': listado_enviados,
                              'games_list_recibidos': listado_recibidos,
                              'title': title,
                              "volver": True},
                              context_instance=RequestContext(request))

#pantalla de partida
def actualGame(request,id):
    #1.- cargar partida de bbdd
    partida = Game.objects.get(id = id);
    #2.- comprobar turno y colocar posiciones
    if (request.user == partida.user1):
        posicionActualUsuario = partida.pos1;
        posicionActualOtro = partida.pos2;
        if partida.turno == 1:
            turno = True;
        else:
            turno = False;
    else:
        posicionActualUsuario = partida.pos2;
        posicionActualOtro = partida.pos1;
        if partida.turno == 2 :
            turno = True;
        else:
            turno = False;
    return render_to_response('actualGame.html',{'turno':turno,
                                                 'posicionActualUsuario':posicionActualUsuario,
                                                 'posicionActualOtro':posicionActualOtro},
                                                  context_instance = RequestContext(request))

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
    game = Game.objects.create(user1=user1,user2=user2,pos1=1,pos2=1,quesitos1 = quesitos_inicial, quesitos2=quesitos_inicial,turno=1)
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
            questions = Question.objects.filter(category = request.GET['tipo']);
            tope =  questions.count();
            num = random.randint(0,tope-1)
            pregunta = questions[num]
            json = simplejson.dumps({"pregunta":pregunta.question,"respuesta_correcta":pregunta.correct_answer,
                                    "respuesta_incorrecta1":pregunta.wrong_answer_1,
                                    "respuesta_incorrecta2":pregunta.wrong_answer_2,
                                    "respuesta_incorrecta3":pregunta.wrong_answer_3,});
            return HttpResponse(json,mimetype ='application/json')
        except:
            return HttpResponse("error")

def cambia_turno(request):
    if not request.user.is_authenticated():
        return login(request)
    elif request.method == "POST":
        partida = Game.objects.get(id=request.POST['id']);
        if partida.turno == 1:
            partida.turno = 2;
        else:
            partida.turno = 1;
        #Actualizamos la posicion del usuario que acaba de fallar.
        if request.user == partida.user1:
            partida.pos1 = request.POST['posicionActualUsuario'];
        else:
            partida.pos2 = request.POST['posicionActualUsuario'];

        partida.save();
        return HttpResponse('ok');

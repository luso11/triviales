# Create your views here.
# -*- encoding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from models import Usuario
from django.contrib.auth import authenticate
from django.shortcuts import render_to_response
from django.utils import simplejson

#Pagina inicial
#TODO: ponerla bonita!
def home(request):
    t = loader.get_template('home.html')
    c = RequestContext(request, {'time': 'bar'})
    return HttpResponse(t.render(c))

#Pagina de acceso al juego
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                django.contrib.auth.login(request, user)
                return HttpResponseRedirect('games')
                # Redirect to a success page.
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
#TODO: validar nombre libre
def register(request):
    t = loader.get_template('register.html')
    c = RequestContext(request)
    if request.method == 'POST':
        dict = request.POST
        user = Usuario()
        user.username = dict['username']
        user.mail = dict['correo']
        user.password = dict['password1']
        user.save()
        return HttpResponseRedirect('games')
    return HttpResponse(t.render(c))

# Historial de partidas del jugador
#TODO: todo
def games(request):
    t = loader.get_template('games.html')
    c = RequestContext(request)
    return HttpResponse(t.render(c))


def check_username_availability(request):
    try:
        Usuario.objects.get(username=request.POST['username'])
        mensaje = '<div id="Error" style="color: red;">Usuario ya existente</div>'
        json = simplejson.dumps(mensaje)
        return HttpResponse(json, mimetype='application/json')
    except Usuario.DoesNotExist:
        mensaje =  '<div id="Success" style="color: green;">Disponible</div>'
        json = simplejson.dumps(mensaje)
        return HttpResponse(json, mimetype='application/json')
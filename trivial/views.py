# Create your views here.

from django.core.context_processors import request
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader, Context
from django.contrib.auth.models import User
from django.contrib import auth

#Pagina inicial
#TODO: ponerla bonita!
def home(request):
    t = loader.get_template('home.html')
    c = RequestContext(request, {'time': 'bar'})
    return HttpResponse(t.render(c))

#Pagina de acceso al juego
#TODO: mirar por que no coge los usuarios de la bbdd.
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # Redirect to a success page.
            else:
                # Return a 'disabled account' error message
                print "hola"
        else:
            print "hoal"
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
        user = User.objects.create(dict['username'],dict['correo'],dict['clave1'])
        user.save()
        HttpResponseRedirect('home.html')
    return HttpResponse(t.render(c))

# Historial de partidas del jugador
#TODO: todo
def games(request):
    t = loader.get_template('games.html')
    c = RequestContext(request)
    return HttpResponse(t.render(c))
# Create your views here.

from django.core.context_processors import request
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from models import User
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
    t = loader.get_template('login.html')
    c = RequestContext(request)
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['clave']
        user = auth.authenticate(username=username, password=password)

        if user is not None :
        # Correct password, and the user is marked "active"
            auth.login(request, user)
            # Redirect to a success page.
            return HttpResponseRedirect("/games")
        else:
        # Show an error page
            return HttpResponseRedirect("/login")
    else:
        return HttpResponse(t.render(c))

#Pagina de registro
#TODO: validar nombre libre
def register(request):
    t = loader.get_template('register.html')
    c = RequestContext(request)
    if request.method == 'POST':
        user = User()
        dict = request.POST
        user.username = dict['username']
        user.email = dict['correo']
        user.password = dict['clave1']
        user.save()
        HttpResponseRedirect('home.html')
    return HttpResponse(t.render(c))

# Historial de partidas del jugador
#TODO: todo
def games(request):
    t = loader.get_template('games.html')
    c = RequestContext(request)
    return HttpResponse(t.render(c))
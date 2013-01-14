# Create your views here.
from django.core.context_processors import request
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django import forms
from models import User

class RegForm (forms.Form):
    usuario = forms.CharField()
    mail = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput(render_value=False))
    confirmar_password = forms.CharField(widget=forms.PasswordInput(render_value=False))

def home(request):
    t = loader.get_template('home.html')
    c = RequestContext(request, {'time': 'bar'})
    return HttpResponse(t.render(c))


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

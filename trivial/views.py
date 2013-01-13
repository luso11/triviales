# Create your views here.
from django.core.context_processors import request
from django.http import HttpResponse
from django.template import RequestContext, loader
from django import forms
from django.shortcuts import render_to_response
from django.forms.formsets import formset_factory
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
    if request.method == 'POST':
        user = User()
        user.email = request.POST.mail
        print "hola"
    else:
        print "adios"
    return render_to_response('register.html')

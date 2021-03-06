from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'trivial.views.home', name='home'),
    url(r'^register$', 'trivial.views.register', name='register'),
    url(r'^login$', 'trivial.views.login', name='login'),
    url(r'^logout$', 'trivial.views.logout_user', name='logout'),
    url(r'^games/(\d+)/$', 'trivial.views.games', name='games'),
    url(r'^newgame$', 'trivial.views.newgame', name='newgame'),
    url(r'^partida/(\d+)/$', 'trivial.views.actualGame', name='partida'),
    url(r'^pregunta$', 'trivial.views.pregunta'),
    url(r'^cambia_turno$', 'trivial.views.cambia_turno'),
    url(r'^rombito$', 'trivial.views.rombito'),
    url(r'^fichas$', 'trivial.views.fichas'),
    url(r'^borrar$', 'trivial.views.borrar'),
    url(r'^posicion$', 'trivial.views.posicion'),

    # url(r'^triviales/', include('triviales.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

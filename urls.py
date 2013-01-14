from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'trivial.views.home', name='home'),
    url(r'^register$', 'trivial.views.register', name='register'),
    url(r'^login$', 'trivial.views.login', name='login'),
    url(r'^games$', 'trivial.views.games', name='games'),

    # url(r'^triviales/', include('triviales.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

#__author__ = 'lalonso'

from trivial.models import Question, User, Game
from django.contrib import admin

admin.site.register(Question)
admin.site.register(User)
admin.site.register(Game)
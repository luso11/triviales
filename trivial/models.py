# -*- encoding: utf-8 -*-

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

CATEGORY_CHOICES = (
    ('deportes', 'Deportes'),
    ('historia', 'Historia'),
    ('espectaculos', 'Espectáculos'),
    ('ciencia', 'Ciencia'),
    ('literatura', 'Literatura'),
    )

class Question(models.Model):
    category = models.CharField(max_length=20,
                                choices=CATEGORY_CHOICES)
    question = models.CharField(max_length=200,unique=True)
    correct_answer = models.CharField(max_length=200)
    wrong_answer_1 = models.CharField(max_length=200)
    wrong_answer_2 = models.CharField(max_length=200)
    wrong_answer_3 = models.CharField(max_length=200)
    def __unicode__(self):
        return self.question

class Game (models.Model):
    user1 = models.ForeignKey(User, related_name = "user1")
    user2 = models.ForeignKey(User, related_name = "user2")
    pos1 = models.IntegerField()
    pos2 = models.IntegerField()
    turno = models.IntegerField()
    #json string
    quesitos1 = models.CharField(max_length=200)
    quesitos2 = models.CharField(max_length=200)
    def __unicode__(self):
        return str(self.id)


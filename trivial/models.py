from django.db import models

# Create your models here.

CATEGORY_CHOICES = (
    ('deportes', 'Deportes'),
    ('historia', 'Historia'),
    ('seriesTv', 'Series de TV'),
    ('ciencia', 'Ciencia'),
    ('literatura', 'Literatura'),
    ('juegosMesa', 'Juegos de mesa'),
    )

class Question(models.Model):
    category = models.CharField(max_length=20,
                                choices=CATEGORY_CHOICES)
    question = models.CharField(max_length=200,unique=True)
    correct_answer = models.CharField(max_length=200)
    wrong_answer_1 = models.CharField(max_length=200)
    wrong_answer_2 = models.CharField(max_length=200)
    wrong_answer_3 = models.CharField(max_length=200)
    wrong_answer_3 = models.CharField(max_length=200)
    is_quesito = models.BooleanField(default=False)
    def __unicode__(self):
        return self.question

class Game (models.Model):
    user1 = models.CharField(max_length=200);
    user2 = models.CharField(max_length=200);


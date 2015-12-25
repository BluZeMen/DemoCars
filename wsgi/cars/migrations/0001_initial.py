# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('model', models.CharField(unique=True, max_length=100)),
                ('price', models.FloatField(default=0)),
                ('description', models.TextField(default='')),
                ('date', models.DateField()),
                ('created_at', models.CharField(default='', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('slug', models.SlugField(unique=True, max_length=100)),
                ('body', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('image', models.ImageField(upload_to='./photos', max_length=250)),
                ('car', models.ForeignKey(to='cars.Car')),
            ],
        ),
    ]

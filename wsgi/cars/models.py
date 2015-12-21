from django.db import models

# Create your models here.


class Photo(models.Model):
	image = models.ImageField(upload_to='./photos', max_length=250)
	car = models.ForeignKey('Car')

	def __str__(self):
		return str(self.car)+' '+str(self.image)


class Car(models.Model):
	@property
	def photo(self):
		return Photo.objects.filter(car=self)
	model = models.CharField(max_length=100, unique=True)
	price = models.FloatField(default=0)
	desciption = models.TextField(default='')
	date = models.DateField()
	created_at = models.CharField(max_length=255, default='')

	def __str__(self):
		return self.model


class Page(models.Model):
	slug = models.SlugField(max_length=100, unique=True)
	body = models.TextField(default='')

	def __str__(self):
		return self.slug



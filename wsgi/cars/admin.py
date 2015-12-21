from django.contrib import admin
from .models import Car, Page, Photo



@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
	pass


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
	pass


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
	pass
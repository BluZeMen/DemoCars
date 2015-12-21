from django.shortcuts import redirect
from django.http import JsonResponse
from django.conf import settings


def index(request):
    return redirect(settings.STATIC_URL+'cars/index.html')

def server_info(request):
	info = {
		'static_url': settings.STATIC_URL,
		'media_url': settings.MEDIA_URL
	}
	return JsonResponse(info)
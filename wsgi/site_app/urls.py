"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import views as auth_views
from filebrowser.sites import site as filebrowser


urlpatterns = [

    url(r'^admin/filebrowser/', include(filebrowser.urls)),
    # url(r'^admin_tools/', include('admin_tools.urls')),
    url(r'^admin/', include('smuggler.urls')),  # backups

    # Reset password
    url(r'^admin/reset/complete/$',
        'django.contrib.auth.views.password_reset_complete',
        name='password_reset_complete'),

    url(r'^admin/resetpassword/$',
        'django.contrib.auth.views.password_reset',
        name='admin_password_reset'),

    url(r'^admin/reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        'django.contrib.auth.views.password_reset_confirm',
        name='password_reset_confirm'),

    url(r'^admin/reset/done/$',
        'django.contrib.auth.views.password_reset_done',
        name='password_reset_done'),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^', include('cars.urls')),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

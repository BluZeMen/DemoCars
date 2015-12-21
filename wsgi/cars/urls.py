from django.conf.urls import include, url
from .api import api
from .views import index, server_info


urlpatterns = [
    url(r'^$', index),
    url(r'^api/server-info/$', server_info),
    url(r'^api/',  include(api.urls)),
]

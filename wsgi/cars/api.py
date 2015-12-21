from tastypie.serializers import Serializer
from tastypie.resources import ModelResource
from tastypie.api import Api
from .models import Car, Page



class CarSerializer(Serializer):
	def format_date(self, data):
		return data.strftime("%Y-%m-%d")


class CarResource(ModelResource):
	class Meta:
		queryset = Car.objects.all()
		resource_name = 'car'
		allowed_methods = ['get', 'post', 'delete', 'put']
		always_return_data = True
		serializer = CarSerializer()

	def dehydrate(self, bundle):
		photos = [p.image for p in bundle.obj.photo]
		bundle.data['photo'] = photos
		return bundle


class PageResource(ModelResource):
	class Meta:
		queryset = Page.objects.all()
		resource_name = 'page'
		allowed_methods = ['get', 'post', 'put']
		always_return_data = True
		detail_uri_name = 'slug'



api = Api(api_name='v1')
api.register(CarResource())
api.register(PageResource())

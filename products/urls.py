from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, SizeViewSet, ProductSizeViewSet, CategoryUpdateViewSet, ProductUpdateViewset

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)
router.register('sizes', SizeViewSet)
router.register('product-sizes', ProductSizeViewSet)
router.register('categoryupdate', CategoryUpdateViewSet, basename='category-update')  # fix applied here
router.register('productupdate',ProductUpdateViewset, basename='product-update')




urlpatterns = [
    path('', include(router.urls)),
]

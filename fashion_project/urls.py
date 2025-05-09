from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # User registration & authentication
    path('api/users/', include('users.urls')),

    # Product-related APIs
    path('api/products/', include('products.urls')),  # Assuming you meant to namespace products here
]

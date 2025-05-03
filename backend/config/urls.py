from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # Ajoutez ici vos routes d'applications
    # path('api/', include('apps.api.urls')),  # À adapter selon vos apps
    # path('users/', include('apps.users.urls')),  # Exemple
    # path('vendors/', include('apps.vendors.urls')),  # Exemple
    # path('products/', include('apps.products.urls')),  # Exemple
    # path('orders/', include('apps.orders.urls')),  # Exemple
    # path('notifications/', include('apps.notifications.urls')),  # Exemple
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
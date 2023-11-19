from django.urls import path
from .views import ColorExtractionListCreateView

urlpatterns = [
    path('api/colors/', ColorExtractionListCreateView.as_view(), name='color_list_create'),
]
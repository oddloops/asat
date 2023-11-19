from rest_framework import serializers
from .models import ColorExtraction

class ColorExtractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorExtraction
        fields = '__all__'
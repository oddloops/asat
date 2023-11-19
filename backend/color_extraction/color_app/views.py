from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import ColorExtraction
from .serializers import ColorExtractionSerializer
from PIL import Image
from io import BytesIO
import json

# Create your views here.
class ColorExtractionListCreateView(generics.ListCreateAPIView):
    queryset = ColorExtraction.objects.all()
    serializer_class = ColorExtractionSerializer

    def perform_create(self, serializer):
        # Process the uploaded image
        uploaded_image = self.request.data.get('image')
        image = Image.open(uploaded_image)

        # Extract all colors
        extracted_colors = get_all_colors(image)

        # Save extracted colors to the model
        serializer.save(image=uploaded_image, extracted_colors=extracted_colors)

# Extracts colors from image
def get_all_colors(image):
    small_large = image.resize((100, 100))
    rgb_image = small_large.convert('RGB')
    pixels = list(rgb_image.getdata())
    unique_colors = set(pixels)
    hex_color = [f"#{r:02x}{g:02x}{b:02x}" for r, g, b in unique_colors]
    return hex_color
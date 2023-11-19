from django.db import models

# Create your models here.
class ColorExtraction(models.Model):
    image = models.ImageField(upload_to='/uploads')
    extracted_colors = models.JSONField(default=list)
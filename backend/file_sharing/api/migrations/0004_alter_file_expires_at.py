# Generated by Django 5.1.6 on 2025-03-06 07:17

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_file_downloads'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='expires_at',
            field=models.DateTimeField(default=api.models.two_days_later),
        ),
    ]

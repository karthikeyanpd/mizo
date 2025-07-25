# Generated by Django 5.1.5 on 2025-07-05 15:17

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mizoapp', '0002_alter_hotel_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='payment_method',
            field=models.CharField(default='credit card', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='phone',
            field=models.CharField(default='0000000000', max_length=15),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='special_requests',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='booking',
            name='children',
            field=models.IntegerField(default=0),
        ),
    ]

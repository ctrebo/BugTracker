# Generated by Django 3.2.5 on 2022-04-17 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bugTracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='job',
            field=models.CharField(max_length=15),
        ),
    ]

# Generated by Django 4.1 on 2023-01-07 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bugTracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='priority',
            field=models.IntegerField(blank=True, choices=[(3, 'High'), (2, 'Middle'), (1, 'Low')], max_length=1),
        ),
        migrations.AlterField(
            model_name='issue',
            name='status',
            field=models.CharField(blank=True, choices=[('o', 'Open'), ('p', 'In Progrss'), ('r', 'Resolved')], default='o', max_length=1),
        ),
    ]

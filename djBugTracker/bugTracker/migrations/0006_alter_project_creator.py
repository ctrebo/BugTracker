# Generated by Django 3.2.5 on 2022-04-19 10:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bugTracker', '0005_alter_issue_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects_as_creator', to=settings.AUTH_USER_MODEL),
        ),
    ]
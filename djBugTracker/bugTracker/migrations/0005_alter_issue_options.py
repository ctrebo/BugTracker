# Generated by Django 3.2.5 on 2022-04-17 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bugTracker', '0004_alter_issue_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='issue',
            options={'ordering': ['priority']},
        ),
    ]

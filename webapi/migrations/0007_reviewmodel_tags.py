# Generated by Django 4.0.3 on 2022-04-06 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0006_remove_reviewmodel_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviewmodel',
            name='tags',
            field=models.TextField(default=''),
        ),
    ]

# Generated by Django 3.2.5 on 2022-08-13 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapi', '0006_alter_courseviews_courseid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courserating',
            name='course_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='courserating', to='webapi.category'),
        ),
    ]
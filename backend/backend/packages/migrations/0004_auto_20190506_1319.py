# Generated by Django 2.1.1 on 2019-05-06 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0003_auto_20190419_1234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='from_wilaya',
            field=models.CharField(default='0', max_length=255),
        ),
    ]
# forms.py
from django import forms

class ProjectFilterForm(forms.Form):
    newcomer_friendly_choices = [
        ('', 'All'),
        ('True', 'Newcomer Friendly'),
        ('False', 'Not Newcomer Friendly'),
    ]

    newcomer_friendly = forms.ChoiceField(choices=newcomer_friendly_choices, required=False)

    active_choices = [
        ('', 'All'),
        ('Active', 'Active'),
        ('Not Active', 'Not Active')
    ]

    status = forms.ChoiceField(choices=active_choices, required=False)

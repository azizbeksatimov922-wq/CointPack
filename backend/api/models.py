from django.db import models
from django.contrib.auth.models import User

class BankCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    card_number = models.CharField(max_length=16)
    bank_name = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.bank_name} - {self.card_number[-4:]}"

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, default='Boshqa')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    note = models.TextField(blank=True, null=True)
    is_voice = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class SavingsGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    daily_amount = models.DecimalField(max_digits=10, decimal_places=2)
    scheduled_time = models.TimeField()
    penalty_enabled = models.BooleanField(default=True)
    card = models.ForeignKey(BankCard, on_delete=models.SET_NULL, null=True)

class Job(models.Model):
    title = models.CharField(max_length=100)
    salary = models.CharField(max_length=50)
    location_type = models.CharField(max_length=20, choices=[('uzb', 'Oʻzbekiston'), ('foreign', 'Chet el')])
    platform = models.CharField(max_length=50)
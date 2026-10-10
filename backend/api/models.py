from django.db import models

class TelegramUser(models.Model):
    CARD_CHOICES = (
        ('standard', 'Standard Card'),
        ('gold', 'CoinCard Gold'),
        ('vip', 'CoinCard VIP'),
    )

    telegram_id = models.BigIntegerField(unique=True, null=True, blank=True)
    username = models.CharField(max_length=150, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=30, null=True, blank=True)
    coins = models.IntegerField(default=1000)
    is_premium = models.BooleanField(default=False)
    is_vip = models.BooleanField(default=False)
    card_type = models.CharField(max_length=20, choices=CARD_CHOICES, default='standard')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.coins} coins)"

class BankCard(models.Model):
    card_number = models.CharField(max_length=20, unique=True)
    card_holder = models.CharField(max_length=100)
    bank_name = models.CharField(max_length=100, default='CoinCard Gold')
    balance = models.IntegerField(default=50)

    def __str__(self):
        return f"{self.card_number} - {self.card_holder}"

class Expense(models.Model):
    title = models.CharField(max_length=255, default='Xarajat')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, default='Oziq-ovqat')
    date = models.CharField(max_length=50, default='Hozir')

    def __str__(self):
        return f"{self.title}: {self.amount}"

class SavingsGoal(models.Model):
    name = models.CharField(max_length=255)
    target_amount = models.IntegerField(default=0)
    current_amount = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    salary = models.CharField(max_length=100)
    location = models.CharField(max_length=100, default='Toshkent')
    contact = models.CharField(max_length=100, default='@hr_admin')

    def __str__(self):
        return f"{self.title} - {self.company}"

class ContactMessage(models.Model):
    sender = models.CharField(max_length=150)
    phone = models.CharField(max_length=50, null=True, blank=True)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.sender}"

class MessageReply(models.Model):
    message = models.ForeignKey(ContactMessage, related_name='replies', on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
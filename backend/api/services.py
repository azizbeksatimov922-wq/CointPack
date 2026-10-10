from django.db import transaction
from api.models import TelegramUser

def process_coin_transfer(sender_id: int, receiver_username: str, amount: int):
    receiver_username = receiver_username.replace("@", "").strip()
    
    with transaction.atomic():
        try:
            sender = TelegramUser.objects.select_for_update().get(telegram_id=sender_id)
        except TelegramUser.DoesNotExist:
            return False, "Foydalanuvchi topilmadi!"

        if sender.coins < amount:
            return False, "Sizda yetarli coin mavjud emas!"

        try:
            receiver = TelegramUser.objects.select_for_update().get(username__iexact=receiver_username)
        except TelegramUser.DoesNotExist:
            return False, f"@{receiver_username} ushbu foydalanuvchi topilmadi!"

        # Transaktsiya amali
        sender.coins -= amount
        receiver.coins += amount
        
        sender.save()
        receiver.save()
        
        return True, f"Muvaffaqiyatli! {amount} coin @{receiver_username} ga o'tkazildi."

def add_instagram_reward(telegram_id: int):
    user, created = TelegramUser.objects.get_or_create(telegram_id=telegram_id)
    # VIP bo'lsa 2 baravar ko'p (10 coin), aks holda 5 coin
    reward = 10 if user.is_vip else 5
    user.coins += reward
    user.save()
    return reward
from django.db import transaction
from api.models import TelegramUser

# 1. Instagram topshirig'i (VIP bo'lsa 2x coin berish)
def reward_instagram_user(telegram_id: int):
    user, created = TelegramUser.objects.get_or_create(telegram_id=telegram_id)
    # VIP bo'lsa 2 baravar ko'p (10 coin), aks holda 5 coin
    reward = 10 if user.is_vip else 5
    user.coins += reward
    user.save()
    return reward

# 2. Coin o'tkazish (Masalan: Nurbekdan Azizbekka 50 coin)
def transfer_coins_service(sender_id: int, receiver_username: str, amount: int):
    clean_username = receiver_username.replace("@", "").strip()
    
    with transaction.atomic():
        try:
            sender = TelegramUser.objects.select_for_update().get(telegram_id=sender_id)
        except TelegramUser.DoesNotExist:
            return False, "Foydalanuvchi topilmadi!"

        if sender.coins < amount:
            return False, "Sizda yetarli coin mavjud emas!"

        try:
            receiver = TelegramUser.objects.select_for_update().get(username__iexact=clean_username)
        except TelegramUser.DoesNotExist:
            return False, f"@{clean_username} foydalanuvchisi topilmadi!"

        sender.coins -= amount
        receiver.coins += amount
        
        sender.save()
        receiver.save()
        
        return True, f"Muvaffaqiyatli! {amount} coin @{clean_username} ga o'tkazildi."

# 3. VIP Obuna sotib olish
def buy_vip_service(telegram_id: int):
    try:
        user = TelegramUser.objects.get(telegram_id=telegram_id)
    except TelegramUser.DoesNotExist:
        return False, "Foydalanuvchi topilmadi!"
        
    if user.coins < 100:
        return False, "VIP obuna uchun 100 coin kerak!"
        
    user.coins -= 100
    user.is_vip = True
    user.save()
    return True, "Siz VIP statusga ega bo'ldingiz! Endi topshiriqlardan 2x coin olasiz."
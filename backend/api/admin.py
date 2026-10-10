from aiogram import Router, F
from aiogram.types import Message
from database import get_all_users

admin_router = Router()
ADMIN_ID = 123456789  # Bu yerga o'zingizning Telegram ID'ingizni yozing!

@admin_router.message(F.text == "/admin")
async def cmd_admin(message: Message):
    if message.from_user.id != ADMIN_ID:
        await message.answer("Siz admin emassiz!")
        return

    users = get_all_users()
    text = f"📊 **Jami foydalanuvchilar:** {len(users)} ta\n\n"
    
    for u in users:
        tg_id, username, name, coins, is_vip, card = u
        vip_status = "👑 VIP" if is_vip else "Oddiy"
        text += f"👤 **{name}** (@{username})\nID: `{tg_id}` | Coin: {coins} | Status: {vip_status} | Karta: {card}\n---\n"
    
    await message.answer(text, parse_mode="Markdown")
from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
from services import reward_instagram_user, transfer_coins_service, buy_vip_service
from api.models import TelegramUser
from fastapi import APIRouter

user_router = APIRouter()
router = Router()

# Instagram Obuna buyrug'i
@router.message(Command("instagram"))
async def cmd_instagram(message: Message):
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🔗 @abdulhaqov_801", url="https://instagram.com/abdulhaqov_801")],
        [InlineKeyboardButton(text="✅ Obunani tasdiqlash", callback_data="check_insta")]
    ])
    await message.answer("Instagram akkauntimizga obuna bo'ling va coin oling:", reply_markup=kb)

@router.callback_query(F.data == "check_insta")
async def process_insta_check(call: CallbackQuery):
    reward = reward_instagram_user(call.from_user.id)
    await call.message.edit_text(f"Tasdiqlandi! Hisobingizga {reward} coin qo'shildi!")

# /transfer azizibelksatimov 50
@router.message(Command("transfer"))
async def cmd_transfer(message: Message):
    args = message.text.split()
    if len(args) < 3:
        await message.answer("Format xato! Misol: `/transfer azizibelksatimov 50`", parse_mode="Markdown")
        return

    receiver_username = args[1]
    try:
        amount = int(args[2])
    except ValueError:
        await message.answer("Miqdor raqamda bo'lishi kerak!")
        return

    success, msg = transfer_coins_service(message.from_user.id, receiver_username, amount)
    await message.answer(msg)

# VIP va Karta Do'koni
@router.message(Command("shop"))
async def cmd_shop(message: Message):
    user = TelegramUser.objects.filter(telegram_id=message.from_user.id).first()
    
    text = "🛒 **Coin Do'koni**\n\n" \
           "👑 **VIP Obuna** (100 coin) - Topshiriqlardan 2x ko'p coin beradi.\n"
    
    buttons = [
        [InlineKeyboardButton(text="👑 VIP status sotib olish (100 coin)", callback_data="buy_vip")]
    ]

    # Faqat Telegram Premium borlarga Gold va VIP karta imkoniyati
    if user and user.is_premium:
        text += "\n💳 Sizda Telegram Premium bor! CoinCard Gold va VIP kartalarini ochishingiz mumkin."
        buttons.append([InlineKeyboardButton(text="💳 CoinCard Gold/VIP ochish", callback_data="open_card")])
    else:
        text += "\n⚠️ *CoinCard Gold va VIP kartalari faqat Premium foydalanuvchilar uchun!*"

    kb = InlineKeyboardMarkup(inline_keyboard=buttons)
    await message.answer(text, reply_markup=kb, parse_mode="Markdown")

@router.callback_query(F.data == "buy_vip")
async def process_buy_vip(call: CallbackQuery):
    success, msg = buy_vip_service(call.from_user.id)
    await call.answer(msg, show_alert=True)
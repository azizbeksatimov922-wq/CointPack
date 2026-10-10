
import os

# 1. Django sozlamalarini belgilash
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

# 2. Django'ni FastAPI routerlaridan oldin ishga tushirish
import django
django.setup()

# 3. FastAPI importlari
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 4. Router importi — Django setup'dan keyin
from handlers import user_router

# 5. FastAPI ilovasi
app = FastAPI(
    title="CoinPack API",
    description="CoinPack backend API",
    version="1.0.0",
)

# 6. Frontend bilan ulanish uchun CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production'da frontend domening bilan almashtir
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 7. Telegram/user routerini ulash
app.include_router(user_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "CoinPack API ishlayapti!"
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}
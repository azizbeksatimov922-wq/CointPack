from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from schemas import TransferRequest, TransferResponse
from services import process_card_transfer
from models import Card

# Database jadvallarini yaratish
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CointPack Payment & Core API")

# 1. FRONTEND UCHUN CORS SOZLAMASI (404 / Blocked xatolarini oldini olish uchun)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Real loyihada frontend domenini kiriting
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. TEST KARTALARINI YARATISH ENDPOINTI
@app.post("/seed-cards", status_code=status.HTTP_201_CREATED)
def seed_test_cards(db: Session = Depends(get_db)):
    if not db.query(Card).first():
        card1 = Card(card_number="8600123456789012", holder_name="Nurbekjon", balance=500000.0)
        card2 = Card(card_number="8600987654321098", holder_name="Sokina", balance=100000.0)
        db.add_all([card1, card2])
        db.commit()
        return {"message": "Test kartalari yaratildi: 8600123456789012 va 8600987654321098"}
    return {"message": "Kartalar allaqachon mavjud"}

# 3. KARTADAN KARTAGA PUL O'TKAZISH (P2P) API
@app.post("/api/v1/transfer", response_model=TransferResponse)
def transfer_money(request: TransferRequest, db: Session = Depends(get_db)):
    return process_card_transfer(db, request)

# 4. FRONTEND SO'RAYOTGAN LEKIN 404 BÖLAYOTGAN TEMPORARY (VAQTINCHALIK) ROUTERLAR
# Oxirida / bõlsa ham, bõlmasa ham ishlashi uchun ikkala varianti qo'shildi

@app.get("/api/expenses")
@app.get("/api/expenses/")
def get_expenses():
    return []

@app.get("/api/jobs")
@app.get("/api/jobs/")
def get_jobs():
    return []

@app.get("/api/goals")
@app.get("/api/goals/")
def get_goals():
    return []
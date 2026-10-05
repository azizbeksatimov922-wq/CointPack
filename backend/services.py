from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from models import Card, Transaction
from schemas import TransferRequest

def process_card_transfer(db: Session, request: TransferRequest):
    # Self-transfer tekshiruvi
    if request.from_card_number == request.to_card_number:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bitta kartadan o'ziga pul o'tkazib bo'lmaydi."
        )

    # 1. Kartalarni bazadan qidirish
    from_card = db.query(Card).filter(Card.card_number == request.from_card_number).first()
    to_card = db.query(Card).filter(Card.card_number == request.to_card_number).first()

    if not from_card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Yuboruvchi karta topilmadi.")
    if not to_card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Qabul qiluvchi karta topilmadi.")

    # 2. Balans yetarliligini tekshirish
    if from_card.balance < request.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Karta balansida yetarli mablag' mavjud emas."
        )

    try:
        # 3. Tranzaksiyani bajarish
        from_card.balance -= request.amount
        to_card.balance += request.amount

        # 4. Tranzaksiya tarixiga yozish
        new_transaction = Transaction(
            from_card_id=from_card.id,
            to_card_id=to_card.id,
            amount=request.amount,
            status="SUCCESS"
        )
        db.add(new_transaction)
        
        # O'zgarishlarni bazaga saqlash
        db.commit()
        db.refresh(new_transaction)

        return {
            "status": "success",
            "message": "Pul muvaffaqiyatli o'tkazildi",
            "transaction_id": new_transaction.id,
            "amount": request.amount,
            "new_balance": from_card.balance
        }

    except Exception as e:
        db.rollback()  # Xatolik yuz bersa, barcha amallarni bekor qilish
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Tranzaksiyada xatolik yuz berdi: {str(e)}"
        )
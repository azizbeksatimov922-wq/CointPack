from pydantic import BaseModel, Field

class TransferRequest(BaseModel):
    from_card_number: str = Field(..., min_length=16, max_length=16, description="Yuboruvchi karta (16 xona)")
    to_card_number: str = Field(..., min_length=16, max_length=16, description="Qabul qiluvchi karta (16 xona)")
    amount: float = Field(..., gt=0, description="O'tkazma summasi (0 dan katta bo'lishi shart)")

class TransferResponse(BaseModel):
    status: str
    message: str
    transaction_id: int
    amount: float
    new_balance: float
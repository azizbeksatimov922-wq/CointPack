from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    card_number = Column(String(16), unique=True, index=True, nullable=False)
    holder_name = Column(String(100), nullable=False)
    balance = Column(Float, default=0.0, nullable=False)

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    from_card_id = Column(Integer, ForeignKey("cards.id"), nullable=False)
    to_card_id = Column(Integer, ForeignKey("cards.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String(20), default="SUCCESS")
    created_at = Column(DateTime, default=datetime.utcnow)
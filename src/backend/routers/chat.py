from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Message
from services import create_message
from pydantic import BaseModel
from typing import List

router = APIRouter()

class MessageCreate(BaseModel):
    user_id: int
    content: str

@router.post("/send")
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    return create_message(db, message.user_id, message.content)

@router.get("/history/{user_id}", response_model=List[MessageCreate])
def get_message_history(user_id: int, db: Session = Depends(get_db)):
    messages = db.query(Message).filter(Message.user_id == user_id).all()
    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for user")
    return messages
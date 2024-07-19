from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from stripe_service import create_checkout_session
from config import STRIPE_PUBLISHABLE_KEY

router = APIRouter()

class PaymentRequest(BaseModel):
    amount: int  # Amount in cents
    success_url: str
    cancel_url: str

@router.post("/create-checkout-session")
def create_checkout(payment_request: PaymentRequest):
    try:
        session_id = create_checkout_session(
            amount=payment_request.amount,
            success_url=payment_request.success_url,
            cancel_url=payment_request.cancel_url
        )
        return {"sessionId": session_id, "publishableKey": STRIPE_PUBLISHABLE_KEY}
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import User, Subscription, Message
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_user(db: Session, email: str, password: str):
    try:
        # Validate email format (simple check)
        if "@" not in email:
            raise ValueError("Invalid email format")
        
        hashed_password = get_password_hash(password)
        db_user = User(email=email, hashed_password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise ValueError("User with this email already exists")
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Error creating user: {str(e)}")

def create_subscription(db: Session, user_id: int, start_date: datetime, months: int):
    try:
        # Validate months
        if months <= 0:
            raise ValueError("Months must be greater than 0")
        
        end_date = start_date + timedelta(days=30 * months)
        db_subscription = Subscription(user_id=user_id, start_date=start_date, end_date=end_date)
        db.add(db_subscription)
        db.commit()
        db.refresh(db_subscription)
        return db_subscription
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Error creating subscription: {str(e)}")

def create_message(db: Session, user_id: int, content: str):
    try:
        # Validate content
        if not content.strip():
            raise ValueError("Content cannot be empty")
        
        db_message = Message(user_id=user_id, content=content)
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return db_message
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Error creating message: {str(e)}")
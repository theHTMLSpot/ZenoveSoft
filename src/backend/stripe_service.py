import stripe
from config import STRIPE_SECRET_KEY

# Initialize Stripe with your secret key
stripe.api_key = STRIPE_SECRET_KEY

def create_checkout_session(amount: int, currency: str = 'usd', success_url: str = '', cancel_url: str = ''):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': currency,
                        'product_data': {
                            'name': 'Subscription Charge',
                        },
                        'unit_amount': amount,
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=success_url,
            cancel_url=cancel_url,
        )
        return session.id
    except Exception as e:
        raise RuntimeError(f"Error creating Stripe checkout session: {str(e)}")
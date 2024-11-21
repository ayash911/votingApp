from app import db
from models import User

def seed_admin():
    admin = User.query.filter_by(username='admin').first()
    if not admin:
        admin = User(username='admin', password='adminpassword', is_admin=True)
        db.session.add(admin)
        db.session.commit()

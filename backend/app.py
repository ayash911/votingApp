from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__, static_folder="../frontend/build", static_url_path="/static")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the app
db = SQLAlchemy(app)

# Routes
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/login", methods=["POST"])
def login():
    from models import User
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        return jsonify({"message": "Login successful", "is_admin": user.is_admin}), 200
    return jsonify({"message": "Invalid credentials"}), 400

@app.route("/api/register", methods=["POST"])
def register():
    from models import User
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message": "User already exists"}), 400
    new_user = User(username=data['username'], password=data['password'], is_admin=False)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Registration successful"}), 201

@app.route("/api/vote", methods=["POST"])
def vote():
    from models import User, Vote
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    if Vote.query.filter_by(user_id=user.id).first():
        return jsonify({"message": "Already voted"}), 400
    vote = Vote(user_id=user.id, vote_choice=data['choice'])
    db.session.add(vote)
    db.session.commit()
    return jsonify({"message": "Vote casted successfully"}), 200

@app.route("/api/votes_count", methods=["GET"])
def votes_count():
    from models import Vote
    count = Vote.query.count()
    return jsonify({"votes_count": count}), 200

# Database initialization
def init_db():
    # Creating tables and seeding within the app context
    with app.app_context():
        db.create_all()

def seed_admin():
    from models import User
    with app.app_context():
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(username='admin', password='admin', is_admin=True)
            db.session.add(admin)
            db.session.commit()

# Main entry point
if __name__ == "__main__":
    init_db()  # Create the database tables
    seed_admin()  # Seed the admin user
    app.run(debug=True)

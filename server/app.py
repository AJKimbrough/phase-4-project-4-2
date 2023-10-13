#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy import text
from seed import create_products


# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import Product, User, ShoppingCart, Order

# Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

@app.route('/seed-data', methods=['POST'])
def seed_data():
    products = [
			{
				'name': 'CryptoPunks',
				'description': 'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.',
				'price': '1762.23',
				'image_url': 'https://i.seadn.io/gcs/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&w=750'
            },
            {
				'name':'Bored Ape Yacht Club',
				'description':'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation.',
				'price':'1762.23',
				'image_url': 'https://ik.imagekit.io/bayc/assets/ape3.png'
            },
            {
				'name':'Mutant Ape Yacht Club',
				'description':'The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.',
				'price':'1762.23',
				'image_url': 'https://i.seadn.io/gcs/files/0a3759a0c9456a60dda2c18bae4b6fbd.png?auto=format&w=750'
            },
            {
				'name':'Azuki',
				'description':'Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. We rise together. We build together. We grow together.',
				'price':'1760.79',
				'image_url': 'https://i.seadn.io/gcs/files/fef02bf7825bbd538f89d0cb7690b25e.png?auto=format&w=750'
            },
    ]
    for product in products:
            product = Product(
                name=product['name'],
                description=product['description'],
                price=product['price'],
                image_url=product['image_url']
            )
            db.session.add(product)
    db.session.commit()


@app.route('/products', methods=['GET'])
def products():
    if request.method == 'GET':
        products = Product.query.all()

        return make_response(
            jsonify([product.to_dict() for product in products]),
            200,
        )
    return make_response(
        jsonify({"text": "Method Not Allowed"}),
        405,
    )

class Register(Resource):

    def post(self):
        
        new_user = User(
            username=request.json['username'],
            email=request.json['email'],

        )
        new_user.password_hash = request.json['password']

        db.session.add(new_user)
        db.session.commit()

        response_dict = new_user.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response
    
api.add_resource(Register, '/register', endpoint="")

class Login(Resource):

    def post(self):

        email = request.get_json()['email']
        user = User.query.filter(User.email == email).first()

        password = request.get_json()['password']

        if user.authenticate(password):
            session['username'] = user.username
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401
    
api.add_resource(Login, '/login', endpoint='login')

@app.route("/logout", methods =["DELETE"])
def logout():
    if session.get("username"):
        session.clear()
        return {}, 204
    return {"message": "unauthorized"}, 404

@app.route('/profile', methods=['PUT'])
def update_profile():
    try:
        user_id = request.json.get('username')
        user = User.query.get(user_id)

        if user:
            user.username = request.json.get('username', user.username)
            user.email = request.json.get('email', user.email)

            db.session.commit()

            return jsonify({'message': 'Profile updated successfully'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(port=5555, debug=True)


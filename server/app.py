#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy import text


# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import Product, User, ShoppingCart, Order

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

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
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 401
api.add_resource(Login, '/login', endpoint='login')
    
class GetUser(Resource):
    def get(self):
        
        user_id = session.get('user_id')
        if user_id is None:
            return {'error': 'User not logged in'}, 401

       
        user = User.query.get(user_id)

        if user is None:
            return {'error': 'User not found'}, 404

        return user.to_dict(), 200

api.add_resource(GetUser, '/get_user', endpoint='get_user')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


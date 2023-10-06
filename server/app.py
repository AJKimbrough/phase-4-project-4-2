#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
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
            username=request.form['username'],
            email=request.form['email'],
            password=request.form['password']
        )

        db.session.add(new_user)
        db.session.commit()

        response_dict = new_user.to_dict()

        response = make_response(
            response_dict,
            201,
        )
        return response
    
api.add_resource(Register, '/register')

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()

#     username = data.get('username')
#     email = data.get('email')
#     password = data.get('password')
    
#     sql = text('INSERT INTO "user" (username, email, password) VALUES (:username, :email, :password)')
#     db.session.execute(sql, {'username': username, 'email': email, 'password': password})
#     db.session.commit()

#     response_data ={
#         'message': 'Registration successful' 
#     }
#     return jsonify(response_data), 200

class Login(Resource):

    def post(self):

        username = request.get_json()['username']
        user = User.query.filter(User.username == username)
        password = request.get_json()['password']

        if user.authenticate(password):
            db.session['user_id'] = user.id
            return user.to_dict(), 200
        
        return {'error': 'Invalid username or password'}, 401
api.add_resource(Login, '/login', endpoint='login')
    

# @app.route('/products')
# def products():

#     products = []
#     for product in Product.query.all():
#         product_dict = {
#             "name": product.name,
#             "description": product.description,
#             "price": product.price,
#             "image_url": product.image_url,
#         }
#         products.append(product_dict)

#     response = make_response(
#         jsonify(products),
#         200,
#         {"Content-Type": "application/json"}
#     )

#     return response


# class Product(Resource):
    
#     def get(self):
#         products = [product.to_dict() for product in Product.query.all()]
#         return products, 200
# api.add_resource(Product, '/products',endpoint='products')


if __name__ == '__main__':
    app.run(port=5555, debug=True)


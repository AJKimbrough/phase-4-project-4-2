#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Product, User, ShoppingCart, Order

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Product(Resource):
    def get(self):
        products = [product.to_dict() for product in Product.query.all()]
        return products, 200
api.add_resource(Product, '/product')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

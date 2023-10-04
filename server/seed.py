#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Product, User, ShoppingCart, Order



# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         print("Starting seed...")
#         # Seed code goes here!

#from flask import Flask
#from app import app  # Import your Flask app and SQLAlchemy db instance
#from faker import Faker

# Initialize Faker
fake = Faker()

# Create an application context
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Adjust the database URI as needed
# db.init_app(app)

with app.app_context():



    def create_fake_products(num_products):
        products = []
        for _ in range(num_products):
            product = Product(
                name=fake.word(),
                description=fake.sentence(),
                price=fake.random_int(min=1, max=1000),
                image_url=fake.image_url(width=200, height=200)  # Generate a fake image URL
            )
            products.append(product)
        db.session.bulk_save_objects(products)
        db.session.commit()

    # Function to create fake users
    def create_fake_users(num_users):
        users = []
        for _ in range(num_users):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password(),
            )
            users.append(user)
        db.session.bulk_save_objects(users)
        db.session.commit()

def create_fake_carts(num_carts):
    carts = []
    for _ in range(num_carts):
        user_id = fake.random_int(min=1, max=User.query.count())
        cart = ShoppingCart(user_id=user_id)
        
        # Generate a list of fake products for the cart
        num_products_in_cart = fake.random_int(min=1, max=10)
        cart.products = Product.query.order_by(func.random()).limit(num_products_in_cart).all()
        
        carts.append(cart)
    
    # Add the carts and associated products to the session
    db.session.add_all(carts)
    
    # Commit the session
    db.session.commit()

# Function to create fake orders
def create_fake_orders(num_orders):
    orders = []
    for _ in range(num_orders):
        user_id = fake.random_int(min=1, max=User.query.count())
        order = Order(user_id=user_id)
        
        # Generate a list of fake products for the order
        num_products_in_order = fake.random_int(min=1, max=10)
        order.products = Product.query.order_by(func.random()).limit(num_products_in_order).all()
        
        orders.append(order)
    
    # Add the orders and associated products to the session
    db.session.add_all(orders)
    
    # Commit the session
    db.session.commit()

    if __name__ == '__main__':
        num_fake_products = 50
        num_fake_users = 20
        num_fake_carts = 30
        num_fake_orders = 10

        create_fake_products(num_fake_products)
        create_fake_users(num_fake_users)
        create_fake_carts(num_fake_carts)
        create_fake_orders(num_fake_orders)

        db.session.commit()

    print("Dummy data has been generated.")

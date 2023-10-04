from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)  # Add this field for image URLs

    # ... other fields and relationships ...

    def __init__(self, name, description, price, image_url=None):
        self.name = name
        self.description = description
        self.price = price
        self.image_url = image_url  # Initialize the image_url field

    # ... other methods ...

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url  # Include the image URL in serialization
        }

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    # Add more fields as needed

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

# Shopping Cart Model (Many-to-Many Relationship between User and Product)
# Modify the cart_product_association table
cart_product_association = db.Table(
    'cart_product_association',
    db.Column('cart_id', db.Integer, db.ForeignKey('shopping_cart.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'))
)


class ShoppingCart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    products = db.relationship('Product', secondary=cart_product_association, backref='carts')
    # Add more fields as needed

    def __init__(self, user_id):
        self.user_id = user_id

# Order Model (One-to-Many Relationship between User and Order)
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # No direct relationship with products here

    def __init__(self, user_id):
        self.user_id = user_id

    # Define a method to get the products associated with this order
    def get_products(self):
        return Product.query.join(cart_product_association).filter(
            cart_product_association.c.cart_id == self.id
        ).all()

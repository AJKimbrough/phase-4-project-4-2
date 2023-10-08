# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db' #'postgresql://nft_marketplace_963o_user:3Vcv03YVzDLCGXUiUBe9k4coZm8RyswJ@dpg-ckfhid7s0fgc73cn2gq0-a.oregon-postgres.render.com/nft_marketplace_963o'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.secret_key = b'\x14\xc5\xd0\x02\xfe\xc0\x16m#\xbd\x07\xeb<\x17\xe6\xcc'


# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

bcrypt = Bcrypt(app)

# Instantiate CORS
CORS(app)

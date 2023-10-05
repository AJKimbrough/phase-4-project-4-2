#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from sqlalchemy import func

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

# Initialize Faker
fake = Faker()


def create_products():
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
            {
				'name':'Otherdeed for Otherside',
				'description':"Otherdeed is the key to claiming land in Otherside. Each have a unique blend of environment and sediment — some with resources, some home to powerful artifacts. And on a very few, a Koda roams.",
				'price':"1877.38",
				'image_url': "https://i.seadn.io/gcs/files/9566a717e815f9208db7a4ab34ebca4c.jpg?auto=format&w=750"
            },
            {
				'name': "Chromie Squiggle by Snowfro",
				'description': "Simple and easily identifiable, each squiggle embodies the soul of the Art Blocks platform. Consider each my personal signature as an artist, developer, and tinkerer. Public minting of the Chromie Squiggle is permanently paused. They are now reserved for manual distribution to collectors and community members over a longer period of time. Please visit OpenSea to explore Squiggles available on the secondary market.",
				'price': "1756.90",
				'image_url': "https://i.seadn.io/gcs/files/89799d17b8c6d0e70831a64be40eacc6.png?auto=format&w=750"
            },
            {
				'name': "Autoglyphs",
				'description': "Autoglyphs are the first “on-chain” generative art on the Ethereum blockchain. A completely self-contained mechanism for the creation and ownership of an artwork.",
				'price': "1758.60",
				'image_url': "https://openseauserdata.com/files/08e4aa933d8ddd97ea8116d594262ad9.svg"
            },
            {
				'name': "DeGods",
				'description': "A deflationary collection of degenerates, punks, and misfits. Gods of the metaverse & masters of our own universe. Powered by the Solana Blockchain. Your DeGod gives you the ability to mine DUST, access to our NFT tracking mobile app DYOR, membership into our community, and tons of other cool sh*t. DeGods can be converted to DeadGods with DUST.",
				'price': "1758.60",
				'image_url': "https://i.seadn.io/gcs/files/4825965193b5acd24167efd027ca6201.png?auto=format&w=750"
            },
            {
				'name': "The Sandbox",
				'description': "The Sandbox is a community-driven platform where creators can monetize voxel assets and gaming experiences on the blockchain. The Sandbox metaverse comprises a map made up of 166,464 LANDS. LAND owners can host contests and events, stake SAND to earn and customize assets, monetize assets and experiences, vote in the metaverse governance, play games that you or others create, and more! Trade the collection and keep your eyes peeled for future drops.",
				'price': "1758.60",
				'image_url': "https://i.seadn.io/gcs/files/06eb7d5e959b977357eba255a5c0b645.webp?auto=format&w=750"
            },
            {
				'name': "The Captainz",
				'description': "9,999 PIRATE CAPTAINZ SEARCHING FOR THE LEGENDARY MEMELAND.9,999 Captainz, with their pirate crewz, explore the Broken Seas in search of the legendary treasure known as “Memeland”. Join them in their quests for glory, fortune, love, and of course… memes.",
				'price': "1762.23",
				'image_url': "https://i.seadn.io/gcs/files/f2847e3d707aad3a67e681e82744f218.gif?auto=format&w=750"
            },
            {
				'name': "Clone X",
				'description': "20,000 next-gen Avatars, by RTFKT and Takashi Murakami",
				'price': "5135.52",
				'image_url': "https://i.seadn.io/gcs/files/f137576e06d9fc7c4bdc7813ce09ed82.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Fidenza",
				'description': "Fidenza is by far my most versatile algorithm to date. Although the program stays focused on structured curves and blocks, the varieties of scale, organization, texture, and color usage it can employ create a wide array of generative possibilities.",
				'price': "96878",
				'image_url': "https://i.seadn.io/gcs/files/fed8f96fc2412873bbe59a5efe70710d.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Bored Ape Kennel Club",
				'description': "It gets lonely in the swamp sometimes. That's why every ape should have a four-legged companion. To curl up at your feet. To bring you a beer. To fire a missile launcher at that bastard Jimmy the Monkey. That's why we've started the Bored Ape Kennel Club, and why we're offering up a dog NFT for adoption to every single member of the BAYC for free (you only pay gas).",
				'price': "7267.11",
				'image_url': "https://i.seadn.io/gae/xfig7db1itooQp1n0WY5OUHZTIU1yEcKKBxb0rWYaDVSu9CrdgSIPDwtBC3zbnOF514-1nLRwasy-MFRxHQedsqZb9W1elCkXzQMPA?auto=format&dpr=1&w=1000"
            },
            {
				'name': "World of Women",
				'description': "World of Women is a collection of 10,000 NFTs that gives you full access to our network of artists, creators, entrepreneurs, and executives who are championing diversity and equal opportunity on the blockchain.",
				'price': "1531.07",
				'image_url': "https://i.seadn.io/gcs/files/3687f6fd900d42d35fdb5a171ccadfaa.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Pudgy Penguins",
				'description': "A collection 8888 Cute Chubby Pudgy Penguins sliding around on the freezing ETH blockchain.",
				'price': "8295.24",
				'image_url': "https://i.seadn.io/gcs/files/ec5cee3aabac8faee4492ca25d159f3e.png?auto=format&dpr=1&w=3840"
            },
            {
				'name': "Milady Maker",
				'description': "Milady Maker is a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by Tokyo street style tribes.",
				'price': "6934.84",
				'image_url': "https://i.seadn.io/gcs/files/e262bfc29f997d0943a6fab4ed91657c.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Otherside Koda",
				'description': "Kodas are celestial beings that reside in Otherside. About the Kodas origins and culture, little is known, but their magic and science keep Otherside thriving.",
				'price': "12163.28",
				'image_url': "https://i.seadn.io/gcs/files/05cf4e91f151dfa4d5fc4d96b2251195.webp?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Ringers",
				'description': "There are an almost infinite number of ways to wrap a string around a set of pegs. On the surface it may seem like a simple concept but prepare to be surprised and delighted at the variety of combinations the algorithm can produce. Each output from 'Ringers' is derived from a unique transaction hash and generated in Javascript in the browser. Feature variations include peg count, sizing, layout, wrap orientation, and a few colorful flourishes for good measure.",
				'price': "64294",
				'image_url': "https://i.seadn.io/gcs/files/361eb1fafeb0b608f67107055afe024f.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "The Potatoz",
				'description': "A long time ago, in a memetaverse far, far away… Memeland was a deserted land unsuitable for life. Until [redacted] years ago, early lifeforms started to appear. Memeland's first residents, it turns out, were a bunch of Potatoz. Who left the Potatoz there? The Potatoz is a collection of 9,999 utility-enabled PFPs. Each Potatoz is your entry ticket into the great Memeland ecosystem. They make for a great side dish, but some may feel a calling to become the main course. Rumour has it they are secretly related to the Memelist, $MEME, MVP, and more!",
				'price': "5305.50",
				'image_url': "https://i.seadn.io/gcs/files/5a4fe1d64087c8641ed57a892a2c34fb.gif?auto=format&dpr=1&w=1000"
            },
            {
				'name': "CryptoNinja Partners",
				'description': "Yama is Ibuki's partner in CryptoNinja.They seem to transform into various forms to carry out their missions...!",
				'price': "4.87",
				'image_url':  "https://i.seadn.io/gcs/files/e11e0182ff9e210477746f015088009b.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "BEANZ Official",
				'description': "BEANZ are a small species that sprouts from the dirt in the garden. They make for a great sidekick to an Azuki, although some like to kick it alone. They're earnestly driven by the desire to help. However, certain BEANZ feel a calling to pave their own path...",
				'price': "2220.51",
				'image_url': "https://i.seadn.io/gcs/files/0b4643ba0ac158f008d8afbee5765867.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "YOU THE REAL MVP",
				'description': "Over the last decade, 420 beautifully crafted gold trophies were discovered in different historical sites worldwide. They all have the same inscription:In i dór -o i greatest memes lies i greatest mír. Roughly translated, these words mean: In the Land of the Greatest Memes lies the Greatest Treasure.",
				'price': "104148.00",
				'image_url': "https://i.seadn.io/gcs/files/babe94fa7fac4c3f284ad00234639395.gif?auto=format&dpr=1&w=1000" 
            },
            {
				'name': "Otherdeed Expanded",
				'description': "These evolved Otherdeeds enable holders to play future games in the Yuga Labs universe. Each possesses its own unique blend of environment and sediment. Some contain resources, and some are home to powerful artifacts.",
				'price': "1254.83",
				'image_url': "https://i.seadn.io/gcs/files/7ace595c90aa6517a76a7f63337e47b3.jpg?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Doodles",
				'description': "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury. Burnt Toast is the working alias for Scott Martin, a Canadian based illustrator, designer, animator and muralist.",
				'price': "4379.23",
				'image_url': "https://i.seadn.io/gcs/files/f3de036fd4886b428d8b0ad2979afc8c.png?auto=format&dpr=1&w=1000"
            },
            {
				'name': "Decentraland",
				'description': "Decentraland is an Ethereum blockchain-powered virtual world, developed and owned by its users, who can create, experience, and monetize content and applications. Join a growing community of virtual world inhabitants who are building the world's largest alternate reality economy on the blockchain. In this store, you can buy and sell land assets in MANA, DCL's native currency.",
				'price': "909.80",
				'image_url': "https://i.seadn.io/gae/rT96-HEy1cAZJ6t3k1QPoZp5ZZhPik1umovLQzOgBBOtUo8E8bRtteVQdk3F54flRHTW-bS6333jAq0AWTJVbtSOQ4rUaXBsh20q9Q?auto=format&dpr=1&w=1000"
            }
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


def create_users(num_users):
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

def create_carts(num_carts):
    carts = []
    for _ in range(num_carts):
        user_id = fake.random_int(min=1, max=User.query.count())
        cart = ShoppingCart(user_id=user_id)
        
        num_products_in_cart = fake.random_int(min=1, max=10)
        cart.products = Product.query.order_by(func.random()).limit(num_products_in_cart).all()
        
        carts.append(cart)
    
    db.session.add_all(carts)
    db.session.commit()

def create_orders(num_orders):
    orders = []
    for _ in range(num_orders):
        user_id = fake.random_int(min=1, max=User.query.count())
        order = Order(user_id=user_id)
        
        num_products_in_order = fake.random_int(min=1, max=10)
        order.products = Product.query.order_by(func.random()).limit(num_products_in_order).all()
        
        orders.append(order)
    
    db.session.add_all(orders)
    db.session.commit()

# def delete():
#     Product.query.delete()
#     User.query.delete()
#     Order.query.delete()
#     ShoppingCart.query.delete()
#     db.session.commit()

if __name__ == '__main__':
    num_fake_users = 20
    num_fake_carts = 30
    num_fake_orders = 10
    
    with app.app_context():
        #delete()

        create_products()
        create_users(num_fake_users)
        create_carts(num_fake_carts)
        create_orders(num_fake_orders)


    print("Done")

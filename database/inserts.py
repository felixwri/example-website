import database as db

def insert_into_menu(reset_table=False):
    if reset_table:
        db.create_mains_table()


    default_image = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677508244/oaxaca/cat_l4vhvx.jpg'
    tortilla_chips = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784599/oaxaca/typtnwf3zbkyyyjlnhmk.png'


    #Starters
    db.add_item('Tortilla Chips & Salsas', tortilla_chips, 'Starters', 5.50, 150, True, 'None', 'Served with our homemade roasted salsa and pico de gallo.')
    db.add_item('Tortilla Chips & Guacamole', default_image, 'Starters', 6.00, 200, True,'None', 'Our famous guacamole is freshly made every day using fresh ingredients.')
    db.add_item('Nachos', 'Starters', default_image, 7.00, 306, True, 'Cheese, Jalapeños', 'Tortilla chips topped with jack cheese, roasted salsa, jalapeño cream cheese, sour cream and our famous guacamole.')
    db.add_item('Southwest Spring Rolls', 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784726/oaxaca/juhqhaqi4z4vpaotqurt.png','Starters', 7.00, 239, True, 'Cheese', 'Chipotle Mexican chicken, peppers & jack cheese folded in a flour tortilla, deep fried & served with our famous guacamole.')
    db.add_item('Grilled Chicken Wings', default_image, 'Starters', 7.50, 312, False, 'None', 'Grilled chicken with Lousiana Hot sauce.')
    #Mains
    db.add_item('Mexican Paella', default_image, 'Mains', 15.00, 300, False, 'Prawns', 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')
    db.add_item('Seafood Paella', default_image, 'Mains', 15.00, 200, False, 'Prawns, Nuts', 'Mexican rice cooked with chorizo, seafood cocktail, black tiger prawns, roasted salsa, peas, sweet corn and fresh coriander. (Hot)')
    db.add_item('Meat Paella', default_image, 'Mains', 15.00, 400, False, 'None', 'Slow cooked Mexican rice with chicken, chorizo, red salsa, peas & sweetcorn topped with grilled steak & bacon. (Hot)')
    db.add_item('Beef Carnitas Enchilada', default_image, 'Mains', 14.50, 410, False, 'None', 'Rolled flour or white corn tortillas (GF) filled with jack cheese, poblano chilli peppers and topped with creamy salsa, jalapeños & cheese. Oven baked and served over a bed of Mexican rice & our famous guacamole.')
    db.add_item('Poblano Chicken', default_image, 'Mains', 14.50, 350, False, 'None', 'Grilled chicken breast topped with red salsa, poblano chilli peppers, melted jack cheese, served with seasoned fries.')
    db.add_item('Mex Burger', default_image, 'Mains', 14.50, 600, False, 'Cheese', 'Beef burger folded in a flour tortilla with jack cheese, poblano chilli peppers & Chilli con Carne, served with pico de gallo, sour cream, our famous guacamole & Mexican rice.')
    #Desserts
    db.add_item('Ice Cream', default_image, 'Desserts', 4.00, 145, False, 'Milk', 'Two scoops, choose from vanilla, strawberry, chocolate, mint, mango or toffee.')
    db.add_item('Bunuelos', default_image, 'Desserts', 6.00, 212, False, 'None', 'Fried dough ball dusted with cinnamon sugar served with Dulce de Leche & chocolate fudge sauce.')
    db.add_item('Chocolate BROWNIE', default_image, 'Dessert', 6.00, 200, False, 'Milk', 'Warm chocolate fudge brownie served with vanilla ice cream.')
    db.add_item('Churros', default_image, 'Desserts', 6.50, 256, False, 'Milk', 'Mexican doughnut fried and dusted with cinnamon sugar with a side of Dulce de Leche & vanilla ice cream.')
    db.add_item('Banana Chimichanga', default_image, 'Desserts', 6.50, 200, False, 'Milk', 'A cinnamon flour tortilla filled with banana, deep fried and served with Dulce de Leche & vanilla ice cream.')
    #Soft Drinks, Beers, Ciders
    db.add_item("Coke Zero", default_image, "Soft Drinks", 3.30, 0, None, None, None)
    db.add_item("Coca-Cola", default_image, "Soft Drinks", 3.50, 139, None, None, None)
    db.add_item("Sprite", default_image, "Soft Drinks", 3.30, 110, None, None, None)
    db.add_item("Fanta", default_image, "Soft Drinks", 3.30, 120, None, None, None)
    db.add_item("Orange Juice", default_image, "Soft Drinks", 4.00, 30, None, None, None)
    db.add_item("Budweiser 4.5% ABV", default_image, "Beers", 5.50, 186, None, None, None)
    db.add_item("Mahou 5.1% ABV", default_image, "Beers", 6.50, 190, None, None, None)
    db.add_item("Corona 4.5% ABV", default_image, "Beers", 5.50, 175, None, None, None)
    db.add_item("Stella Cidre", default_image, "Ciders", 6.50, 150, None, None, None)
    db.add_item("Stella Cidre Raspberry", default_image, "Ciders", 7.00, 190, None, None, None)

def insert_admin_account():
    db.add_user("test", "password1234#")
    db.add_user("admin", "@dmin123456")
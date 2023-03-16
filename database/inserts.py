import database as db

def insert_into_menu(reset_table=False):
    if reset_table:
        db.create_mains_table()


    default_image = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677854073/oaxaca/eiqeecrmuinmlfsimvqz.png'
    #starters images
    tortilla_chips_salsa = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784599/oaxaca/typtnwf3zbkyyyjlnhmk.png'
    tortilla_chips_guacamole = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372078/oaxaca/Tortilla_Chips_and_Guacamole_ewbnzw.png' 
    southwest_rolls = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784726/oaxaca/juhqhaqi4z4vpaotqurt.png'
    grilled_wings = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784617/oaxaca/jkf38hutu4tgfsskhno0.png'
    #mains images
    mexican_paella = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784704/oaxaca/vfejqbqszdrgjj0xcgcs.png'
    seafood_paella = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784699/oaxaca/r0jv6o6jbhpwsizoop7y.png'
    meat_paella = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784625/oaxaca/cktpuybybttxubbunlpv.png'
    poblano_chicken = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784546/oaxaca/qyjln0yxjnyy4mdmsq7u.png'
    mex_burger = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677784538/oaxaca/m0dbuyo83rgisdwyfiqf.png'
    enchiladas = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372078/oaxaca/Beef_Carnitas_Enchiladas_sjdwkc.png'
    #desserts images
    icecream = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372077/oaxaca/Icecream_on1lwr.png'
    brownie = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677794360/oaxaca/Brownie_liikqq.png'
    churros = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677794369/oaxaca/Churros_vmce5b.png'
    bunuelos = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677794365/oaxaca/Bunuelos_yagtd1.png'
    chimichanga = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372077/oaxaca/Banana_Chimichanga_uakow3.png'
    #drinks images
    coca_cola = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372077/oaxaca/Coca_Cola_rhhmf5.png'
    sprite = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372077/oaxaca/Sprite_hwvxsa.png'
    fanta = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372077/oaxaca/Fanta_cgqjrw.png'
    coke_zero = 'https://res.cloudinary.com/djukm4fut/image/upload/v1678372077/oaxaca/Coke_Zero_qibtx1.png'
    #kids menu images
    beef_taco_cups = 'https://res.cloudinary.com/djukm4fut/image/upload/v1677854073/oaxaca/eiqeecrmuinmlfsimvqz.png'


    #Starters
    db.add_item('Tortilla Chips & Salsas', tortilla_chips_salsa, 'Starters', 5.50, 150, True, 'None', 'Served with our homemade roasted salsa and pico de gallo.')
    db.add_item('Tortilla Chips & Guacamole', tortilla_chips_guacamole, 'Starters', 6.00, 200, True,'None', 'Our famous guacamole is freshly made every day using fresh ingredients.')
    db.add_item('Nachos', 'Starters', default_image, 7.00, 306, True, 'Cheese, Jalapeños', 'Tortilla chips topped with jack cheese, roasted salsa, jalapeño cream cheese, sour cream and our famous guacamole.')
    db.add_item('Southwest Spring Rolls', southwest_rolls,'Starters', 7.00, 239, True, 'Cheese', 'Chipotle Mexican chicken, peppers & jack cheese folded in a flour tortilla, deep fried & served with our famous guacamole.')
    db.add_item('Grilled Chicken Wings', grilled_wings, 'Starters', 7.50, 312, False, 'None', 'Grilled chicken with Lousiana Hot sauce.')
    #Mains
    db.add_item('Mexican Paella', mexican_paella, 'Mains', 15.00, 300, False, 'Prawns', 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')
    db.add_item('Seafood Paella', seafood_paella, 'Mains', 15.00, 200, False, 'Prawns, Nuts', 'Mexican rice cooked with chorizo, seafood cocktail, black tiger prawns, roasted salsa, peas, sweet corn and fresh coriander. (Hot)')
    db.add_item('Meat Paella', meat_paella, 'Mains', 15.00, 400, False, 'None', 'Slow cooked Mexican rice with chicken, chorizo, red salsa, peas & sweetcorn topped with grilled steak & bacon. (Hot)')
    db.add_item('Beef Carnitas Enchilada', enchiladas, 'Mains', 14.50, 410, False, 'None', 'Rolled flour or white corn tortillas (GF) filled with jack cheese, poblano chilli peppers and topped with creamy salsa, jalapeños & cheese. Oven baked and served over a bed of Mexican rice & our famous guacamole.')
    db.add_item('Poblano Chicken', poblano_chicken, 'Mains', 14.50, 350, False, 'None', 'Grilled chicken breast topped with red salsa, poblano chilli peppers, melted jack cheese, served with seasoned fries.')
    db.add_item('Mex Burger', mex_burger, 'Mains', 14.50, 600, False, 'Cheese', 'Beef burger folded in a flour tortilla with jack cheese, poblano chilli peppers & Chilli con Carne, served with pico de gallo, sour cream, our famous guacamole & Mexican rice.')
    #Desserts
    db.add_item('Ice Cream', icecream, 'Desserts', 4.00, 145, False, 'Milk', 'Two scoops, choose from vanilla, strawberry, chocolate, mint, mango or toffee.')
    db.add_item('Bunuelos', bunuelos, 'Desserts', 6.00, 212, False, 'None', 'Fried dough ball dusted with cinnamon sugar served with Dulce de Leche & chocolate fudge sauce.')
    db.add_item('Fudge Brownie', brownie, 'Desserts', 6.50, 368, False, 'Milk', 'Warm chocolate fudge brownie with a choice of topping from rasberries, strawbberries or bananas. Served with vanilla ice cream and chocolate/toffee sauce.')
    db.add_item('Churros', churros, 'Desserts', 6.50, 256, False, 'Milk', 'Mexican doughnut fried and dusted with cinnamon sugar with a side of Dulce de Leche & vanilla ice cream.')
    db.add_item('Banana Chimichanga', chimichanga, 'Desserts', 6.50, 200, False, 'Milk', 'A cinnamon flour tortilla filled with banana, deep fried and served with Dulce de Leche & vanilla ice cream.')
    #Soft Drinks, Beers, Ciders
    db.add_item("Coke Zero", coke_zero, "Soft Drinks", 3.30, 0, None, None, None)
    db.add_item("Coca-Cola", coca_cola, "Soft Drinks", 3.50, 139, None, None, None)
    db.add_item("Sprite", sprite, "Soft Drinks", 3.30, 110, None, None, None)
    db.add_item("Fanta", fanta, "Soft Drinks", 3.30, 120, None, None, None)
    db.add_item("Orange Juice", default_image, "Soft Drinks", 4.00, 30, None, None, None)
    db.add_item("Budweiser 4.5% ABV", default_image, "Beers", 5.50, 186, None, None, None)
    db.add_item("Mahou 5.1% ABV", default_image, "Beers", 6.50, 190, None, None, None)
    db.add_item("Corona 4.5% ABV", default_image, "Beers", 5.50, 175, None, None, None)
    db.add_item("Stella Cidre", default_image, "Ciders", 6.50, 150, None, None, None)
    db.add_item("Stella Cidre Raspberry", default_image, "Ciders", 7.00, 190, None, None, None)
    #Kids Menu
    db.add_item('Beef Taco Cups', beef_taco_cups, 'Kids', 6.00, 300, False, 'Prawns', 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')

def insert_admin_account():
    db.add_user("test", "password1234#")
    db.add_user("admin", "@dmin123456")
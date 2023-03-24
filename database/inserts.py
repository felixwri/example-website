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
    orange_juice = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163533/oaxaca/Screenshot_2023-03-18_at_17.51.11_andosb.png'
    apple_juice = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163533/oaxaca/Screenshot_2023-03-18_at_17.52.12_uz7etk.png'
    #kids menu images
    beef_taco_cups = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163514/oaxaca/Beef_Taco_Cups_bnrlbj.png'
    mac_and_cheese = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163514/oaxaca/Nacho_Mac_and_Cheese_qfbp3u.png'
    chicken_nuggets = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163514/oaxaca/Chicken_Nuggets_and_Wedges_fwb2rh.png'
    taco_bites = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163514/oaxaca/Taco_Fish_Bites_osmdxc.png'
    bean_burritos = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163514/oaxaca/Chicken_and_Bean_Burrito_rkgopi.png'
    quesadillas = 'https://res.cloudinary.com/djukm4fut/image/upload/v1679163514/oaxaca/Mini_Quesadillas_b6gaoq.png'
    
    #Starters
    db.add_item('Tortilla Chips & Salsas', tortilla_chips_salsa, 'Starters', 5.50, 150, True, 'None', 'Tortilla chips served with our homemade roasted salsa and pico de gallo.')
    db.add_item('Tortilla Chips & Guacamole', tortilla_chips_guacamole, 'Starters', 6.00, 200, True,'Cheese', 'Tortilla chips topped with jack cheese, roasted salsa, jalapeño cream cheese, sour cream and our famous guacamole.')
    db.add_item('Southwest Spring Rolls', southwest_rolls,'Starters', 7.00, 239, True, 'None', 'A mix of chipotle seasoned carrots, poblano peppers, sweetcorn, avocado and ripe mango rolled in a flour tortilla, deep fried & served with freshly made cilantro lime dip.')
    db.add_item('Grilled Chicken Wings', grilled_wings, 'Starters', 7.50, 312, False, 'None', 'Grilled chicken with Lousiana Hot sauce.')
    #Mains
    db.add_item('Mexican Paella', mexican_paella, 'Mains', 15.00, 300, False, 'Prawns', 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')
    db.add_item('Seafood Paella', seafood_paella, 'Mains', 15.00, 200, False, 'Prawns, Nuts', 'Mexican rice cooked with chorizo, seafood cocktail, black tiger prawns, roasted salsa, peas, sweet corn and fresh coriander. (Hot)')
    db.add_item('Meat Paella', meat_paella, 'Mains', 15.00, 400, False, 'None', 'Slow cooked Mexican rice with chicken, chorizo, red salsa, peas & sweetcorn topped with grilled steak & bacon. (Hot)')
    db.add_item('Beef Carnitas Enchilada', enchiladas, 'Mains', 14.50, 410, False, 'Cheese', 'Rolled flour or white corn tortillas (GF) filled with jack cheese, poblano chilli peppers and topped with creamy salsa, jalapeños & cheese. Oven baked and served over a bed of Mexican rice & our famous guacamole.')
    db.add_item('Poblano Chicken', poblano_chicken, 'Mains', 14.50, 350, False, 'None', 'Grilled chicken breast topped with red salsa and poblano chilli peppers, served with seasoned rice.')
    db.add_item('Mex Burger', mex_burger, 'Mains', 14.50, 600, False, 'Cheese', 'Beef burger folded in corn flour buns with jack cheese, poblano chilli peppers & Chilli con Carne, served with pico de gallo, sour cream, our famous guacamole & Mexican rice.')
    #Desserts
    db.add_item('Ice Cream', icecream, 'Desserts', 4.00, 145, False, 'Milk', 'Two scoops, choose from vanilla, strawberry, chocolate, mint, mango or toffee.')
    db.add_item('Bunuelos', bunuelos, 'Desserts', 6.00, 212, False, 'Milk', 'Fried dough ball dusted with cinnamon sugar served with Dulce de Leche & chocolate fudge sauce.')
    db.add_item('Fudge Brownie', brownie, 'Desserts', 6.50, 368, False, 'Milk', 'Warm chocolate fudge brownie with a choice of topping from rasberries, strawbberries or bananas. Served with vanilla ice cream and chocolate/toffee sauce.')
    db.add_item('Churros', churros, 'Desserts', 6.50, 256, False, 'Milk', 'Mexican doughnut fried and dusted with cinnamon sugar with a side of Dulce de Leche & vanilla ice cream.')
    db.add_item('Banana Chimichanga', chimichanga, 'Desserts', 6.50, 200, False, 'Milk', 'A cinnamon flour tortilla filled with banana, deep fried and served with Dulce de Leche & vanilla ice cream.')
    #Soft Drinks, Beers, Ciders
    db.add_item("Coke Zero", coke_zero, "Soft Drinks", 3.30, 2, None, 'None', '355ml bottle')
    db.add_item("Coca-Cola", coca_cola, "Soft Drinks", 3.50, 139, None, 'None', '355ml bottle')
    db.add_item("Sprite", sprite, "Soft Drinks", 3.30, 110, None, 'None', '355ml bottle')
    db.add_item("Fanta", fanta, "Soft Drinks", 3.30, 120, None, 'None', '355ml bottle')
    db.add_item("Orange Juice", orange_juice, "Soft Drinks", 4.00, 30, None, 'None', 'Made from freshly squeezed oranges')
    db.add_item("Apple Juice", apple_juice, "Soft Drinks", 4.00, 30, None, 'None', 'Pressed apple juice')
    db.add_item("Budweiser 4.5% ABV", default_image, "Beers", 5.50, 186, None, None, None)
    db.add_item("Mahou 5.1% ABV", default_image, "Beers", 6.50, 190, None, None, None)
    db.add_item("Corona 4.5% ABV", default_image, "Beers", 5.50, 175, None, None, None)
    db.add_item("Stella Cider", default_image, "Ciders", 6.50, 150, None, None, None)
    db.add_item("Stella Cider Raspberry", default_image, "Ciders", 7.00, 190, None, None, None)
    #Kids Menu
    db.add_item('Beef Taco Cups', beef_taco_cups, 'Kids', 7.00, 378, False, 'None', 'Soft taco cups layered with minced beef, sliced bell peppers, jalapeños, jack cheese, sour cream and tomatoes.')
    db.add_item('Nacho Mac and Cheese', mac_and_cheese, 'Kids', 6.00, 346, True, 'Cheese, Milk', 'A classic macaroni and cheese dish, made with parmesan and cheddar cheese.')
    db.add_item('Chicken Nuggets and Wedges', chicken_nuggets, 'Kids', 6.00, 280, False, 'None', 'Air-fried chicken nuggets with a side of lightly spiced wedges, served with our chef-prepared tomato ketchup.')
    db.add_item('Taco Fish Bites with Tomato Salsa', taco_bites, 'Kids', 7.00, 317, False, 'Fish', 'A mix of cod, salmon and sea bass, enclosed within corn tortilla taco shells, topped with Monterey Jack cheese, avocado slices, bell peppers and red onions.')
    db.add_item('Chicken and Bean Burritos', bean_burritos, 'Kids', 5.50, 253, False, 'None', 'Toasted tortilla wrap with a filling of white rice, black turtle beans, red bell peppers, cheese, avocado and 100% chicken breast.')
    db.add_item('Mini Quesadillas', quesadillas, 'Kids', 6.00, 320, True, 'Cheese', 'Oaxaca cheese and mozarella filled tortilla wraps, toasted and served with a sour cream.')

def insert_admin_account():
    db.add_user("admin", "@dmin123456")
    db.add_user("george", "george_Password123", user_type="waiter")
    db.add_user("lucas", "lucas_Password123", user_type="waiter")
    db.add_user("allison", "allison_Password123", user_type="waiter")
    db.add_user("sarah", "sarah_Password123", user_type="kitchen")
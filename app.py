from flask import Flask, request, render_template, send_from_directory, jsonify, session, redirect
from flask_session import Session
from flask_cors import CORS, cross_origin
import database as db
import string, random, secrets

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = secrets.token_hex(16)
app.config["SESSION_TYPE"] = "filesystem"
app.url_map.strict_slashes = False
Session(app)
CORS(app, support_credentials=True, resource={r"/staff/upload": {"origins": "http://127.0.0.1:5000"}})
 

@app.route('/')
def home():
    return render_template('home.html', page_name="home")

@app.route('/menu', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def menu():
    return render_template('menu.html', menu_items=db.get_items(), editable=False)

@app.route('/basket', methods=['GET'])
def basket():
    if request.method == 'GET':
        return render_template('basket.html')
    else:
        return jsonify(success="false", error="Bad method")

@app.route('/submit-order', methods=['POST'])
@cross_origin(supports_credentials=True)
def submit_order():
    items = []
    obj = request.get_json()
    if obj:
        basket = obj["basket"]
        reference = generate_reference()

        for item in basket:
            items.append(item)

        db.add_order(reference, items)

        return jsonify(success = "true", reference=reference)
    return jsonify(success = "false", reference = "Bad method")


@app.route('/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method == 'GET':
        return render_template("login.html")
    else:
        #Get the username and password
        username = request.form['username']
        password = request.form['password']

        if db.check_password(username, password):
            session['username'] = 'staff'
            return redirect('/staff/')
        else:
            return render_template("login.html", error = "Invalid Credentials")


@app.route('/register', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def register():
    username = request.form['username']
    password = request.form['password']
   

    if db.exisiting_user(username):
        return "User already exists!"
    else:
        if db.password_strength(password):
            db.add_user(username, password)
            return "Registration successful!"
        else:
            return "Weak password! Make sure to have at least 8 characters, at least one capital letter, a lower case letter, a special character and a digit."

@app.route('/payment', methods=['GET', 'POST'])
def payment():
    if request.method == 'GET':
        return render_template('payment.html')
    else:
        return jsonify(success="false", error="Bad method")
# Staff Pages


@app.route('/staff/', methods=['GET'])
def staff_home():
    if session.get('username') != 'staff':
        return redirect("/")
    

    return render_template('staffHome.html', orders=db.get_orders())

@app.route('/staff/orders', methods=['GET'])
@cross_origin(supports_credentials=True)
def view_all_orders():
    if session.get('username') != 'staff':
        return redirect("/")
    
    if request.method == 'GET':
        return render_template('orders.html', orders=db.get_orders())
    else:
        return jsonify(success="false", error="Bad method")
    
@app.route('/staff/order-status', methods=['POST'])
@cross_origin(supports_credentials=True)
def cancel_order():
    if request.method == 'POST':
        req = request.get_json()
        if req:
            db.update_order_table_status(req["id"], req["status"])
            return jsonify(success = "true", newStatus = req["status"])
        return jsonify(success = "false")
    else:
        return jsonify(success="false", error="Bad method")

@app.route('/staff/menu', methods=['GET'])
def editable_menu():
    if session.get('username') != 'staff':
        return redirect("/")
    return render_template('menu.html', menu_items=db.get_items(), editable=True)

@app.route('/staff/menu/add', methods=['POST'])
@cross_origin(supports_credentials=True)
def add_item():
    if session.get('username') != 'staff':
        return jsonify(success= "false")
    
    json = request.get_json()


    if "dataURL" in json:
        json["imageURL"] = db.upload_image(json["dataURL"])["url"]

        print("New image uploaded")

    success = False 
    if json["new"]:
        success = db.add_item(json["name"], 
                    json["imageURL"], 
                    json["type"], 
                    json["price"], 
                    json["calories"], 
                    json["vegatarian"], 
                    json["allergens"], 
                    json["description"])
    else:
        success = db.update_item(
                    json["id"],
                    json["name"], 
                    json["imageURL"], 
                    json["type"], 
                    json["price"], 
                    json["calories"], 
                    json["vegatarian"], 
                    json["allergens"], 
                    json["description"])
    return jsonify(success)

@app.route('/staff/menu/delete', methods=['POST'])
@cross_origin(supports_credentials=True)
def delete_item():
    if session.get('username') != 'staff':
        return jsonify(success= "false")
    
    json = request.get_json()
    items_id = json['id']
    success = db.delete_items(items_id)
    return jsonify(success)

@app.route('/staff/upload', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True, origin='127.0.0.1',headers=['Content- Type','Authorization'])
def upload_image():
    if session.get('username') != 'staff':
        return jsonify(success= "false")
    if request.method == "GET":
        return render_template("uploader.html", image_urls = db.get_all_urls())

    json = request.get_json()
    result = db.upload_image(json["image"])

    return jsonify(success = result["success"], url = result["url"])

# Content delivery routes

@app.route('/styles/<path:path>')
def send_css(path):
    return send_from_directory('public/styles', path)    

@app.route('/scripts/<path:path>')
def send_js(path):
    return send_from_directory('public/scripts', path)  

@app.route('/images/<path:filename>')
def send_img(filename):
    return send_from_directory('public/images', filename)

#Genereating random references
def generate_reference():
    letters = string.ascii_letters
    reference = ''.join(random.choice(letters) for i in range(10))
    return reference

if __name__ == '__main__':
    app.run()
from flask import Flask, request, render_template, send_from_directory, jsonify
import database as db
import string, random

app = Flask(__name__)
 

@app.route('/')
def home():
    return render_template('home.html', page_name="home")

@app.route('/menu', methods=['GET', 'POST'])
def menu():
    data = db.get_items()
    return render_template('menu.html', menu_items=data)

@app.route('/basket', methods=['GET', 'POST'])
def basket():
    if request.method == 'GET':
        return render_template('basket.html')

    elif request.method == 'POST':
        
        order = request.json["order"]
        print(order)

        return jsonify(success="true", reference="1a2b3c4b5d")

    else:
        return jsonify(success="false", error="Bad method")

@app.route('/submit_order', methods=['POST'])
def submit_order():
    if request.form.get("submit_order"):
        basket = request.json["basket"]
        reference = generate_reference()

        for item in basket:
            db.add_order(item["id"])

        return jsonify(success = "true", reference = reference)
    return jsonify(success = "false", reference = "Bad method")
    

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
    app.debug = True
    app.run()
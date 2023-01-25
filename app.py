from flask import Flask, request, render_template, send_from_directory
from login_database import check_password, add_user

app = Flask(__name__)
 

@app.route('/')
def home():
    return render_template('home.html', page_name="home")


@app.route('/menu', methods=['GET', 'POST'])
def menu():
    print(request.method)
    return render_template('menu.html', page_name="menu")

@app.route('/login', methods=['POST'])
def login():
    #Get the username and password
    username = request.form['username']
    password = request.form['password']

    if check_password(username, password):
        return "Login succesful!"
    else:
        return "Incorrect username or password!"


@app.route('/register', methods=['GET', 'POST'])
def register():
    username = request.form['username']
    password = request.form['password']

    if check_password(username, password):
        return "Users already exists!"
    else:
        add_user(username, password)
        return "Registiration succesful!"


@app.route('/styles/<path:path>')
def send_css(path):
    return send_from_directory('public/styles', path)    


@app.route('/scripts/<path:path>')
def send_js(path):
    return send_from_directory('public/scripts', path)  

@app.route('/images/<path:filename>')
def send_img(filename):
    return send_from_directory('public/images', filename)

if __name__ == '__main__':
    app.debug = True
    app.run()
from flask import Flask, request, render_template, send_from_directory
import login_database

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

    if login_database.check_password(username, password):
        return "Login succesful!"
    else:
        return "Incorrect username or password!"


@app.route('/register', methods=['GET', 'POST'])
def register():
    username = request.form['username']
    password = request.form['password']
   

    if login_database.exisiting_user(username):
        return "User already exists!"
    else:
        if login_database.password_strength(password):
            login_database.add_user(username, password)
            return "Registiration succesful!"
        else:
            return "Weak password! Make sure to have at least 8 characters, at least one capital letter, a lower case letter, a special character and a digit."


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
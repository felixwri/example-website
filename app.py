from flask import Flask, request, render_template
import database as db

app = Flask(__name__)

@app.route('/')
def home():
    print(db.print_users())
    return render_template('home.html', page_name="home")

@app.route('/menu', methods=['GET', 'POST'])
def menu():
    print(request.method)
    return render_template('menu.html', page_name="menu")

if __name__ == '__main__':
    app.debug = True
    app.run()
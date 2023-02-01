from flask import Flask, request, render_template, send_from_directory
from database import get_items

app = Flask(__name__)
 

@app.route('/')
def home():
    return render_template('home.html', page_name="home")

@app.route('/menu', methods=['GET', 'POST'])
def menu():
    data = get_items()
    return render_template('menu.html', menu_items=data)

@app.route('/basket', methods=['GET', 'POST'])
def basket():
    return render_template('basket.html')


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
from flask import Flask, request, render_template,  send_from_directory

app = Flask(__name__)
 

@app.route('/')
def home():
    return render_template('home.html', page_name="home")



@app.route('/menu', methods=['GET', 'POST'])
def menu():
    print(request.method)
    return render_template('menu.html', page_name="menu")



@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('templates/css', path)    


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/js', path)  

@app.route('/images/<path:filename>')
def send_img(filename):
    return send_from_directory('templates/images', filename)

if __name__ == '__main__':
    app.debug = True
    app.run()
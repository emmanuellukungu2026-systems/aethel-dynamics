from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def page_home():
    return render_template('index.html')
@app.route('/signin')
def signin_page():
    return render_template('signin.html')
@app.route('/login')
def login_page():
    return render_template('login.html')
@app.route('/main')
def main_page():
    return render_template('main_page.html')

if __name__ == '__main__':
    app.run(debug=True)

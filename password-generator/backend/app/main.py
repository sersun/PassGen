from flask import Flask, request, jsonify, render_template
import random
import string

app = Flask(__name__, 
    template_folder='../../frontend/templates',
    static_folder='../../frontend/static')

def generate_password(length, uppercase, lowercase, numbers, symbols):
    chars = ''
    if uppercase:
        chars += string.ascii_uppercase
    if lowercase:
        chars += string.ascii_lowercase
    if numbers:
        chars += string.digits
    if symbols:
        chars += string.punctuation
    
    if not chars:
        chars = string.ascii_letters + string.digits
    
    return ''.join(random.choice(chars) for _ in range(int(length)))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-password', methods=['POST'])
def create_password():
    data = request.get_json()
    
    password = generate_password(
        length=data.get('length', 12),
        uppercase=data.get('uppercase', True),
        lowercase=data.get('lowercase', True),
        numbers=data.get('numbers', True),
        symbols=data.get('symbols', False)
    )
    
    return jsonify({'password': password})

if __name__ == '__main__':
    app.run(debug=True)
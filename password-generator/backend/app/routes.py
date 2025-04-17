from flask import Blueprint, jsonify, request

bp = Blueprint('routes', __name__)

@bp.route('/generate-password', methods=['POST'])
def generate_password():
    data = request.json
    length = data.get('length', 12)
    # Logic to generate a password based on the specified length
    password = 'generated_password'  # Placeholder for actual password generation logic
    return jsonify({'password': password})

@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})
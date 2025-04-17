# PassGen - Modern Password Generator

A secure and user-friendly password generator with both random and word-based generation options.


## Features

- **Dual Generation Modes**
  - Random password generation with customizable options
  - Word-based passwords for better memorability
- **Customization Options**
  - Adjustable password length (8-50 characters)
  - Include/exclude uppercase letters, lowercase letters, numbers, and symbols
  - Word combination with optional numbers and symbols
- **User-Friendly Interface**
  - Clean, modern design with Bootstrap 5
  - Password history with last 3 generated passwords
  - One-click copy to clipboard
  - Password saving functionality

## Tech Stack

- **Frontend**
  - HTML5/CSS3
  - JavaScript (ES6+)
  - Bootstrap 5
  - Custom SVG animations
- **Backend**
  - Python 3.8+
  - Flask 2.0.1
  - SQLAlchemy
  - Flask-CORS

## Installation

1. Clone the repository
```bash
git clone https://github.com/sersun/PassGen.git
cd PassGen
```

2. Set up the backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up environment variables
```bash
copy .env.example .env
# Edit .env with your configurations
```

4. Run the application
```bash
python app/main.py
```

Visit `http://localhost:5000` in your browser.

## Development

### Running Tests

Backend tests:
```bash
cd backend
python -m pytest tests/
```

Frontend tests:
```bash
cd frontend
npm install
npm test
```

## Project Structure

```
password-generator/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── routes.py
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_app.py
│   └── requirements.txt
└── frontend/
    ├── static/
    │   ├── css/
    │   ├── js/
    │   └── img/
    └── templates/
        └── index.html
```

## Security Features

- Secure random number generation
- Password strength indicators
- Client-side input validation
- CORS protection
- XSS prevention
- CSRF protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/sersun/PassGen](https://github.com/sersun/PassGen)

## Acknowledgments

- [Bootstrap](https://getbootstrap.com)
- [Flask](https://flask.palletsprojects.com/)
- [Google Fonts](https://fonts.google.com)
- [Onest Fonts](https://onest.md/)
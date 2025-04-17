import unittest
from flask import json
from app.main import app

class TestPasswordGenerator(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = app.test_client()
        self.app.config['TESTING'] = True

    def test_index_route(self):
        """Test the main page loads correctly"""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Password Generator', response.data)

    def test_generate_password_route(self):
        """Test password generation endpoint"""
        test_data = {
            'length': 12,
            'uppercase': True,
            'lowercase': True,
            'numbers': True,
            'symbols': False
        }
        
        response = self.client.post('/generate-password',
                                  data=json.dumps(test_data),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('password', data)
        self.assertEqual(len(data['password']), 12)

    def test_password_length_validation(self):
        """Test password length validation"""
        test_data = {
            'length': 60,  # Too long
            'uppercase': True,
            'lowercase': True,
            'numbers': True
        }
        
        response = self.client.post('/generate-password',
                                  data=json.dumps(test_data),
                                  content_type='application/json')
        
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
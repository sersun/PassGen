import unittest
import string
from app.main import generate_password

class TestPasswordGeneratorLogic(unittest.TestCase):
    def test_password_length(self):
        """Test if generated password has correct length"""
        password = generate_password(12, True, True, True, False)
        self.assertEqual(len(password), 12)

    def test_uppercase_inclusion(self):
        """Test if uppercase letters are included when specified"""
        password = generate_password(20, True, False, False, False)
        self.assertTrue(any(c.isupper() for c in password))

    def test_lowercase_inclusion(self):
        """Test if lowercase letters are included when specified"""
        password = generate_password(20, False, True, False, False)
        self.assertTrue(any(c.islower() for c in password))

    def test_numbers_inclusion(self):
        """Test if numbers are included when specified"""
        password = generate_password(20, False, False, True, False)
        self.assertTrue(any(c.isdigit() for c in password))

    def test_symbols_inclusion(self):
        """Test if symbols are included when specified"""
        password = generate_password(20, False, False, False, True)
        self.assertTrue(any(c in string.punctuation for c in password))

    def test_all_character_types(self):
        """Test if all character types are included when specified"""
        password = generate_password(20, True, True, True, True)
        self.assertTrue(any(c.isupper() for c in password))
        self.assertTrue(any(c.islower() for c in password))
        self.assertTrue(any(c.isdigit() for c in password))
        self.assertTrue(any(c in string.punctuation for c in password))

if __name__ == '__main__':
    unittest.main()
class PasswordGenerator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    length = db.Column(db.Integer, nullable=False)
    include_uppercase = db.Column(db.Boolean, default=True)
    include_numbers = db.Column(db.Boolean, default=True)
    include_special_characters = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<PasswordGenerator {self.id}>'
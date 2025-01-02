from app import db


# creating a Friend class for db Model 
class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    role = db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(100),nullable=False)
    gender = db.Column(db.String(10),nullable=False)
    img_url = db.Column(db.String(200),nullable=True)

    # a self method for converting it to json 
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgUrl":self.img_url
        }
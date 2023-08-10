from .db import db, environment, SCHEMA, add_prefix_for_prod
from .catalog import catalogs
from datetime import datetime

if environment == "production":
    catalogs.schema = SCHEMA
    
class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    watchlist = db.Column(db.Boolean, nullable=False, default=False)
    favorites = db.Column(db.Boolean, nullable=False, default=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='lists')
    movies = db.relationship('Movie', secondary=catalogs, back_populates='lists')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'image': self.image,
            'description': self.description,
            'watchlist': self.watchlist,
            'favorites': self.favorites,
            'updatedAt': self.updatedAt,
            'user': self.user.to_dict(),
            'movies': [movie.to_dict() for movie in self.movies]
        }

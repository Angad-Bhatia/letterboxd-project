from .db import db, environment, SCHEMA, add_prefix_for_prod
from .catalog import catalog
from datetime import datetime

class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(60), nullable=False, unique=True)
    art = db.Column(db.String(255), nullable=False, unique=True)
    tagline = db.Column(db.String(100), nullable=False, unique=True)
    summary = db.Column(db.Text, nullable=False, unique=True)
    rating = db.Column(db.String(5), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(60), nullable=False)
    director = db.Column(db.String(60), nullable=False)
    writer = db.Column(db.String(60), nullable=False)
    cast = db.Column(db.Text, nullable=False)
    trailer_url = db.Column(db.String(60))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='movies')
    reviews = db.relationship('Review', back_populates='movie', cascade="all, delete")
    lists = db.relationship('List', secondary=catalog, back_populates='movies')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'art': self.art,
            'tagline': self.tagline,
            'summary': self.summary,
            'rating': self.rating,
            'year': self.year,
            'genre': self.genre,
            'director': self.director,
            'writer': self.writer,
            'cast': self.cast,
            'trailer_url': self.trailer_url,
            'createdAt': self.createdAt,
            'num_lists': len(self.lists),
            'user': self.user.to_dict(),
            'reviews': [review.to_dict() for review in self.reviews]
        }

    def to_dict_review(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'art': self.art,
            'year': self.year
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from .catalog import catalogs
from datetime import datetime

if environment == "production":
    catalogs.schema = SCHEMA
class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False, unique=True)
    art = db.Column(db.String(255), nullable=False, unique=True)
    tagline = db.Column(db.String(150), nullable=False, unique=True)
    summary = db.Column(db.Text, nullable=False, unique=True)
    rating = db.Column(db.String(5), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(20), nullable=False)
    director = db.Column(db.String(60), nullable=False)
    writer = db.Column(db.String(60), nullable=False)
    cast = db.Column(db.Text, nullable=False)
    trailer_url = db.Column(db.String(100))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship('User', back_populates='movies')
    reviews = db.relationship('Review', back_populates='movie', cascade="all, delete")
    lists = db.relationship('List', secondary=catalogs, back_populates='movies')

    def to_dict(self):
        reviews = [review.to_dict() for review in self.reviews]
        num_likes = 0
        total_stars = 0
        for review in reviews:
            total_stars += review['stars']
            if review['like']:
                num_likes += 1

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
            'updatedAt': self.updatedAt,
            'num_lists': len(self.lists),
            'user': self.user.to_dict(),
            'reviews': reviews,
            'likes': num_likes,
            'star_rating': total_stars / len(reviews) if len(reviews) > 0 else 'New'
        }

    def to_dict_review(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'art': self.art,
            'year': self.year
        }

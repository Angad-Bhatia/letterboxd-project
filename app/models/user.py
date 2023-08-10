from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    'follows',

    db.Column('following_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
    movies = db.relationship('Movie', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')
    lists = db.relationship('List', back_populates='user')
    following = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.following_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        # primaryjoin=db.foreign(follows.c.following_id) == id,
        # secondaryjoin=db.foreign(follows.c.follower_id) == id,
        # primaryjoin=(follows.c.follower_id == id),
        # secondaryjoin=(follows.c.following_id == id),
        foreign_keys=[follows.c.follower_id],
        back_populates='followers'
    )

    followers = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.following_id == id),
        # primaryjoin=db.foreign(follows.c.follower_id) == id,
        # secondaryjoin=db.foreign(follows.c.following_id) == id,
        # primaryjoin=(follows.c.following_id == id),
        # secondaryjoin=(follows.c.follower_id == id),
        foreign_keys=[follows.c.following_id],
        back_populates='following'
    )

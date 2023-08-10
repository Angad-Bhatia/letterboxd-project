from .db import db, environment, SCHEMA, add_prefix_for_prod

catalogs = db.Table(
    'catalogs',
    db.Model.metadata,
    db.Column('movie_id', db.Integer, db.ForeignKey(add_prefix_for_prod('movies.id')), primary_key=True),
    db.Column('list_id', db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), primary_key=True)
)

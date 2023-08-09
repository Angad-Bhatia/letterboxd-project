from .db import db, environment, SCHEMA, add_prefix_for_prod

catalog = db.Table(
    'catalogs',

    db.Column('movie_id', db.Integer, db.ForeignKey(add_prefix_for_prod('movies.id'))),
    db.Column('list_id', db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')))
)

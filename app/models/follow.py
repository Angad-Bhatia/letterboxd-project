# from .db import db, environment, SCHEMA, add_prefix_for_prod

# follow = db.Table(
#     'follows',

#     db.Column('following_id', db.Integer, db.ForeignKey(add_prefix_for_prod('following.id'))),
#     db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('followed.id')))
# )

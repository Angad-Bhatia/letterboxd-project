"""empty message

Revision ID: f316b4da31f1
Revises:
Create Date: 2023-08-10 03:44:41.629482

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'f316b4da31f1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('follows',
    sa.Column('following_id', sa.Integer(), nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('following_id', 'follower_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")

    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('image', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('watchlist', sa.Boolean(), nullable=False),
    sa.Column('favorites', sa.Boolean(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE lists SET SCHEMA {SCHEMA};")

    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('art', sa.String(length=255), nullable=False),
    sa.Column('tagline', sa.String(length=150), nullable=False),
    sa.Column('summary', sa.Text(), nullable=False),
    sa.Column('rating', sa.String(length=5), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(length=20), nullable=False),
    sa.Column('director', sa.String(length=60), nullable=False),
    sa.Column('writer', sa.String(length=60), nullable=False),
    sa.Column('cast', sa.Text(), nullable=False),
    sa.Column('trailer_url', sa.String(length=100), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('art'),
    sa.UniqueConstraint('summary'),
    sa.UniqueConstraint('tagline'),
    sa.UniqueConstraint('title')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE movies SET SCHEMA {SCHEMA};")

    op.create_table('catalogs',
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
    sa.PrimaryKeyConstraint('movie_id', 'list_id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE catalogs SET SCHEMA {SCHEMA};")

    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=False),
    sa.Column('like', sa.Boolean(), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('updatedAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('catalogs')
    op.drop_table('movies')
    op.drop_table('lists')
    op.drop_table('follows')
    op.drop_table('users')
    # ### end Alembic commands ###

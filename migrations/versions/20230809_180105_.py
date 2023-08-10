"""empty message

Revision ID: 804589e47e31
Revises: ffdc0a98111c
Create Date: 2023-08-09 18:01:05.438222

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '804589e47e31'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('following_id', sa.Integer(), nullable=True),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], )
    )
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
    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=60), nullable=False),
    sa.Column('art', sa.String(length=255), nullable=False),
    sa.Column('tagline', sa.String(length=100), nullable=False),
    sa.Column('summary', sa.Text(), nullable=False),
    sa.Column('rating', sa.String(length=5), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(length=60), nullable=False),
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
    op.create_table('catalogs',
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.Column('list_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], )
    )
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
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('catalogs')
    op.drop_table('movies')
    op.drop_table('lists')
    op.drop_table('follows')
    # ### end Alembic commands ###

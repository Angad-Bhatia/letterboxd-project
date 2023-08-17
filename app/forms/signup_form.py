from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), Length(min=4, max=30, message="Username must be between 4 to 30 characters"), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(message="Not a valid email address"), Length(min=5, max=50, message="Email must be between 5 to 50 characters"), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=30, message="Password must be between 8 to 30 characters")])

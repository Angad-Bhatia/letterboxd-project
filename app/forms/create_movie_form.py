from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Movie

def title_exists(form, field):
    # Checking if title exists
    title = field.data
    movie = Movie.query.filter(Movie.title == title).first()
    if movie:
        raise ValidationError('Film with this title has already been created')

def art_exists(form, field):
    # Checking if art exists
    art = field.data
    movie = Movie.query.filter(Movie.art == art).first()
    if movie:
        raise ValidationError('Film with this art has already been created')

def tagline_exists(form, field):
    # Checking if tagline exists
    tagline = field.data
    movie = Movie.query.filter(Movie.tagline == tagline).first()
    if movie:
        raise ValidationError('Film with this tagline has already been created')

def summary_exists(form, field):
    # Checking if summary exists
    summary = field.data
    movie = Movie.query.filter(Movie.summary == summary).first()
    if movie:
        raise ValidationError('Film with this summary has already been created')


class CreateMovieForm(FlaskForm):
    title = StringField("name", validators=[DataRequired(), title_exists])
    art = StringField("art", validators=[DataRequired(), art_exists])
    tagline = StringField('tagline', validators=[DataRequired(), tagline_exists])
    summary = StringField('summary', validators=[DataRequired(), summary_exists])
    rating = StringField('rating', validators=[DataRequired()])
    year = IntegerField("year", validators=[DataRequired()])
    genre = StringField("genre", validators=[DataRequired()])
    director = StringField('director', validators=[DataRequired()])
    writer = StringField('writer', validators=[DataRequired()])
    cast = StringField('cast', validators=[DataRequired()])
    trailer_url = StringField('trailer_url')
    submit = SubmitField("Submit")

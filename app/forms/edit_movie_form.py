from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired


class EditMovieForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    art = StringField("art", validators=[DataRequired()])
    tagline = StringField('tagline', validators=[DataRequired()])
    summary = StringField('summary', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])
    year = IntegerField("year", validators=[DataRequired()])
    genre = StringField("genre", validators=[DataRequired()])
    director = StringField('director', validators=[DataRequired()])
    writer = StringField('writer', validators=[DataRequired()])
    cast = StringField('cast', validators=[DataRequired()])
    trailer_url = StringField('trailer_url')
    submit = SubmitField("Submit")

from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import List

class CreateListForm():
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    image = StringField("image", validators=[DataRequired()])
    favorites = BooleanField("favorites", validators=[DataRequired()])
    watchlist = BooleanField("watchlist", validators=[DataRequired()])
    submit = SubmitField("Submit")



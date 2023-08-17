from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange

class EditReviewForm(FlaskForm):
    like = BooleanField("like")
    stars = IntegerField("stars", validators=[DataRequired(), NumberRange(min=1, max=5, message='Must rate between 1 to 5 stars')])
    description = StringField("description", validators=[DataRequired(), Length(min=1, max=1000, message='Review cannot exceed 1000 characters')])
    submit = SubmitField("Submit")

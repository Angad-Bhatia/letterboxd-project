from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('')
def get_all_reviews():
    """
    Query for all reviews and returns them in a list of review dictionaries
    """
    return jsonify([review.to_dict() for review in Review.query.all()])

@review_routes.route('/current')
@login_required
def get_user_reviews():
    """
    Query for all reviews created by the current user and return them in a list of review dictionaries
    """
    user_reviews = Review.query.filter(Review.user_id == current_user.id)
    reviews_dict = [review.to_dict() for review in user_reviews]
    return jsonify(reviews_dict)

@review_routes.route('/<int:id>')
def get_review_by_id(id):
    """
    Query for an review by id and returns that review in a dictionary
    """
    review = Review.query.get(id)
    return jsonify(review.to_dict())

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import EditReviewForm

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


# Edit a Review
@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_review(id):
    """
    Edit an existing Review and return Review in dictionary form after updating
    """
    form = EditReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(id)

        if review is None:
            return jsonify({'errors': 'Review not found'}), 404
        elif review.user_id != current_user.id:
            return jsonify({'errors': 'Review does not belong to user'}), 403

        review.like = form.data['like']
        review.stars = form.data['stars']
        review.description = form.data['description']

        db.session.commit()

        return jsonify(review.to_dict())

    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 401

# Delete a Review created by the user
@review_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review is None:
        return jsonify({'errors': 'Review not found'}), 404
    elif review.user_id != current_user.id:
        return jsonify({"errors": "Review does not belong to user"}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Successfully Deleted'})

@review_routes.route('/<int:id>')
def get_review_by_id(id):
    """
    Query for an review by id and returns that review in a dictionary
    """
    review = Review.query.get(id)
    return jsonify(review.to_dict())

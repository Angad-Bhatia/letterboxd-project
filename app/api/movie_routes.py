from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Movie, Review, db
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import CreateMovieForm, EditMovieForm

movie_routes = Blueprint('movies', __name__)

@movie_routes.route('')
def get_all_movies():
    """
    Query for all movies and returns them in a list of movie dictionaries
    """
    return jsonify([movie.to_dict() for movie in Movie.query.all()])

@movie_routes.route('/current')
@login_required
def get_user_movies():
    """
    Query for all movies created by the current user and return them in a list of movie dictionaries
    """
    user_movies = Movie.query.filter(Movie.user_id == current_user.id)
    movies_dict = [movie.to_dict() for movie in user_movies]
    return jsonify(movies_dict)

@movie_routes.route('/new-movie', methods=['POST'])
@login_required
def create_new_movie():
    """
    Create a new Movie
    """
    form = CreateMovieForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # form.data['user_id'] = current_user.id
    if form.validate_on_submit():

        new_movie = Movie (
            user_id = current_user.id,
            title = form.data['title'],
            art = form.data['art'],
            tagline = form.data['tagline'],
            summary = form.data['summary'],
            rating = form.data['rating'],
            year = form.data['year'],
            genre = form.data['genre'],
            director = form.data['director'],
            writer = form.data['writer'],
            cast = form.data['cast'],
            trailer_url = form.data['trailer_url']
        )

        db.session.add(new_movie)
        db.session.commit()

        return jsonify(new_movie.to_dict())

    return jsonify({ 'errors': validation_errors_to_error_messages(form.errors) }), 401


@movie_routes.route('/<int:id>/reviews')
def get_reviews_for_movie(id):
    """
    Query for an movie by id and returns that movie's reviews, as a list of dictionaries
    """
    reviews = Review.query.filter(Review.movie_id == id)
    reviews_dict = [review.to_dict() for review in reviews]
    return jsonify(reviews_dict)

@movie_routes.route('/<int:id>')
def get_movie_by_id(id):
    """
    Query for an movie by id and returns that movie in a dictionary
    """
    movie = Movie.query.get(id)
    return jsonify(movie.to_dict())

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


# Create a new Movie
@movie_routes.route('/new-movie', methods=['POST'])
@login_required
def create_new_movie():
    """
    Create a new Movie and return the movie in dictionary form
    """
    form = CreateMovieForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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

        # print('in create', new_movie.art)
        db.session.add(new_movie)
        db.session.commit()

        return jsonify(new_movie.to_dict())

    return jsonify({ 'errors': validation_errors_to_error_messages(form.errors) }), 401


# Edit a Movie
@movie_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_movie(id):
    """
    Edit an existing Movie and return Movie in dictionary form after updating
    """
    form = EditMovieForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        movie = Movie.query.get(id)

        if movie is None:
            return jsonify({'errors': 'Movie not found'}), 404
        elif movie.user_id != current_user.id:
            return jsonify({'errors': 'Movie does not belong to user'}), 403

        movie.title = form.data['title']
        movie.art = form.data['art']
        movie.tagline = form.data['tagline']
        movie.summary = form.data['summary']
        movie.rating = form.data['rating']
        movie.year = form.data['year']
        movie.genre = form.data['genre']
        movie.director = form.data['director']
        movie.writer = form.data['writer']
        movie.cast = form.data['cast']
        movie.trailer_url = form.data['trailer_url']

        db.session.commit()

        return jsonify(movie.to_dict())

    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 401

# Delete a Movie created by the user
@movie_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_movie(id):
    movie = Movie.query.get(id)

    if movie is None:
        return jsonify({'errors': 'Movie not found'}), 404
    elif movie.user_id != current_user.id:
        return jsonify({"errors": "Movie does not belong to user"}), 403

    db.session.delete(movie)
    db.session.commit()
    return jsonify({'message': 'Successfully Deleted'})

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

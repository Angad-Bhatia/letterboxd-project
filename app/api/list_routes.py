from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import List, Movie, db
from app.forms import CreateListForm

list_routes = Blueprint('lists', __name__)

@list_routes.route('')
def get_all_lists():
    """
    Query for all lists and returns them in a list of list dictionaries
    """
    return jsonify([list.to_dict() for list in List.query.all()])

@list_routes.route('/current')
@login_required
def get_user_lists():
    """
    Query for all lists created by the current user and return them in a list of list dictionaries
    """
    user_lists = List.query.filter(List.user_id == current_user.id)
    lists_dict = [list.to_dict() for list in user_lists]
    return jsonify(lists_dict)

# Create a new List
@list_routes.route('/new-list', methods=['POST'])
@login_required
def create_new_list():
    """
    Create a new List and return the list in dictionary form
    """
    form = CreateListForm()

import { normalizeUniqueErrors } from "../helpers";
/*****************  ACTION TYPES   ****************/

const LOAD_ALL_MOVIES = 'movies/LOAD_ALL_MOVIES';
const LOAD_SINGLE_MOVIE = 'movies/LOAD_SINGLE_MOVIE';
const CREATE_MOVIE = 'movies/CREATE_MOVIE'
const UPDATE_MOVIE = 'movies/UPDATE_MOVIE'
const DELETE_MOVIE = 'movies/DELETE_MOVIE';


/*****************  ACTION CREATORS   ****************/

// LOAD ALL Movies Action
export const loadAllMoviesAction = (movies) => {
    return {
        type: LOAD_ALL_MOVIES,
        movies
    };
};

  //LOAD ONE Movie Action
export const loadSingleMovieAction = (movie) => {
    return {
        type: LOAD_SINGLE_MOVIE,
        movie
    };
};

  //CREATE a Movie Action
export const createMovieAction = (movie) => {
    return {
        type: CREATE_MOVIE,
        movie
    };
};

  //UPDATE a Movie Action
export const updateMovieAction = (movie) => {
    return {
        type: UPDATE_MOVIE,
        movie
    };
};

  //DELETE a Movie Action
export const deleteMovieAction = (movieId) => {
    return {
        type: DELETE_MOVIE,
        movieId
    };
};

/*********************  THUNKS  *********************/

//GET All Movies Thunk
export const getAllMoviesThunk = () => async (dispatch) => {
    const response = await fetch('/api/movies');
    const movies = await response.json();
    dispatch(loadAllMoviesAction(movies));
    return movies;
};


//GET All Movies by Current User Thunk
export const getCurrentUserAllMoviesThunk = () => async (dispatch) => {
    const response = await fetch('/api/movies/current');
    if (response.ok) {
        const movies = await response.json();
        dispatch(loadAllMoviesAction(movies));
        return movies;
    }
};


//GET Movie by ID Thunk
export const getMovieByIdThunk = (movieId) => async (dispatch) => {
    const response = await fetch(`/api/movies/${movieId}`);
    if (response.ok) {
        const movie = await response.json();
        dispatch(loadSingleMovieAction(movie));
        return movie;
    }
};

//Create a Movie Thunk
export const createMovieThunk = (formData) => async (dispatch) => {
    // console.log('Create movie thunk running, this is the formData', formData)

    const response = await fetch('/api/movies/new-movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        // console.log('After fetch, this is the response', response)
    });


    if (response.ok) {
        const newMovie = await response.json();
        dispatch(createMovieAction(newMovie));
        return newMovie;
    } else {
        const error = await response.json();
        return normalizeUniqueErrors(error.errors);
    }
};

// Edit a Movie Thunk
export const updateMovieThunk = (movieId, formData) => async (dispatch) => {
    // console.log('Edit a movie Thunk, this is movieId : ', movieId);
    const response = await fetch(`/api/movies/${movieId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      // console.log('After update movie fetch, this is response : ', response)
    });
    if (response.ok) {
        const updatedMovie = await response.json();
        dispatch(updateMovieAction(updatedMovie));
        return updatedMovie;
    } else {
        const error = await response.json();
        return error.errors;
    }
}

/*****************  REDUCER FUNCTION   ****************/

const initialState = {
    allMovies: {},
    singleMovie: {}
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_MOVIES:
            const allMoviesObject = {};
            action.movies.forEach((movie) => {
                allMoviesObject[movie.id] = movie;
            });
            return { ...state, allMovies: allMoviesObject };
        case LOAD_SINGLE_MOVIE:
            return { ...state, allMovies: { ...state.allMovies, [action.movie.id] : action.movie }, singleMovie: { [action.movie.id] : action.movie } };
        case CREATE_MOVIE:
            return { ...state, allMovies: { ...state.allMovies, [action.movie.id] : action.movie }, singleMovie: { [action.movie.id] : action.movie } };
        case UPDATE_MOVIE:
            return { ...state, allMovies: { ...state.allMovies, [action.movie.id] : action.movie }, singleMovie: { [action.movie.id] : action.movie } };
        default:
            return state;
    };
};

export default movieReducer;

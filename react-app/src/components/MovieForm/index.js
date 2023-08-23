import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createMovieThunk, updateMovieThunk } from '../../store/movies';
import { movieValidation, cleanMovieForm } from '../../helpers';
import './MovieForm.css';

const MovieForm = ({ formType, movie }) => {
    const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
    const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'];

    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(movie?.title);
    const [art, setArt] = useState(movie?.art);
    const [tagline, setTagline] = useState(movie?.tagline);
    const [summary, setSummary] = useState(movie?.summary);
    const [rating, setRating] = useState(movie?.rating);
    const [year, setYear] = useState(movie?.year);
    const [genre, setGenre] = useState(movie?.genre);
    const [director, setDirector] = useState(movie?.director);
    const [writer, setWriter] = useState(movie?.writer);
    const [cast, setCast] = useState(movie?.cast);
    const [trailer_url, setTrailerUrl] = useState(movie?.trailer_url);
    const [errors, setErrors] = useState({ flag: false });
    // const [isDisabled, setIsDisabled] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ flag: false });

        const formData = { title, art, tagline, summary, rating, year, genre, director, writer, cast, trailer_url };
        const frontEndErrors = movieValidation(formData);
        setErrors(frontEndErrors);

        if (!frontEndErrors.flag) {
            let movieResponse;
            const cleanData = cleanMovieForm(formData);

            if (formType === 'Add Film') {
                movieResponse = await dispatch(createMovieThunk(cleanData));
            } else if (formType === 'Edit Film') {
                movieResponse = await dispatch(updateMovieThunk(movie.id, cleanData));
            }

            if (!movieResponse?.id) {
                setErrors({ ...movieResponse, flag: true });
            } else {
                history.push(`/movies/${movieResponse.id}`);
            }
        }
    };

    return (
        <div className='movie-form-container'>
            <form className='movie-form' onSubmit={handleSubmit}>
                <h1>{formType}</h1>
                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-title-input">Title</label>
                        {errors.title ? <p className="errors">{errors.title}</p> : null}
                    </div>
                    <input
                        id="movie-title-input"
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-art-input">Movie Artwork URL</label>
                        {errors.art ? <p className="errors">{errors.art}</p> : null}
                    </div>
                    <input
                        id="movie-art-input"
                        type="text"
                        placeholder="Movie Artwork URL"
                        onChange={(e) => setArt(e.target.value)}
                        value={art}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-tagline-input">Tagline</label>
                        {errors.tagline ? <p className="errors">{errors.tagline}</p> : null}
                    </div>
                    <input
                        id="movie-tagline-input"
                        type="text"
                        placeholder="Tagline"
                        onChange={(e) => setTagline(e.target.value)}
                        value={tagline}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-summary-input">Summary</label>
                        {errors.summary ? <p className="errors">{errors.summary}</p> : null}
                    </div>
                    <input
                        id="movie-summary-input"
                        type="text"
                        placeholder="Summary"
                        onChange={(e) => setSummary(e.target.value)}
                        value={summary}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-rating-input">Rating</label>
                        {errors.rating ? <p className="errors">{errors.rating}</p> : null}
                    </div>
                    <select
                        id="movie-rating-input"
                        type="text"
                        name="rating"
                        placeholder="Rating"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        required
                    >
                        <option value={rating} selected>{rating}</option>
                        {ratings.map(ratingEl => (
                                <option value={ratingEl} key={ratingEl}>{ratingEl}</option>
                        ))}
                    </select>
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-year-input">Year</label>
                        {errors.year ? <p className="errors">{errors.year}</p> : null}
                    </div>
                    <input
                        id="movie-year-input"
                        type="number"
                        pattern="[0-9]{4}"
                        placeholder="Year"
                        onChange={(e) => setYear(e.target.value)}
                        value={year}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-genre-input">Genre</label>
                        {errors.genre ? <p className="errors">{errors.genre}</p> : null}
                    </div>
                    <select
                        id="movie-genre-input"
                        type="text"
                        placeholder="Genre"
                        onChange={(e) => setGenre(e.target.value)}
                        value={genre}
                        required
                    >
                        <option value={genre} selected>{genre}</option>
                        {genres.map(genreEl => (
                            <option value={genreEl} key={genreEl}>{genreEl}</option>
                        ))}
                    </select>
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-director-input">Director</label>
                        {errors.director ? <p className="errors">{errors.director}</p> : null}
                    </div>
                    <input
                        id="movie-director-input"
                        type="text"
                        placeholder="Director"
                        onChange={(e) => setDirector(e.target.value)}
                        value={director}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-writer-input">Writer</label>
                        {errors.writer ? <p className="errors">{errors.writer}</p> : null}
                    </div>
                    <input
                        id="movie-writer-input"
                        type="text"
                        placeholder="Writer"
                        onChange={(e) => setWriter(e.target.value)}
                        value={writer}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-cast-input">Cast (Comma Space Separated Actors)</label>
                        {errors.cast ? <p className="errors">{errors.cast}</p> : null}
                    </div>
                    <input
                        id="movie-cast-input"
                        type="text"
                        placeholder="Matt Damon, Tom Hanks,..."
                        onChange={(e) => setCast(e.target.value)}
                        value={cast}
                        required
                    />
                </div>

                <div className="movie-field">
                    <div className="field-label">
                        <label htmlFor="movie-trailer-input">Trailer URL</label>
                        {errors.trailer_url ? <p className="errors">{errors.trailer_url}</p> : null}
                    </div>
                    <input
                        id="movie-trailer-input"
                        type="text"
                        placeholder="Trailer URL"
                        onChange={(e) => setTrailerUrl(e.target.value)}
                        value={trailer_url}
                    />
                </div>

                <div id="movie-form-button-container">
                    <button
                        id="movie-submit-button"
                        type="submit"
                        // className='new-movie-button'
                    >{formType}
                    </button>
                    {/* <button
                        id="movie-cancel-button"
                        // onClick={handleCancelClick}
                    >Cancel
                    </button> */}
                </div>
            </form>
        </div>
    )
};

export default MovieForm;

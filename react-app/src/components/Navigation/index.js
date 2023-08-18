import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import favicon from '../../../public/'
function Navigation({ isLoaded }){
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	const plusMovie = (e) => {
		e.stopPropagation();
		history.push('/movies/new');
	}

	return (
		<div className='navbar-container'>
			<div>
				<NavLink exact to="/" className='route-home'>
					{/* <img src='/public/favicon.ico'></img> */}
					<i className="fa-solid fa-clapperboard"></i>
					<h2>SceneIt</h2>
				</NavLink>
			</div>
			<ul className='navlinks-container'>
				{isLoaded && (
					<li className='profile-button-li'>
						<ProfileButton user={sessionUser} />
					</li>
				)}
				{/* <li><NavLink to='/movies'>FILMS</NavLink></li>
				<li><NavLink to='/reviews'>REVIEWS</NavLink></li> */}
				{sessionUser?.id && <>
					<li><NavLink to='/profile'>MANAGE</NavLink></li>
					<li className='new-movie-li'>
						<button onClick={plusMovie} className='new-movie-button'>+ Movie</button>
					</li>
				</>}
			</ul>
		</div>
	);
}

export default Navigation;

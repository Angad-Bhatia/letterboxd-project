import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomeLandingPage from "./components/HomeLandingPage";
import ProfilePage from "./components/ProfilePage";
import MovieDetails from "./components/MovieDetails";
import CreateMovie from "./components/MovieForm/CreateMovie";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={HomeLandingPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route path="/movies/new" component={CreateMovie} />
          <Route path="/movies/:movieId" component={MovieDetails}/>
        </Switch>
      )}
    </>
  );
}

export default App;

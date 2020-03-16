import React from "react";
import { connect } from "react-redux"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "../Header"
import Spinner from "../Spinner"
import FavouriteMovies from "../FavouriteMovies"
import MovieSearcher from "../MovieSearcher"


import './style.css';

function App(props) {

  return (
    <Router>
      <Header></Header>
      <div className="container">
        {props.loading && <Spinner></Spinner>}
        <Switch>
          <Route exact path="/" component={MovieSearcher} />
          <Route path="/favourite" component={FavouriteMovies} />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.app.loading,
})


export default connect(mapStateToProps, null)(App)

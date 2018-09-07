import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom'
import FilmList from './components/FilmList'
import Favorites from './components/Favorites'


class App extends Component {
  render() {
    return (
      <div className='App'>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/favorites'>Favorites</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={FilmList}/>
          <Route path="/favorites" component={Favorites}/>
        </Switch>
      </div>
    );
  }
}

export default App;

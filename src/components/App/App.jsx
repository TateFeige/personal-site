import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ReportPage from '../ReportPage/ReportPage';
import FightPage from '../FightPage/FightPage';
import AboutPage from '../AboutPage/AboutPage';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/report" component={ReportPage} />
          <Route path="/fight" component={FightPage} />
          <Route path = "/about" component={AboutPage} />
          <ProtectedRoute exact path="/user" component={UserPage} />
          <ProtectedRoute exact path="/login" authRedirect="/user" component={LoginPage} />
          <ProtectedRoute exact path="/registration" authRedirect="/user" component={RegisterPage} />
          <ProtectedRoute exact path="/home" authRedirect="/user" component={LandingPage} />
          <Route><h1>404</h1></Route>
        </Switch>
        <Footer />
      </div>
      
    </Router>
  );
};


export default App;
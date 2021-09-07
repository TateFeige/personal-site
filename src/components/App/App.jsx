import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ForgotPasswordPage from '../ForgotPasswordPage/ForgotPasswordPage';
import StemtellCard from '../STEMtellCard/STEMtellCard';
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage';
import StemtellDetails from '../StemtellDetails/StemtellDetails';
import './App.css';
import Homepage from '../Homepage/Homepage';
import CreateSTEMtell from '../CreateSTEMtell/CreateSTEMtell';
import ClassList from '../ClassList/ClassList';
import ClassDetails from '../ClassDetails/ClassDetails';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
   useEffect(() => {
      dispatch({ type: 'FETCH_USER' });
   }, [dispatch]);


  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/homepage" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
            <StemtellCard />
          </Route>
          <Route
            exact
            path="/forgotpassword"
          >
            <ForgotPasswordPage />
          </Route>
          <Route
            path ="/resetpassword/"
          >
             <ResetPasswordPage />
          </Route>

    
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/profile/:id"
          >
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/homepage"
          >
            <Homepage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/myprofile"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows CreateSTEMtell else shows LoginPage
            exact
            path="/create"
          >
            <CreateSTEMtell />
          </ProtectedRoute>

          <ProtectedRoute
            
            exact
            path="/stemtell/:id"
          >
            <StemtellDetails />
          </ProtectedRoute>

            
          <ProtectedRoute
            // logged in shows Class List page
            exact
            path="/classlist"
          >
            <ClassList />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Class List page
            exact
            path="/classlist/details/:id"
          >
            <ClassDetails />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/myprofile" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/myprofile" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/myprofile" />
              :
              // Otherwise, show the user page
              <Homepage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

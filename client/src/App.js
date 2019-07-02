import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute';

//redux setup
import {Provider} from 'react-redux';
import store from './store'

//actions
import { setCurrentUser,logoutUser } from './actions/authActions';

//components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import Request from './components/submitRequest/Request'
import RequestPAX from './components/submitRequest/RequestPAX'
import Landing from './components/layout/Landing';
import Admin from './components/admin/Admin'
import UpdateTrans from './components/admin/UpdateTrans'
import transactionDetail from './components/transaction/transactionDetail'

//for setting uses state login
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Clear current Profile
      // store.dispatch(clearCurrentProfile());
      // Redirect to login
      window.location.href = '/login';
    }

}



class App extends Component {

  render() {
    return (
    <Provider store={store}>
    <div className="App">
        
          <BrowserRouter>
          
            <div>
            <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login}/> 
              <Switch>
                <PrivateRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                  />
              </Switch>
              <Switch>
                <PrivateRoute
                    exact
                    path="/request"
                    component={Request}
                  />
              </Switch>
              <Switch>
                <PrivateRoute
                    exact
                    path="/requestpax"
                    component={RequestPAX}
                  />
              </Switch>
              <Switch>
                <PrivateRoute
                    exact
                    path="/admin"
                    component={Admin}
                  />
              </Switch>
              <Switch>
                <PrivateRoute
                    exact
                    path="/UpdateTrans/:trans_Id"
                    component={UpdateTrans}
                  />
              </Switch>
              <Switch>
                <PrivateRoute
                    exact
                    path="/transactionDetail/:trans_Id"
                    component={transactionDetail}
                  />
              </Switch>
            </div>
            
          </BrowserRouter>
        
        <Footer />
      </div>
    </Provider>
    );
  }
}

export default App;

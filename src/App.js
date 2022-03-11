import './App.css';
import Home from './pages/homePage/home/Home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Header from './pages/sharedPage/header/Header';
import Massage from './pages/massangerPage/Massage';
import Dashboard from './pages/DashboardPage/dashboard/Dashboard';
import NotFound from './pages/sharedPage/notFound/NotFound';

import Register from './pages/formPage/register/Register';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './pages/formPage/privateRoute/PrivateRoute';
import AddProduct from './pages/DashboardPage/addProduct/AddProduct';
import Login from './pages/formPage/login/Login';
import BookingOrder from './pages/homePage/bookingOrder/BookingOrder';
import UserOrder from './pages/DashboardPage/userOrder/UserOrder';
import Explore from './pages/explore/Explore';
import CoustomerReview from './pages/DashboardPage/coustomerReview/CoustomerReview';
import MakeAdmin from './pages/DashboardPage/MakeAdmin/MakeAdmin';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <PrivateRoute exact path="/massage" >
              <Massage />
            </PrivateRoute>

            <Route exact path="/explore" >
              <Explore />
            </Route>
            <Route exact path="/dashboard" >
              <Dashboard />
            </Route>
            <PrivateRoute exact path="/addToCard/:productId">
              <BookingOrder />
            </PrivateRoute>
            <Route exact path="/dashboard/addProduct">
              <AddProduct />
            </Route>
            <Route exact path="/dashboard/makeAdmin">
              <MakeAdmin />
            </Route>
            <Route exact path="/dashboard/userOrder">
              <UserOrder />
            </Route>
            <Route exact path="/dashboard/review">
              <CoustomerReview />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/singup">
              <Register />
            </Route>

            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div >
  );
}

export default App;

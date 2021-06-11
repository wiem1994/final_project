import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import LandPage from "./Pages/LandPage/LandPage";
import Errors from "./Pages/Errors/Errors";
import { Switch, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { current } from "./Redux/actions/user";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar/NavBar";
import Contact from "./Pages/Contact/Contact";
import Products from "./Pages/ProductList/ProductList";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Cart from "./Pages/Cart/Cart";
import FavoriteCartList from "./Pages/FavoriteCartList/FavoriteCartList";
import OrderPage from "./Pages/OrderPage/OrderPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import OrderPageAdmin from "./Pages/OrderPage/OrderPageAdmin";

function App() {
    const dispatch = useDispatch();
    // const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(current());

        // eslint-disable-next-line
    }, []);

    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/" component={LandPage} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/contact" component={Contact} />
                <Route exact path="/products" component={Products} />
                <Route path="/cart/:id" component={Cart} />
                <Route path="/products/:id" component={ProductDetail} />
                <Route path="/favorite/:id" component={FavoriteCartList} />
                <Route path="/order/:id" component={OrderPage} />
                <Route path="/admin/order" component={OrderPageAdmin} />
                <Route path="/admin" component={AdminPage} />

                <Route path="/*" component={Errors} />
            </Switch>
        </div>
    );
}

export default App;

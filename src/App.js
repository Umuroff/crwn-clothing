import logo from './logo.svg';
import './App.css';
import {Redirect, Route, Routes, Navigate} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {Component} from "react";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {mapStateToPropsFactory} from "react-redux/es/connect/mapStateToProps";


class App extends Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {
        return (
            <div className="App">
                <Header/>
                <Routes>
                    <Route  path="/" element={<HomePage/>}/>
                    <Route  path="/shop" element={<ShopPage/>}/>
                    <Route  path="/signIn"
                            element={ this.props.currentUser ? <Navigate to="/"/> : <SignInAndSignUpPage/> }
                            // render={()=>this.props.currentUser ? <Navigate to="/"/> : <SingInAndSignUpPage/> }
                    />
                </Routes>
            </div>
        );
    }
}
const mapStateToProps=({user})=>({
    currentUser:user.currentUser
})
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user =>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

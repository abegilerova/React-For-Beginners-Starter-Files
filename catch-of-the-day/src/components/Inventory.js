import React from "react";
import AddFishForm from './AddFishForm';
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, { firebaseApp } from '../base';
import firebase from 'firebase';




class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        removeFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async (authData) => {
        //1. lookup current store in firebase database

        const store = await base.fetch(this.props.storeId, { context: this });
        console.log("storeid");
        console.log(store);

        //2. claim it if there is no owner
        // save it as our own
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        //3. set the state of the inventory component to reflect current user

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid

        })

        console.log("authdata");
        console.log(authData);

    };
    authenticate = () => {
        const authProvider = new firebase.auth.GithubAuthProvider();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });

    }


    render() {
        const logout = <button onClick={this.logout}> Log Out!</button >



        //1. check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        //2. check if thet are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (<div>
                <p>Sorry, You are not the owner</p>
                {logout}
            </div>
            );
        }

        //3. They must be the owner, just render the inventory


        return (
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key =>
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        removeFish={this.props.removeFish}
                    />)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;
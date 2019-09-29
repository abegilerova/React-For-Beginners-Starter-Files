import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import PropTypes from "prop-types";



class App extends React.Component {


    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object

    }



    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        console.log(localStorageRef);
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
        console.log("It updated");
    }


    componentWillUnmount() {

        console.log("Unmounting!");
        base.removeBinding(this.ref);

    }



    addFish = fish => {

        //1. Take a copy of existing state
        //this.state.fishes.push(fish);

        const fishes = { ...this.state.fishes };
        //2. add our new fish to that fishes variable

        fishes[`fish${Date.now()}`] = fish;

        //3. Set the new fishes object to state

        this.setState({ fishes: fishes });
        console.log("fishes");
        console.log(fishes);
    };


    updateFish = (key, updatedFish) => {

        //1.take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. update the state
        fishes[key] = updatedFish;

        //3. set that to state

        this.setState({ fishes });
    };

    removeFish = (key) => {
        //1.take a copy of the current state
        const fishes = { ...this.state.fishes };
        //2. update the state
        fishes[key] = null;

        //3. set that to state

        this.setState({ fishes });


    };


    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = key => {
        //1. take a copy of a state

        const order = { ...this.state.order };
        console.log("order")
        console.log(order);

        console.log("order key")

        console.log(order[key]);

        //2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        //3. Call setState to update our state object
        this.setState({ order: order });
        console.log("last log")
        console.log(order[key]);
    }


    removeFromOrder = key => {
        const order = { ...this.state.order };

        //2. remove item from order
        delete order[key];
        //3. Call setState to update our state object
        this.setState({ order: order });

    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seafood market" age={500} cool={true} />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key =>
                            <Fish
                                key={key}
                                index={key}
                                details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}

                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId} />
            </div>
        );


    }
}

export default App;
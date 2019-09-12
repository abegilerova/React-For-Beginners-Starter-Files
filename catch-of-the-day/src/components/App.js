import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

class App extends React.Component {


    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {

        //1. Take a copy of existing state
        //this.state.fishes.push(fish);

        const fishes = { ...this.state.fishes };
        //2. add our new fish to that fishes variable

        fishes[`fish${Date.now()}`] = fish;

        //3. Set the new fishes object to state

        this.setState({
            fishes: fishes
        });


    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seafood market" age={500} cool={true} />
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        );


    }
}

export default App;
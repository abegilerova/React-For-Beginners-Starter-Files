import React from 'react';
import { getFunName } from "../helpers";
import PropTypes from "prop-types";


class StorePicker extends React.Component {


    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object

    };

    //instead of bining in constructor we transformed function into property
    goToStore = event => {
        //stop the form from submitting
        event.preventDefault();
        //2. get the text from that input
        // const storeName = this.myInput;
        const storeName = this.myInput.current.defaultValue;



        //3. change the page to /store/whatever-they-entered

        this.props.history.push(`/store/${storeName}`);


    };
    render() {

        return (
            <>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter A Store</h2>
                    <input
                        type="text"
                        ref={this.myInput}
                        required placeholder="Store Name"
                        defaultValue={getFunName()} />
                    <button type="submit">Visit Store -></button>
                </form>
            </>
        )
    }
}

export default StorePicker;


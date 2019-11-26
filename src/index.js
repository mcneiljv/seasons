import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat:null, errorMessage: '' };

    componentDidMount () {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    // Helper function to avoid conditionals in render
    renderContent() {
        // Conditional logic for displaying messaging
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        } 
        
        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={ this.state.lat } />
        }
        
        return <Spinner message="Please accept the location request..." />;
    }

    // We have to define render in React
    render() {
        return <div> {this.renderContent()} </div>;
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

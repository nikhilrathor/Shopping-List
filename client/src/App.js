import React, { Component } from 'react';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap'
import { loadUser } from './actions/authActions';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        {
          this.props.isAuthenticated ?
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
            : <Alert color="primary">
              Register or Log in, To Continue Creating Your Shopping List
          </Alert>}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loadUser })(App);

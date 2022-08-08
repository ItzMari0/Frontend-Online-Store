import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import ShoppingCart from './Components/ShoppingCart';
import ProductDetail from './Components/ProductDetail';

class App extends React.Component {
  constructor() {
    super();
    this.state = { cartProducts: [] };
    this.handleCart = this.handleCart.bind(this);
  }

  handleCart(_event, item) {
    this.setState((prevState) => ({ cartProducts: [...prevState.cartProducts, item] }));
  }

  render() {
    const { cartProducts } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => <Home handleCart={ this.handleCart } /> }
            />
            <Route
              exact
              path="/shopping-cart"
              render={ () => <ShoppingCart cartProducts={ cartProducts } /> }
            <Route
              exact
              path="/product-details/:id"
              render={ (props) => <ProductDetail { ...props } /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

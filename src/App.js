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
    const { cartProducts } = this.state;
    const filtred = cartProducts.filter((i) => i !== item);
    if (_event.target.value === 'Remover Item') {
      this.setState((prevState) => (
        { cartProducts: [...prevState.cartProducts.filter((i) => i !== item)] }));
      return this.setState({ cartProducts: [...filtred] });
    }
    if (_event.target.value === '-') {
      const soItens = cartProducts.filter((i) => i === item);
      if (soItens.length > 1) {
        soItens.pop();
      }
      this.setState({ cartProducts: [...soItens, ...filtred] });
    } else {
      this.setState((prevState) => ({ cartProducts: [...prevState.cartProducts, item] }));
    }
  }

  render() {
    const { cartProducts } = this.state;
    /* console.log(cartProducts); */
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
              render={ () => (<ShoppingCart
                handleCart={ this.handleCart }
                cartProducts={ cartProducts }
              />) }
            />
            <Route
              exact
              path="/product-details/:id"
              render={
                (props) => <ProductDetail handleCart={ this.handleCart } { ...props } />
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

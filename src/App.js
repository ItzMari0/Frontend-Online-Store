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

  componentDidMount() {
    if (localStorage.getItem('CardProducts')) {
      const storage = localStorage.getItem('CardProducts');
      const result = JSON.parse(storage);
      this.setState({
        cartProducts: result,
      });
    }
  }

  componentDidUpdate() {
    const { cartProducts } = this.state;
    if (cartProducts) {
      localStorage.setItem('CardProducts', JSON.stringify(cartProducts));
    }
  }

  handleCart(event, item) {
    const { cartProducts } = this.state;
    /* const newItem = {...item, qt: 1}; */
    const filtered = cartProducts.filter((i) => i[0].id !== item.id);
    console.log(filtered);
    if (event.target.value === 'Remover Item') {
      return this.setState({ cartProducts: [...filtered] });
    }
    if (event.target.value === '-') {
      let qnt = 1;
      cartProducts.forEach((e, index) => {
        if (e[0].id === item.id) {
          qnt = e[1] - 1;
          cartProducts.splice(index, 1);
        }
      });
      return this.setState((prevState) => ({
        cartProducts: [...prevState.cartProducts, [item, qnt]],
      }));
    }
    let qnt = 1;
    cartProducts.forEach((e) => {
      if (e[0].id === item.id) qnt = e[1] + 1;
    });
    if (qnt > 1) {
      (cartProducts.forEach((e, index) => {
        if (e[0].id === item.id) cartProducts.splice(index, 1);
      }));
    }
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, [item, qnt]],
    }));
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

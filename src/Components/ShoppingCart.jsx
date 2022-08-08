import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class ShoppingCart extends Component {
  render() {
    const { cartProducts } = this.props;
    return (
      <div>
        {
          (!cartProducts.length)
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : <Card returnedProducts={ cartProducts } renderBtn />
        }
      </div>

    );
  }
}

ShoppingCart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};
ShoppingCart.defaultProps = {
  cartProducts: [],
};

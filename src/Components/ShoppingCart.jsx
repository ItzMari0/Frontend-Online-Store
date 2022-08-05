import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCart extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {
          (!products.length)
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : <div />
        }
      </div>

    );
  }
}

ShoppingCart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
};
ShoppingCart.defaultProps = {
  products: [],
};

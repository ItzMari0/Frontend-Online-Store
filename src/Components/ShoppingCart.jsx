import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartRender from './CartRender';

export default class ShoppingCart extends Component {
  render() {
    const { cartProducts, handleCart } = this.props;
    return (
      <div>
        {
          (!cartProducts.length)
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              <div>
                <CartRender
                  handleCart={ handleCart }
                  returnedProducts={ cartProducts }
                  renderBtn
                />
                <Link to="/checkout" data-testid="checkout-products">
                  Finalizar Compra
                </Link>
              </div>)
        }
      </div>

    );
  }
}

ShoppingCart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  handleCart: PropTypes.func.isRequired,
};
ShoppingCart.defaultProps = {
  cartProducts: [],
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormCheckout from './FormCheckout';

class Checkout extends Component {
  render() {
    const { cartProducts, changeLinkPay } = this.props;
    const resume = cartProducts.map((e) => (
      <p
        key={ e[0].id }
      >
        { `${e[0].title}` }
      </p>));
    return (
      <div>
        { resume }
        <FormCheckout changeLinkPay={ changeLinkPay } />
      </div>
    );
  }
}

Checkout.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  changeLinkPay: PropTypes.func.isRequired,
};
Checkout.defaultProps = {
  cartProducts: [],
};

export default Checkout;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProductDetail extends Component {
  state = {
    productDetails: '',
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      productDetails: product,
    });
  }

  render() {
    const { productDetails } = this.state;
    const { title, thumbnail, price } = productDetails;
    const { handleCart } = this.props;
    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <h2 data-testid="product-detail-price">{price}</h2>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <Link
          to="../shopping-cart"
          data-testid="shopping-cart-button"
        >
          <button type="button">Ir para o Carrinho</button>
        </Link>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ (event) => handleCart(event, productDetails) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleCart: PropTypes.func,
};

ProductDetail.defaultProps = {
  handleCart: () => { },
};

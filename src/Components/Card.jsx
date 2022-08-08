import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { returnedProducts, handleCart, renderBtn } = this.props;
    const listItemsCart = [...new Set(returnedProducts)];
    let listProducts = listItemsCart.map((product) => {
      const qntCart = returnedProducts.filter((element) => element === product);
      return (
        <Link
          to={ `/product-details/${id}` }
          data-testid="product-detail-link"
          key={ index }
        >
          <div data-testid="product" key={ product.id }>
            <p data-testid="shopping-cart-product-name">{ product.title }</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{`R$ ${product.price}`}</p>
            {
              !renderBtn ? ''
                : (
                  <p data-testid="shopping-cart-product-quantity">
                    { `Quantidade: ${qntCart.length}` }
                  </p>)
            }
            {
              !renderBtn ? (
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ (event) => handleCart(event, product) }
                >
                  Adicionar ao Carrinho
                </button>)
                : ''
            }
          </div>
        );
      });
    if (returnedProducts.length === 0) {
      (listProducts = <p>Nenhum produto foi encontrado</p>);
    }
    return (
      <div>
        { listProducts }
      </div>
    );
  }
}

Card.propTypes = {
  returnedProducts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  handleCart: PropTypes.func,
  renderBtn: PropTypes.bool,
};
Card.defaultProps = {
  returnedProducts: [],
  renderBtn: false,
  handleCart: () => { },
};

export default Card;

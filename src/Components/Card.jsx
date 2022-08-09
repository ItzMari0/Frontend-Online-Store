import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { returnedProducts, handleCart, renderBtn } = this.props;
    const listItemsCart = [...new Set(returnedProducts)];
    let listProducts = listItemsCart.map((product, index) => {
      const qntCart = returnedProducts.filter((element) => element === product);
      return (
        <div data-testid="product" key={ product.id }>
          <Link
            to={ `/product-details/${product.id}` }
            data-testid="product-detail-link"
            key={ index }
          >
            <p data-testid="shopping-cart-product-name">{product.title}</p>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{`R$ ${product.price}`}</p>
          </Link>
          {
            !renderBtn ? ''
              : (
                <>
                  <input
                    type="button"
                    id="add+Item"
                    value="+"
                    data-testid="product-increase-quantity"
                    onClick={ (event) => handleCart(event, product) }
                  />
                  <input
                    type="button"
                    id="add-Item"
                    value="-"
                    disabled={ qntCart.length === 1 }
                    data-testid="product-decrease-quantity"
                    onClick={ (event) => handleCart(event, product) }
                  />
                  <p data-testid="shopping-cart-product-quantity">
                    {`Quantidade: ${qntCart.length}`}
                  </p>
                  <input
                    type="button"
                    id="remove-product"
                    data-testid="remove-product"
                    value="Remover Item"
                    onClick={ (event) => handleCart(event, product) }
                  />
                </>
              )
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
        {listProducts}
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

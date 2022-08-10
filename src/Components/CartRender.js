import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartRender extends Component {
  render() {
    const { returnedProducts, handleCart, renderBtn } = this.props;
    const listProducts = returnedProducts.map((product) => {
      console.log(product);
      return (
        <div data-testid="product" key={ product[0].id }>
          <Link
            to={ `/product-details/${product[0].id}` }
            data-testid="product-detail-link"
          >
            <p data-testid="shopping-cart-product-name">{product[0].title}</p>
            <img src={ product[0].thumbnail } alt={ product[0].title } />
            <p>{`R$ ${product[0].price}`}</p>
          </Link>
          {
            !renderBtn ? ''
              : (
                <>
                  <input
                    type="button"
                    name="add+Item"
                    value="+"
                    data-testid="product-increase-quantity"
                    onClick={ (event) => handleCart(event, product[0]) }
                  />
                  <input
                    type="button"
                    name="add-Item"
                    value="-"
                    disabled={ product[1] === 1 }
                    data-testid="product-decrease-quantity"
                    onClick={ (event) => handleCart(event, product[0]) }
                  />
                  <p data-testid="shopping-cart-product-quantity">
                    {`Quantidade: ${product[1]}`}
                  </p>
                  <input
                    type="button"
                    name="remove-product"
                    data-testid="remove-product"
                    value="Remover Item"
                    onClick={ (event) => handleCart(event, product[0]) }
                  />
                </>
              )
          }
        </div>
      );
    });
    return (
      <div>
        {listProducts}
      </div>
    );
  }
}

CartRender.propTypes = {
  returnedProducts: PropTypes.arrayOf(PropTypes.shape(
    [],
  )),
  handleCart: PropTypes.func,
  renderBtn: PropTypes.bool,
};
CartRender.defaultProps = {
  returnedProducts: [],
  renderBtn: false,
  handleCart: () => { },
};

export default CartRender;

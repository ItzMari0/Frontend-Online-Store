import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { returnedProducts } = this.props;
    let listProducts = returnedProducts.map(({ title, thumbnail, price, id }, index) => (
      <Link
        to={ `/product-details/${id}` }
        data-testid="product-detail-link"
        key={ index }
      >
        <div data-testid="product" key={ index }>
          <p>{ title }</p>
          <img src={ thumbnail } alt={ title } />
          <p>{`R$ ${price}`}</p>
        </div>
      </Link>
    ));
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
};
Card.defaultProps = {
  returnedProducts: [],
};

export default Card;

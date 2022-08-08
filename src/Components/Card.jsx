import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { returnedProducts } = this.props;
    let listProducts = returnedProducts.map(({ title, thumbnail, price }, id) => (
      <div data-testid="product" key={ id }>
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price}`}</p>
      </div>
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

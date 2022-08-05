import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = { product: '', products: [] };
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { product, products } = this.state;
    return (
      <div>
        <input type="text" name="product" onChange={ this.handleChange } />
        {
          product === ''
            ? (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>)
            : products
        }
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = { product: '', products: [], categories: [] };
  }

  componentDidMount() {
    this.setState(async () => {
      const categories = await getCategories();
      return this.setState({ categories });
    });
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { product, products, categories } = this.state;
    const categoriesProduct = categories.map(({ name, id }) => (
      <button data-testid="category" type="button" key={ id }>{ name }</button>
    ));
    return (
      <div>
        <div>
          { categoriesProduct }
        </div>
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

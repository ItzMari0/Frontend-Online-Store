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
      <label data-testid="category" key={ id } htmlFor={ id }>
        <input type="radio" name="category" id={ id } />
        { name }
      </label>
    ));
    return (
      <div className="div-home">
        <div className="div-category">
          { categoriesProduct }
        </div>
        <div className="div-input">
          <input
            className="input-search"
            type="text"
            name="product"
            onChange={ this.handleChange }
          />
          {
            product === ''
              ? (
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>)
              : products
          }
        </div>
      </div>
    );
  }
}

export default Home;

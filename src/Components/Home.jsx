import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCategories = this.handleCategories.bind(this);
    this.state = {
      product: '',
      products: [],
      categories: [],
      id: '',
      returnedProducts: [],
    };
  }

  componentDidMount() {
    this.setState(async () => {
      const categories = await getCategories();
      return this.setState({ categories });
    });
  }

  handleChange({ target }, idProduct) {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    if (idProduct === '') this.setState({ [name]: value });
    else this.setState({ [name]: value, id: idProduct });
  }

  handleClick() {
    const { id, product } = this.state;
    if (id === '' && product === '') return this.setState({ returnedProducts: [] });
    this.setState(async () => {
      const data = await getProductsFromCategoryAndQuery(id, product);
      return this.setState({ returnedProducts: data.results });
    });
  }

  handleCategories(_event, id) {
    this.setState(async () => {
      const data = await getProductsFromCategoryAndQuery(id);
      return this.setState({ returnedProducts: data.results });
    });
  }

  render() {
    const { product, products, categories, returnedProducts } = this.state;
    const categoriesProduct = categories.map(({ name, id }) => (
      <label data-testid="category" key={ id } htmlFor={ id }>
        <input
          type="radio"
          name="category"
          id={ id }
          onChange={ (event) => this.handleChange(event, id) }
          onClick={ (event) => this.handleCategories(event, id) }
        />
        { name }
      </label>
    ));
    return (

      <div>
        <Link
          products={ products }
          to="./shopping-cart"
          data-testid="shopping-cart-button"
        >
          <button type="button">Ir para o Carrinho</button>
        </Link>
        <div className="div-home">
          <div className="div-category">
            { categoriesProduct }
          </div>
          <div className="div-input">
            <input
              className="input-search"
              data-testid="query-input"
              type="text"
              name="product"
              placeholder="Pesquise por produtos"
              onChange={ (event) => this.handleChange(event, '') }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
            {
              product === ''
                ? (
                  <p data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </p>)
                : products
            }
            { <Card returnedProducts={ returnedProducts } /> }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

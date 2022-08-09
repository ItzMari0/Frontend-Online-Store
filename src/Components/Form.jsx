import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      rating: '',
      text: '',
      comments: [],
      validation: true,
      /* disabled: true, */
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { idPage } = this.props;
    if (localStorage[idPage] !== undefined) {
      const comments = JSON.parse(localStorage[idPage]);
      this.setState({ comments, email: '', rating: '', text: ''/* , disabled: true */ });
    }
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({ [name]: value });/* , () => {
      const { email, rating } = this.state;
      if (email.includes('@') && email.includes('.com') && rating !== '') {
        this.setState({ disabled: false });
      } else this.setState({ disabled: true });
    } */
  }

  handleClick() {
    const { email, text, rating } = this.state;
    const objComment = { email, text, rating };
    const { idPage } = this.props;
    if (
      ((email.includes('@'))
      && (email.includes('.com'))
      && (rating !== ''))) {
      this.setState({ validation: true });
    } else {
      this.setState({ validation: false });
      return;
    }
    this.setState((prevState) => (
      {
        comments: [...prevState.comments, objComment],
        email: '',
        text: '',
        rating: '',
        /* disabled: true, */
      }), () => {
      const { comments } = this.state;
      localStorage.setItem([idPage], JSON.stringify(comments));
    });
  }

  render() {
    const { comments, email, text, rating, validation/* , disabled */ } = this.state;
    return (
      <div>
        <h2>Avaliação</h2>
        <form>
          <input
            data-testid="product-detail-email"
            type="email"
            required
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="1-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="1"
            checked={ rating === '1' }
            required
          />
          <input
            data-testid="2-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="2"
            checked={ rating === '2' }
            required
          />
          <input
            data-testid="3-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="3"
            checked={ rating === '3' }
            required
          />
          <input
            data-testid="4-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="4"
            checked={ rating === '4' }
            required
          />
          <input
            data-testid="5-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="5"
            checked={ rating === '5' }
            required
          />
          <textarea
            name="text"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
            value={ text }
          />
          <button
            type="reset"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
            /* disabled={ disabled } */
          >
            Avaliar
          </button>
          { !validation ? <p data-testid="error-msg">Campos inválidos</p> : null }
        </form>
        <br />
        {
          (
            comments.map((element, index) => (
              <div key={ index }>
                <p data-testid="review-card-email">{ element.email }</p>
                {/* <input
                  data-testid="review-card-rating"
                  disabled
                  type="radio"
                  checked={ element.rating === '1' }
                  id="1"
                /> */}
                <p data-testid="review-card-rating">{ element.rating }</p>
                {/* <input
                  data-testid="review-card-rating"
                  disabled
                  type="radio"
                  checked={ element.rating === '2' }
                  id="2"
                />
                <input
                  data-testid="review-card-rating"
                  disabled
                  type="radio"
                  checked={ element.rating === '3' }
                  id="3"
                />
                <input
                  data-testid="review-card-rating"
                  disabled
                  type="radio"
                  checked={ element.rating === '4' }
                  id="4"
                />
                <input
                  data-testid="review-card-rating"
                  disabled
                  type="radio"
                  checked={ element.rating === '5' }
                  id="5"
                /> */}
                <p data-testid="review-card-evaluation">{ element.text }</p>
              </div>)))
        }
      </div>
    );
  }
}

Form.propTypes = {
  idPage: PropTypes.string.isRequired,
};

export default Form;

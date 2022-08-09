import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      rating: '',
      text: '',
      comments: [],
      disabled: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (localStorage.comments !== undefined) {
      const comments = JSON.parse(localStorage.comments);
      this.setState({ comments, email: '', rating: '', text: '', disabled: false });
    }
  }

  handleChange({ target }) {
    const { name } = target;
    console.log(target.value);
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({ [name]: value }, () => {
      const { email, rating } = this.state;
      if (email.includes('@') && email.includes('.com') && rating !== '') {
        this.setState({ disabled: false });
      } else this.setState({ disabled: true });
    });
  }

  handleClick() {
    const { email, text, rating } = this.state;
    const objComment = { email, text, rating };
    this.setState((prevState) => (
      {
        comments: [...prevState.comments, objComment],
        email: '',
        text: '',
        rating: '',
        disabled: true,
      }), () => {
      const { comments } = this.state;
      localStorage.setItem('comments', JSON.stringify(comments));
    });
  }

  render() {
    const { comments, email, text, disabled } = this.state;
    return (
      <div>
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
            required
          />
          <input
            data-testid="2-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="2"
            required
          />
          <input
            data-testid="3-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="3"
            required
          />
          <input
            data-testid="4-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="4"
            required
          />
          <input
            data-testid="5-rating"
            name="rating"
            type="radio"
            onChange={ this.handleChange }
            id="5"
            required
          />
          <textarea
            name="text"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
            value={ text }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            Avaliar
          </button>
        </form>
        <div>
          {
            comments.map((element, index) => (
              <div key={ index }>
                <p>{ element.email }</p>
                <p>{ element.text }</p>
                <input disabled type="radio" checked={ element.rating === '1' } id="1" />
                <input disabled type="radio" checked={ element.rating === '2' } id="2" />
                <input disabled type="radio" checked={ element.rating === '3' } id="3" />
                <input disabled type="radio" checked={ element.rating === '4' } id="4" />
                <input disabled type="radio" checked={ element.rating === '5' } id="5" />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Form;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CEP_VALID = 8;
const TEL_VALID = 11;

class FormCheckout extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
      cpf: '',
      tel: '',
      cep: '',
      address: '',
      pay: '',
      validation: true,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { changeLinkPay } = this.props;
    const {
      name,
      email,
      cpf,
      tel,
      cep,
      address,
      pay,
    } = this.state;
    if (
      ((email.includes('@'))
      && (email.includes('.com'))
      && name.length !== 0
      && name !== ''
      && cpf.length !== 0
      && tel.length === TEL_VALID
      && cep.length === CEP_VALID
      && address.length !== 0
      && pay.length !== 0)) {
      this.setState({ validation: true });
      changeLinkPay(true);
    } else {
      this.setState({ validation: false });
      changeLinkPay(false);
    }
  }

  render() {
    const { validation } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="checkout-fullname"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="email"
            data-testid="checkout-email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
            onChange={ this.handleChange }
          />
          <input
            name="tel"
            type="text"
            data-testid="checkout-phone"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            data-testid="checkout-cep"
            onChange={ this.handleChange }
            name="cep"
          />
          <input
            type="text"
            name="address"
            data-testid="checkout-address"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            name="pay"
            id="ticket"
            data-testid="ticket-payment"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            name="pay"
            id="visa"
            data-testid="visa-payment"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            name="pay"
            id="master"
            data-testid="master-payment"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            name="pay"
            id="elo"
            data-testid="elo-payment"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.handleClick }
          >
            Finalizar Compra
          </button>
          { validation ? '' : <p data-testid="error-msg">Campos inválidos</p> }
        </form>
      </div>
    );
  }
}

FormCheckout.propTypes = {
  changeLinkPay: PropTypes.func.isRequired,
};

export default FormCheckout;

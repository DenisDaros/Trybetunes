import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.inputChange = this.inputChange.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.createInputUser = this.createInputUser.bind(this);
    this.state = {
      name: '',
      disabled: true,
      carregando: false,
      usuarioCriado: false,
    };
  }

  async createInputUser() {
    this.setState({ carregando: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ usuarioCriado: true, carregando: false });
  }

  inputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.changeLogin());
  }

  changeLogin() {
    const { name } = this.state;
    const numeroMagico = 3;
    this.setState({ disabled: name.length < numeroMagico });
  }

  render() {
    const { name, disabled, usuarioCriado, carregando } = this.state;
    return (
      <div>
        {usuarioCriado && <Redirect to="/search" />}
        {carregando && <Loading />}
        {!carregando && (
          <div data-testid="page-login">
            Login
            <form>
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.inputChange }
                data-testid="login-name-input"
              />
              <button
                type="submit"
                data-testid="login-submit-button"
                name="entrar"
                disabled={ disabled }
                onClick={ this.createInputUser }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;

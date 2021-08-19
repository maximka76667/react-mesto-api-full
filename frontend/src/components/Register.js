import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({email, password});
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input className="auth__input" type="text" id="registerEmail" placeholder="Email" value={email} onChange={handleChangeEmail} required />
          <input className="auth__input" type="text" id="registerPassword" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
          <button className="auth__submit-button">Зарегистрироваться</button>
        </form>
        <Link to="/signin" className="auth__login-link">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  )
}

export default withRouter(Register);
import fail from '../images/fail-icon.svg'
import success from '../images/success-icon.svg'
import { useLocation } from 'react-router-dom'

function InfoTooltip(props) {
  const location = useLocation();

  return (
    <div className={`popup popup_type_info ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container popup__container_type_info">
        <img className="popup__result" src={props.result ? success : fail} alt="loginResult" />
        <h2 className="popup__title popup__title_type_info">{props.result
          ? (() => {
            switch (location.pathname) {
              case '/':
                return 'Вы успешно вошли!'
              
              case '/sign-in':
                return 'Вы успешно зарегистрировались!'

              default:
                return 'Успех!'
            }
          })()
          : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
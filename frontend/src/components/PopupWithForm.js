import React from 'react'

export default function PopupWithForm({ isOpen, isLoading, name, title, onSubmit, submitText, onClose, children, isSubmitValid }) {
  const buttonClassName = (
    `popup__submit-button ${!isSubmitValid ? 'popup__submit-button_disabled' : ''}`
  );

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay popup__overlay_type_remove" onClick={onClose}></div>
      <div className="popup__container popup__container_type_remove">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className={buttonClassName} type="submit" disabled={!isSubmitValid}>{ isLoading ? 'Загрузка...' : submitText }</button>
        </form>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}
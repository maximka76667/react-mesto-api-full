import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  // Validation Constants
  const [nameError, setNameError] = React.useState('');
  const [linkError, setLinkError] = React.useState('');
  const [isNameError, setIsNameError] = React.useState(false);
  const [isLinkError, setIsLinkError] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  // ClassNames
  const nameInputClassName = (
    `popup__input ${isNameError ? 'popup__input_type_error' : ''}`
  );

  const linkInputClassName = (
    `popup__input ${isLinkError ? 'popup__input_type_error' : ''}`
  );

  const nameErrorClassName = (
    `popup__error ${isNameError ? 'popup__error_visible' : ''}`
  );

  const linkErrorClassName = (
    `popup__error ${isLinkError ? 'popup__error_visible' : ''}`
  );

  function handleChangeName(e) {
    setName(e.target.value);

    handleValidation(e);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);

    handleValidation(e);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    
    onAddPlace({
      name,
      link
    })
  }

  function handleValidation(e) {
    const inputElement = e.target;

    switch(inputElement.name) {
      case 'placeName' : {
        if(!inputElement.validity.valid) {
          setIsNameError(true);
          setNameError(inputElement.validationMessage);
          return;
        }
        setIsNameError(false);
        setNameError('');
        break;
      }
      case 'placeLink' : {
        if(!inputElement.validity.valid) {
          setIsLinkError(true);
          setLinkError(inputElement.validationMessage);
          return;
        }
        setIsLinkError(false);
        setLinkError('');
        break;
      }
      default: {}
    }
  }

  React.useEffect(() => {
    setName('');
    setLink('');
    setIsNameError(false);
    setIsLinkError(false);
    setIsSubmitValid(false);
    setNameError('');
    setLinkError('');
  }, [isOpen])

  React.useEffect(() => {
    (!isNameError && !isLinkError && name && link) ? setIsSubmitValid(true) : setIsSubmitValid(false)
  }, [isNameError, isLinkError, name, link])

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={isOpen} isLoading={isLoading} isSubmitValid={isSubmitValid} onClose={onClose} onSubmit={handleAddPlaceSubmit} submitText="Создать">
      <input
        className={nameInputClassName}
        type="text"
        name="placeName"
        id="placeName"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className={nameErrorClassName} id="placeName-error">{ isNameError && nameError }</span>
      <input
        className={linkInputClassName}
        type="url"
        name="placeLink"
        id="placeLink"
        placeholder="Ссылка на картинку"
        minLength="2"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className={linkErrorClassName} id="placeLink-error">{ isLinkError && linkError }</span>
    </PopupWithForm>
  )
}
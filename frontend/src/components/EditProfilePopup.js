import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Validation Constants
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [isNameError, setIsNameError] = React.useState(false);
  const [isDescriptionError, setIsDescriptionError] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  // ClassNames
  const nameInputClassName = (
    `popup__input ${isNameError ? 'popup__input_type_error' : ''}`
  );

  const descriptionInputClassName = (
    `popup__input ${isDescriptionError ? 'popup__input_type_error' : ''}`
  );

  const nameErrorClassName = (
    `popup__error ${isNameError ? 'popup__error_visible' : ''}`
  );

  const descriptionErrorClassName = (
    `popup__error ${isDescriptionError ? 'popup__error_visible' : ''}`
  );

  function handleChangeName(e) {
    setName(e.target.value);
    handleValidation(e);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    handleValidation(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleValidation(e) {
    const inputElement = e.target;

    switch(inputElement.name) {
      case 'profileName' : {
        if(!inputElement.validity.valid) {
          setIsNameError(true);
          setNameError(inputElement.validationMessage);
          setIsSubmitValid(false);
          return;
        }
        setIsNameError(false);
        setNameError('');
        setIsSubmitValid(true);
        break;
      }
      case 'profilePosition' : {
        if(!inputElement.validity.valid) {
          setIsDescriptionError(true);
          setDescriptionError(inputElement.validationMessage);
          setIsSubmitValid(false);
          return;
        }
        setIsDescriptionError(false);
        setDescriptionError('');
        setIsSubmitValid(true);
        break;
      }
      default: {}
    }
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  React.useEffect(() => {
    setIsNameError(false);
    setIsDescriptionError(false);
    setIsSubmitValid(true);
    setNameError('');
    setDescriptionError('');
  }, [isOpen])

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" submitText="Сохранить" isOpen={isOpen} isLoading={isLoading} isSubmitValid={isSubmitValid} onClose={onClose} onSubmit={handleSubmit} >
      <input
        className={nameInputClassName}
        type="text"
        name="profileName"
        id="profileName"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
        value={`${name}`}
        onChange={handleChangeName}
      />
      <span className={nameErrorClassName}>{ isNameError && nameError }</span>
      <input
        className={descriptionInputClassName}
        type="text"
        name="profilePosition"
        id="profilePosition"
        placeholder="Ваша должность"
        minLength="2"
        maxLength="200"
        required
        value={`${description}`}
        onChange={handleChangeDescription}
      />
      <span className={descriptionErrorClassName}>{ isDescriptionError && descriptionError }</span>
    </PopupWithForm>
  )
}
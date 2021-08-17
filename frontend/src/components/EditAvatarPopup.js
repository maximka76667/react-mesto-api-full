import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {

  const [avatar, setAvatar] = React.useState('');

  // Validation Constants
  const [error, setError] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [isSubmitValid, setIsSubmitValid] = React.useState(false);

  const inputClassName = (
    `popup__input ${isError ? 'popup__input_type_error' : ''}`
  );

  const errorClassName = (
    `popup__error ${isError ? 'popup__error_visible' : ''}`
  );

  function handleUpdateAvatar(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar
    });
  }

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);

    handleValidation(e);
  }

  function handleValidation(e) {
    const inputElement = e.target;

    if (!inputElement.validity.valid) {
      setIsError(true);
      setError(inputElement.validationMessage);
      setIsSubmitValid(false);
    } else {
      setIsError(false);
      setError('');
      setIsSubmitValid(true);
    }
  }

  React.useEffect(() => {
    setIsError(false);
    setIsSubmitValid(false);
    setError('');
    setAvatar('');
  }, [isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} isLoading={isLoading} isSubmitValid={isSubmitValid} onClose={onClose} onSubmit={handleUpdateAvatar} submitText="Сохранить">
      <input
        className={inputClassName}
        type="url"
        name="avatarLink"
        id="avatarLink"
        placeholder="Ссылка на картинку"
        minLength="2"
        required
        onChange={handleChangeAvatar}
        value={avatar}
      />
      <span className={errorClassName} id="avatarLink-error">{isError ? error : ''}</span>
    </PopupWithForm>
  )
}
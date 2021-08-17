import PopupWithForm from './PopupWithForm'

export default function RemovePopup({ isOpen, isLoading, onClose, onCardDelete, card }) {

  function handleCardDelete(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm name="remove" title="Вы уверены?" isOpen={isOpen} isLoading={isLoading} onClose={onClose} onSubmit={handleCardDelete} submitText="Да" isSubmitValid={true} />
  )
}
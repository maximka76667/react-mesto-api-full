export default function ImagePopup({ card, isOpen, onClose }) {
  return(
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay popup__overlay_type_image" onClick={onClose}></div>
      <div className="popup__container popup__container_type_image">
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <h2 className="popup__title popup__title_type_image">{card?.name || ''}</h2>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}
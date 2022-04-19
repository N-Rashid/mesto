const profileEdit = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__btn-close');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-name');
let aboutInput = formElement.querySelector('.popup__input-about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


function popupToggle() {
  popup.classList.toggle('popup__opened');

}

function closePopup () {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  popupToggle();
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;

  closePopup ();
}

popupClose.addEventListener('click', closePopup);
profileEdit.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);


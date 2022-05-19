const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profileEdit = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector(".popup_profile");
const popupProfileCloseButton = popupProfile.querySelector(".popup__btn-close");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const nameInput = popupProfileForm.querySelector(".popup__input-name");
const aboutInput = popupProfileForm.querySelector(".popup__input-about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupBtnProfile = popupProfileForm.querySelector('.popup__btn');



// Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", keyHandler);
  popup.addEventListener("mousedown", overlayClose);
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", keyHandler);
  popup.removeEventListener("mousedown", overlayClose);
  popupResetError('popup__input_type_error');
};

function popupProfileOpen() {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  enableButton(popupBtnProfile, options);
  openPopup(popupProfile);
};

function submitProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closePopup(popupProfile);
};

function overlayClose (evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  };
};

function keyHandler (evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
};

popupProfileCloseButton.addEventListener("click", () =>
  closePopup(popupProfile)
);

function popupResetError (selector) {
  const popupReset = document.querySelectorAll('.' + selector);
  popupReset.forEach ((element) => {
    element.textContent = '';
    element.classList.remove(selector);
  });
};

profileEdit.addEventListener("click", popupProfileOpen);
popupProfileForm.addEventListener("submit", submitProfileForm);


// Карточки

const popupAdd = document.querySelector(".popup_add");
const popupCloseAdd = popupAdd.querySelector(".popup__btn-close_add");
const popupFormAdd = popupAdd.querySelector(".popup__form_add");
const inputNameAdd = popupAdd.querySelector(".popup__input-add-name");
const inputLink = popupAdd.querySelector(".popup__input-link");
const cardTemplate = document
  .querySelector(".template-card")
  .content.querySelector(".card");
const photoCards = document.querySelector(".photo-cards");
const profileAdd = document.querySelector(".profile__button-add");
const popupImageClose = document.querySelector(".popup-image__close");
const popupImage = document.querySelector(".popup-image");
const popupCardImage = popupImage.querySelector(".popup-image__card-image");
const popupImageTitle = popupImage.querySelector(".popup-image__title");
const popupAddButton = popupFormAdd.querySelector('.popup__btn');

profileAdd.addEventListener("click", openAdd);
popupCloseAdd.addEventListener("click", () => closePopup(popupAdd));
popupFormAdd.addEventListener("submit", addCard);
popupImageClose.addEventListener("click", () => closePopup(popupImage));

function openAdd() {
  popupFormAdd.reset();
  disabledButton(popupAddButton, options);
  openPopup(popupAdd);
};

function deleteCard(event) {
  event.target.closest(".card").remove();
};

const likeCardToggle = function (evt) {
  evt.target.classList.toggle("card__like_active");
};

const generateCard = function (item) {
  const newCards = cardTemplate.cloneNode(true);

  const cardTitle = newCards.querySelector(".card__title");
  const cardImage = newCards.querySelector(".card__image");
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardImage.addEventListener("click", function () {
    popupCardImage.src = item.link;
    popupCardImage.alt = item.name;
    popupImageTitle.textContent = item.name;
    openPopup(popupImage);
  });

  const cardDelete = newCards.querySelector(".card__delete");
  cardDelete.addEventListener("click", deleteCard);
  const likeCard = newCards.querySelector(".card__like");
  likeCard.addEventListener("click", likeCardToggle);
  return newCards;
};

const renderCards = function (item) {
  photoCards.prepend(generateCard(item));
};

initialCards.forEach(function (item) {
  renderCards(item);
});

function addCard (event) {
  event.preventDefault();

  renderCards({ name: inputNameAdd.value, link: inputLink.value });
  closePopup(popupAdd);
};

const profileEdit = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const popupClose = popup.querySelector(".popup__btn-close");
let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input-name");
let aboutInput = formElement.querySelector(".popup__input-about");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

// Popup
function popupToggle() {
  popup.classList.toggle("popup__opened");
}

function closePopup() {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  popupToggle();
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;

  closePopup();
}

popupClose.addEventListener("click", closePopup);
profileEdit.addEventListener("click", popupToggle);
formElement.addEventListener("submit", formSubmitHandler);

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

const popupImageClose = document.querySelector(".popup__close");
const popupImage = document.querySelector(".popup-image");

profileAdd.addEventListener("click", popupToggleAdd);
popupCloseAdd.addEventListener("click", popupToggleAdd);
popupFormAdd.addEventListener("submit", cardAdd);
popupImageClose.addEventListener("click", popupCardClose);

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

function popupCardClose() {
  popupImage.classList.remove("popup-image_opened");
};

function deleteCards(event) {
  event.target.closest(".card").remove();
};

const likeCardToggle = function (evt) {
  evt.target.classList.toggle("card__like_active");
};

const generateCards = function (item) {
  const newCards = cardTemplate.cloneNode(true);

  const cardTitle = newCards.querySelector(".card__title");
  const cardImage = newCards.querySelector(".card__image");
  cardTitle.textContent = item.name;
  cardImage.src = item.link;

  const popupCardImage = popupImage.querySelector(".popup-image__card-image");
  const popupImageTitle = document.querySelector(".popup-image__title");

  cardImage.addEventListener("click", function () {
    popupCardImage.src = item.link;
    popupImageTitle.textContent = item.name;
    popupImage.classList.add("popup-image_opened");
  });

  const cardDelete = newCards.querySelector(".card__delete");
  cardDelete.addEventListener("click", deleteCards);
  const likeCard = newCards.querySelector(".card__like");
  likeCard.addEventListener("click", likeCardToggle);
  return newCards;
};

const renderCards = function (item) {
  photoCards.prepend(generateCards(item));
};

initialCards.forEach(function (item) {
  renderCards(item);
});

function cardAdd(event) {
  event.preventDefault();

  renderCards({ name: inputNameAdd.value, link: inputLink.value });
  popupToggleAdd();
};

function popupToggleAdd() {
  popupAdd.classList.toggle("popup__opened");
  inputNameAdd.value = "";
  inputLink.value = "";
};

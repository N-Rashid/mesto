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

// Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

function popupProfileClose () {
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
  closePopup(popupProfile);
};

function submitProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;

  popupProfileClose(popupProfile);
};

popupProfileCloseButton.addEventListener("click", popupProfileClose);
profileEdit.addEventListener("click", () => openPopup(popupProfile));
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

profileAdd.addEventListener("click", () => openPopup(popupAdd));
popupCloseAdd.addEventListener("click", closeAdd);
popupFormAdd.addEventListener("submit", cardAdd);
popupImageClose.addEventListener('click', () => closePopup(popupImage));


function closeAdd () {
  inputNameAdd.value = "";
  inputLink.value = "";
  closePopup(popupAdd);
};

function deleteCard (event) {
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


  const popupCardImage = popupImage.querySelector(".popup-image__card-image");
  const popupImageTitle = document.querySelector(".popup-image__title");

  cardImage.addEventListener("click", function () {
    popupCardImage.src = item.link;
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

function cardAdd(event) {
  event.preventDefault();

  renderCards({ name: inputNameAdd.value, link: inputLink.value });
  closeAdd();
};


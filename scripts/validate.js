enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
});

function showInputError (formElement, inputElement, errorMessage, object) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(object.inputErrorClass);
};

function hideInputError (formElement, inputElement, object) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  error.classList.remove(object.inputErrorClass);
  error.textContent = '';
};

function checkInputValidity (formElement, inputElement, object) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
};
};

function setEventListeners (formElement, object) {
const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
const buttonElement = formElement.querySelector(object.submitButtonSelector);
toggleButtonState (inputList, buttonElement, object);
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function() {
    checkInputValidity(formElement, inputElement, object);
    toggleButtonState (inputList, buttonElement, object);
  });
});
};

function enableValidation (object) {
  const forms = Array.from(document.querySelectorAll(object.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


function toggleButtonState (inputList, buttonElement, object) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

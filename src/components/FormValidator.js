export const config = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_invalid",
    inputErrorClass: "form__input_invalid",
    errorClass: "error" ,
  };
  
  export class FormValidator {
    constructor(config, popupFormElement) {
      this._config = config;
      this._element = document.querySelector(popupFormElement);
      this._button = this._element.querySelector(
        this._config.submitButtonSelector);
      this._inputList = this._element.querySelectorAll(
        this._config.inputSelector); 
    }
  
    // показать ошибку
    _showError(errorElement, inputElement) {
      (errorElement.textContent = inputElement.validationMessage),
        inputElement.classList.add(this._config.inputErrorClass);
    }
  
    // спрятать ошибку
    _hideError(errorElement, inputElement) {
      (errorElement.textContent = ""),
      inputElement.classList.remove(this._config.inputErrorClass);
    }
  
    // проверка инпутов на валидность
    _checkInput(inputElement) {
      const isInputNotValidity = !inputElement.validity.valid;
      const errorElement = this._element.querySelector(
        `#${inputElement.id}-error`
      );
  
      if (isInputNotValidity) {
        this._showError(errorElement, inputElement);
      } else {
        this._hideError(errorElement, inputElement);
      }
    }
    // блокировка кнопки
    disabledButton() {
      this._button.classList.add(this._config.inactiveButtonClass)
      this._button.disabled = "disabled"
    }
  
    // реализация кнопки
    toggleButton(isActive) {
      if (isActive) {
        this._button.classList.remove(this._config.inactiveButtonClass)
        this._button.disabled = false
      } else {
        this.disabledButton()
      }
    }
  
    // списки событий
    _setEventListers = () => {
      Array.from(this._inputList).forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          const isFormValid = this._element.checkValidity()
          this._checkInput(inputElement), this.toggleButton(isFormValid)
        });
      });
  
      this._element.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
    };
  
    // включить валидацию
    enableValidation() {
      this._setEventListers();
    }
  }
  
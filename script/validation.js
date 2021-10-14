// показать ошибку
const showError = (errorElement, inputElement, config) => {
    errorElement.textContent = inputElement.validationMessage,
    inputElement.classList.add(config.inputErrorClass)
}

// спрятать ошибку
const hideError = (errorElement, inputElement, config) => {
    errorElement.textContent = '',
    inputElement.classList.remove(config.inputErrorClass)
}

// проверка инпутов на валидность
const checkInput = (formElement, inputElement, config) => {
    const isInputNotValidity = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
if (isInputNotValidity) {
    showError(errorElement, inputElement, config)
 }
 else {
    hideError(errorElement, inputElement, config)
}
}

// реализация кнопки 
const toggleButton = (button, isActive, config) => {
if (isActive) {
    button.classList.remove(config.inactiveButtonClass),
    button.disabled = false
}
else{
    button.classList.add(config.inactiveButtonClass),
    button.disabled = 'disabled'
}
}

// списки событий
const setEventListers = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    
    Array.from(inputList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();
            checkInput(formElement, inputElement, config),
            toggleButton(submitButton, isFormValid, config)
        })
   })
   
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log('Отправить');
    })

}
// включить валидацию
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    console.log(forms)
    Array.from(forms).forEach(formElement => {
        setEventListers(formElement, config) 
   })
}

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'error'
}

enableValidation(config);




























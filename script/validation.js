// показать ошибку
const showError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage,
    inputElement.classList.add('form__input_invalid')
}

// спрятать ошибку
const hideError = (errorElement, inputElement) => {
    errorElement.textContent = '',
    inputElement.classList.remove('form__input_invalid')
}

// проверка инпутов на валидность
const checkInput = (formElement, inputElement) => {
    const isInputNotValidity = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
if (isInputNotValidity) {
    showError(errorElement, inputElement)
 }
 else {
    hideError(errorElement, inputElement)
}
}

// реализация кнопки 
const toggleButton = (button, isActive) => {
if (isActive) {
    button.classList.remove('form__button_invalid'),
    button.disabled = 'false'
}
else{
    button.classList.add('form__button_invalid'),
    button.disabled = 'disabled'
}
}

// списки событий
const setEventListers = (formElement) => {
    const inputList = formElement.querySelectorAll('.form__input');
    const submitButton = formElement.querySelector('.form__button');
    
    Array.from(inputList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();
            checkInput(formElement, inputElement),
            toggleButton(submitButton, isFormValid)
        })
   })
   
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log('Отправить');
    })

}
// включить валидацию
const enableValidation = ( ) => {
    const forms = document.querySelectorAll('.form');
    console.log(forms)
    Array.from(forms).forEach(formElement => {
        setEventListers(formElement) 
   })
}

enableValidation();




























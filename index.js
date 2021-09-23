const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit');
const closePopupButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_text_title');
let jobInput = document.querySelector('.form__input_text_subtitle');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function openPopup () {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}


function setPopupInputValue () {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function setNodeTextValue () {
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    setNodeTextValue ();
    closePopup();
}

openPopupButton.addEventListener('click', function() {
    setPopupInputValue ();
    openPopup ();
});
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
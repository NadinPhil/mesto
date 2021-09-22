const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit');
const closePopupButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input-title');
let jobInput = document.querySelector('.form__input-subtitle');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function openPopup () {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', closePopup);

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
    popup.classList.remove('popup_opened');
}
openPopupButton.addEventListener('click', function() {
    setPopupInputValue ();
    openPopup ();
});
formElement.addEventListener('submit', formSubmitHandler); 
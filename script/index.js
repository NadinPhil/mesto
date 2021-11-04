import Card from "./Card.js";
import {FormValidator, config}  from "./FormValidator.js";

const elementsGrid = document.querySelector('.elements-grid');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const closePopupImageButton = popupImage.querySelector('.popup__button');
const openPopupEditButton = document.querySelector('.profile__edit');
const openPopupAddButton = document.querySelector('.profile__add');
const closePopupEditButton = popupEdit.querySelector('.popup__button');
const closePopupAddButton = popupAdd.querySelector('.popup__button');
const formElementEdit = document.querySelector('.form_type_edit');
const formElementAdd = document.querySelector('.form_type_add');
const nameInput = document.querySelector('.form__input_text_title');
const jobInput = document.querySelector('.form__input_text_subtitle');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const inputPictureName = document.querySelector('.form__input_text_name');  
const inputPictureLink = document.querySelector('.form__input_text_link');
const popupImageLink = popupImage.querySelector('.popup__link');
const popupImageName = popupImage.querySelector('.popup__name');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const validateAddForm = new FormValidator(config, '.form_type_add');
const validateEditForm = new FormValidator(config, '.form_type_edit');

validateAddForm.disabledButton();
validateAddForm.enableValidation();
validateEditForm.enableValidation();

function createCard(dataRender){
    return new Card(dataRender, '#elements-grid', handleCardFormSubmit, handlerImageClick).generateCard();
}
initialCards.forEach( (data) => {
    const newCard = createCard(data)
    elementsGrid.append(newCard);
});

function handlerImageClick(data){
    popupImageLink.src = data.link;
    popupImageName.textContent = data.name;
    openPopup(popupImage)
}


// карточка редактировать
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
}

function setPopupInputValue() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function setNodeTextValue() {
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    setNodeTextValue();
    closePopup(popupEdit);
}

openPopupEditButton.addEventListener('click', function() {
    setPopupInputValue();
    openPopup(popupEdit);
});

closePopupEditButton.addEventListener('click', () => closePopup(popupEdit));

formElementEdit.addEventListener('submit', handleProfileFormSubmit);


//открытие и закрытие карточки добавить
openPopupAddButton.addEventListener('click', () => {
    openPopup(popupAdd);
    validateAddForm.toggleButton(false);
}); 

closePopupAddButton.addEventListener('click', () => closePopup(popupAdd));


// добавить карточку через кнопку
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const item = {
        name: inputPictureName.value,
        link: inputPictureLink.value
    };
    elementsGrid.prepend(createCard(item));
    closePopup(popupAdd);
    inputPictureLink.value = '';
    inputPictureName.value = '';  
}


// закрытие попап через клавишу
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup); 
    }
  }


// закрытие попап через оверлей
 document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
});


 
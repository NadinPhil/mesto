import Card from "../components/Card.js";
import {FormValidator, config}  from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import '../pages/index.css';

const popupEdit = document.querySelector('.popup_type_edit');
const openPopupEditButton = document.querySelector('.profile__edit');
const openPopupAddButton = document.querySelector('.profile__add');
const formElementEdit = document.querySelector('.form_type_edit');
const nameInput = popupEdit.querySelector('.form__input_text_title');
const jobInput = popupEdit.querySelector('.form__input_text_subtitle');
const inputPictureName = document.querySelector('.form__input_text_name');  
const inputPictureLink = document.querySelector('.form__input_text_link');

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
const PopupEdit = new PopupWithForm('.popup_type_edit', handleCardFormSubmit);
const PopupAdd = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
const PopupImage = new PopupWithImage('.popup_type_image');
const PopupEditClose = new Popup('.popup_type_edit');

validateAddForm.disabledButton();
validateAddForm.enableValidation();
validateEditForm.enableValidation();

function createCard(data){
    return new Card({ data, handlerImageClick }, '#elements-grid').generateCard();
}

// добавление карточки 
function handleCardFormSubmit() {
    const item = {
        name: inputPictureName.value,
        link: inputPictureLink.value
    };
    cardList.addItem(createCard(item));
    PopupAdd.close();
    inputPictureLink.value = '';
    inputPictureName.value = '';  
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => { 
      const card = createCard(item);
      cardList.addItem(card);
    }
  },
  '.card-list');

cardList.renderItems(); 

function handlerImageClick(data){
    PopupImage.open(data)
}

PopupImage.setEventListeners(); 

// карточка редактирования профиля 
const userInfo = new UserInfo (
    {nameProfile: '.profile__title', 
    jobProfile: '.profile__subtitle'});

userInfo.setUserInfo({
    name: 'Жак-Ив Кусто',
    job: 'Исследователь океана',
});

userInfo.updateUserInfo();

formElementEdit.addEventListener('submit', evt => {
    evt.preventDefault();
    userInfo.setUserInfo({
        name: nameInput.value,
        job: jobInput.value,
    });
    userInfo.updateUserInfo();
    PopupEdit.close();
});

PopupEditClose.setEventListeners(); 

openPopupEditButton.addEventListener('click', () => {
    PopupEdit.open();
    const getUserInfo = userInfo.getUserInfo();
    nameInput.value = getUserInfo.name;
    jobInput.value = getUserInfo.job;
});

//открытие и закрытие карточки добавить
openPopupAddButton.addEventListener('click', () => {
    PopupAdd.open(); 
    validateAddForm.toggleButton(false);
}); 

PopupAdd.setEventListeners();   

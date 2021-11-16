import Card from "../components/Card.js";
import {FormValidator, config}  from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {initialCards} from "../components/array.js";
import './index.css';

const popupEditForm = document.querySelector('.popup_type_edit');
const openPopupEditButton = document.querySelector('.profile__edit');
const openPopupAddButton = document.querySelector('.profile__add');
const nameInput = popupEditForm.querySelector('.form__input_text_title');
const jobInput = popupEditForm.querySelector('.form__input_text_subtitle');
const inputPictureName = document.querySelector('.form__input_text_name');  
const inputPictureLink = document.querySelector('.form__input_text_link');
const validateAddForm = new FormValidator(config, '.form_type_add');
const validateEditForm = new FormValidator(config, '.form_type_edit');
const popupEdit = new PopupWithForm('.popup_type_edit', handlerformElementEdit);
const popupAdd = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
const popupImage = new PopupWithImage('.popup_type_image');

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
    popupAdd.close();
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
    popupImage.open(data)
}

popupImage.setEventListeners(); 

// карточка редактирования профиля 
const userInfo = new UserInfo (
    {nameProfile: '.profile__title', 
    jobProfile: '.profile__subtitle'});

userInfo.setUserInfo({
    name: 'Жак-Ив Кусто',
    job: 'Исследователь океана',
});

userInfo.updateUserInfo();

function handlerformElementEdit() {
    userInfo.setUserInfo({
        name: nameInput.value,
        job: jobInput.value,
    });
    userInfo.updateUserInfo();
    popupEdit.close();
};

popupEdit.setEventListeners(); 

openPopupEditButton.addEventListener('click', () => {
    popupEdit.open();
    const getUserInfo = userInfo.getUserInfo();
    nameInput.value = getUserInfo.name;
    jobInput.value = getUserInfo.job;
});

//открытие и закрытие карточки добавить
openPopupAddButton.addEventListener('click', () => {
    popupAdd.open(); 
    validateAddForm.toggleButton(false);
}); 

popupAdd.setEventListeners();   

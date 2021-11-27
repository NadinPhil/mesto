import Card from "../components/Card.js";
import {FormValidator, config}  from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import {initialCards} from "../components/array.js";
import Api from "../components/Api.js";
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
const popupSubmit = new PopupWithSubmit('.popup_type_delete');

validateAddForm.disabledButton();
validateAddForm.enableValidation();
validateEditForm.enableValidation();


function createCard(data){
    return new Card({ data:
                    {...data, currentUserId: userId}, 
                    handlerImageClick, 
                    handlerCardDelete, 
                    handlerLikeClick,
                     }, 
                    '#elements-grid')
                    .generateCard();
                    
}
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '31260589-e34c-433a-a114-9db11ff4554e',
        "content-type": "aplication/json"
      }
});

let userId = null;

Promise.all([api.getAllCards(),api.getUserInfo()])
    .then(([dataCards, dataUser]) => {
        userId = dataUser._id;
        userInfo.setUserInfo(dataUser);
        cardList.renderItems(dataCards); 
    });

    const cardList = new Section({
        renderer: (item) => { 
          const card = createCard(item);
          cardList.addItem(card);
        }
      },
      '.card-list');


// добавление карточки 
function handleCardFormSubmit() {
    const item = {
        name: inputPictureName.value,
        link: inputPictureLink.value
    }
    api.addCard(item)
    .then(data => cardList.addItem(createCard(data)))
    .catch((err) => console.log(`Ошибка: ${err}`))   
    popupAdd.close()
}


function handlerImageClick(data){
    popupImage.open(data)
}
popupImage.setEventListeners(); 


//удаление карточки
function handlerCardDelete(card) {
    popupSubmit.setActionSubmit( () => {
        popupSubmit.setEventListeners()
        api.removeCard(card)
        .then(cardId => card.delete(cardId))
    });
}
;

// карточка редактирования профиля 
const userInfo = new UserInfo (
    {nameProfile: '.profile__title', 
    jobProfile: '.profile__subtitle'});

//userInfo.setUserInfo();
//userInfo.updateUserInfo();

function handlerformElementEdit(data) {
    api.editUserInfo(data)
    .then(res => userInfo.setUserInfo(res))
    //userInfo.setUserInfo({
    //    name: nameInput.value,
    //    about: jobInput.value,
    //})
    //userInfo.updateUserInfo();
    popupEdit.close();
};

popupEdit.setEventListeners(); 

openPopupEditButton.addEventListener('click', () => {
    popupEdit.open();
    const getUserInfo = userInfo.getUserInfo();
    nameInput.value = getUserInfo.name;
    jobInput.value = getUserInfo.about;
});

//открытие и закрытие карточки добавить
openPopupAddButton.addEventListener('click', () => {
    popupAdd.open(); 
    validateAddForm.toggleButton(false);
}); 

popupAdd.setEventListeners();   
 
//лайки карточек
function handlerLikeClick(card){
    if (card.isLiked()) {
        api.removeCardLike(card.id)
        .then(dataCard => card.setArrayLikes(dataCard.likes))
    }
    else { 
        api.setCardLike(card.id)
        .then(dataCard => card.setArrayLikes(dataCard.likes))
    }
    
}


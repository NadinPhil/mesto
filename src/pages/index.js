import Card from "../components/Card.js";
import {FormValidator, config}  from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
import './index.css';

const popupEditForm = document.querySelector('.popup_type_edit');
const openPopupEditButton = document.querySelector('.profile__edit');
const openPopupAvatarButton = document.querySelector('.profile__edit-container');
const openPopupAddButton = document.querySelector('.profile__add');
const nameInput = popupEditForm.querySelector('.form__input_text_title');
const jobInput = popupEditForm.querySelector('.form__input_text_subtitle');
const validateAddForm = new FormValidator(config, '.form_type_add');
const validateEditForm = new FormValidator(config, '.form_type_edit');
const validateAvatarForm = new FormValidator(config, '.form_type_avatar');
const popupEdit = new PopupWithForm('.popup_type_edit', handlerformElementEdit);
const popupAdd = new PopupWithForm('.popup_type_add', handleCardFormSubmit);
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitAvatar);
const popupImage = new PopupWithImage('.popup_type_image');
const popupSubmit = new PopupWithSubmit('.popup_type_delete');
const userInfo = new UserInfo (
    {nameProfile: '.profile__title', 
    jobProfile: '.profile__subtitle',
    avatarPtofile: '.profile__avatar',
    currentUserId: userId,
    });


validateAddForm.disabledButton();
validateAddForm.enableValidation();
validateEditForm.enableValidation();
validateAvatarForm.disabledButton();
validateAvatarForm.enableValidation();



function createCard(data){
    return new Card({ data:
                    {...data, currentUserId: userId}, 
                    handlerImageClick, 
                    handlerCardDelete, 
                    handlerLikeClick,
                     }, 
                    '#elements-grid')
                    .generateCard()                 
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '31260589-e34c-433a-a114-9db11ff4554e',
        "content-type": "application/json"
      }
});

let userId = null;

Promise.all([api.getAllCards(),api.getUserInfo()])
    .then(([dataCards, dataUser]) => {
        userId = dataUser._id;
        userInfo.setUserInfo(dataUser);
        userInfo.updateUserInfo();
        console.log(dataUser);
        userInfo.editUserAvatar(dataUser.avatar);
        cardList.renderItems(dataCards); 
    })
    .catch((err) => console.log(`Ошибка: ${err}`))

    const cardList = new Section({
        renderer: (item) => { 
          const card = createCard(item);
          cardList.addItem(card);
        }
      },
      '.card-list');

// добавление карточки 
function handleCardFormSubmit(item) {
    popupAdd.setLoadSubmitAdd(true)
    api.addCard(item)
    .then(data => {
        cardList.addItem(createCard(data))
        popupAdd.close()
        })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => popupAdd.setLoadSubmitAdd(false));   
}

// открытие попапа карточки
function handlerImageClick(data){
    popupImage.open(data)
}
popupImage.setEventListeners(); 


//удаление карточки
function handlerCardDelete(card) {
    popupSubmit.setActionSubmit(() => {
        api.removeCard(card.id)
        .then((res) => {
        console.log(res)
        card.delete()
        popupSubmit.close()
    })
        .catch((err) => console.log(`Ошибка: ${err}`))   
    });
    popupSubmit.open();
};

popupSubmit.setEventListeners();

//изменение аватара
function handleFormSubmitAvatar(data) {
    //debugger
        popupAvatar.setLoadSubmit(true);
        api.editUserAvatar(data)
        .then((res) => {
            console.log(res)
            userInfo.editUserAvatar(data.avatar)
            popupAvatar.close()
        })
        .catch((err) => console.log(`Ошибка: ${err}`)) 
        .finally(() => popupAvatar.setLoadSubmit(false)); 
    };

openPopupAvatarButton.addEventListener('click', () => {
    popupAvatar.open();
    validateAvatarForm.toggleButton(false);
});

popupAvatar.setEventListeners();  

// карточка редактирования профиля 
function handlerformElementEdit(data) {
    popupEdit.setLoadSubmit(true);
    api.editUserInfo(data)
    .then( (dataUser) => {
        userInfo.setUserInfo(dataUser),
        userInfo.updateUserInfo(),
        popupEdit.close()
    })
    .catch(err => {
        console.log(err)
      }) 
    .finally(() => popupEdit.setLoadSubmit(false));
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
        .catch((err) => console.log(`Ошибка: ${err}`)) 
    }
    else { 
        api.setCardLike(card.id)
        .then(dataCard => card.setArrayLikes(dataCard.likes))
        .catch((err) => console.log(`Ошибка: ${err}`)) 
    }  
}
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const openPopupImageButton = document.querySelector('.popup__link');
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
const elementsGrid = document.querySelector('.elements-grid');




// карточка редактировать
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

// массив
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

// добавить лайк
function handleActiveToggle(evt){
    evt.currentTarget.classList.toggle('elements-grid__like_active');
}
// удалить карточку
function handleDeleteCard (evt){
    const  elementsGridDelete = evt.target.closest('.elements-grid__item');
    elementsGridDelete.remove();
}

// добавить карточку с помощью темплейт
function createCard(item){
        const elementsGridTemplate = document.querySelector('#elements-grid').content;
        // клонируем содержимое тега template
        const elementsGridItem = elementsGridTemplate.querySelector('.elements-grid__item').cloneNode(true);
        // наполняем содержимым
        const buttonDeleteElement = elementsGridItem.querySelector('.elements-grid__delete');
        const linkElement = elementsGridItem.querySelector('.elements-grid__image');
        const nameElement = elementsGridItem.querySelector('.elements-grid__title');
        const buttonLikeElement = elementsGridItem.querySelector('.elements-grid__like');
        
        linkElement.src = item.link;
        linkElement.alt = item.name;
        nameElement.textContent = item.name;
        
        linkElement.addEventListener('click', () => handlerOpenImage(item));
        buttonDeleteElement.addEventListener('click', handleDeleteCard);
        buttonLikeElement.addEventListener('click', handleActiveToggle);
     
        return elementsGridItem
};
// перебрать массив  
initialCards.forEach(function(data){
    const arrCard = createCard(data);
    elementsGrid.append(arrCard);
});

//открытие и закрытие карточки добавить

openPopupAddButton.addEventListener('click', () => {
    openPopup(popupAdd)
    const button = popupAdd.querySelector('.form__button')
    toggleButton(button, false, config)
}); 

closePopupAddButton.addEventListener('click', () => closePopup(popupAdd));

// добавить карточку через кнопку
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const item = {
        name: document.querySelector('.form__input_text_name').value,
        link: document.querySelector('.form__input_text_link').value
    }
    elementsGrid.prepend(createCard(item));
    closePopup(popupAdd);
}
formElementAdd.addEventListener('submit', handleCardFormSubmit);

// открыть имейдж
function handlerOpenImage(item) {
    const linkPopup = popupImage.querySelector('.popup__link');
    const namePopup = popupImage.querySelector('.popup__name');
    linkPopup.src = item.link;
    linkPopup.alt = item.name;
    namePopup.textContent = item.name;
    openPopupImageButton.addEventListener('click', openPopup(popupImage));
    };

    closePopupImageButton.addEventListener('click', () => closePopup(popupImage));
    
// закрытие попап через клавишу

  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
});

// закрытие попап через оверлей

document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
});
 
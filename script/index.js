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

function formSubmitHandler(evt) {
    evt.preventDefault();
    setNodeTextValue();
    closePopup(popupEdit);
}

openPopupEditButton.addEventListener('click', function() {
    setPopupInputValue();
    openPopup(popupEdit);
});

closePopupEditButton.addEventListener('click', () => closePopup(popupEdit));

formElementEdit.addEventListener('submit', formSubmitHandler);

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

// добавить карточку с помощью темплейт
const elementsGrid = document.querySelector('.elements-grid');
// добавить лайк
function handlerActiveToggle(evt){
    evt.currentTarget.classList.toggle('elements-grid__like_active');
}
// удалить карточку
function handlerDeleteCard (evt){
    const  elementsGridDelete = evt.target.closest('.elements-grid__item');
    elementsGridDelete.remove();
}

function createCards(item){
        const elementsGridTemplate = document.querySelector('#elements-grid').content;
        // клонируем содержимое тега template
        const elementsGridItem = elementsGridTemplate.querySelector('.elements-grid__item').cloneNode(true);
        // наполняем содержимым
        const buttonDeleteElement = elementsGridItem.querySelector('.elements-grid__delete');
        const linkElement = elementsGridItem.querySelector('.elements-grid__image');
        const linkNameElement = elementsGridItem.querySelector('.elements-grid__image');
        const nameElement = elementsGridItem.querySelector('.elements-grid__title');
        const buttonLikeElement = elementsGridItem.querySelector('.elements-grid__like');
        
        linkElement.src = item.link;
        linkNameElement.alt = item.link;
        nameElement.textContent = item.name;
        
        linkElement.addEventListener('click', () => handlerOpenImage(item));
        buttonDeleteElement.addEventListener('click', handlerDeleteCard);
        buttonLikeElement.addEventListener('click', handlerActiveToggle);
     
        return elementsGridItem
};
// перебрать массив  
initialCards.forEach(function(data){
    const arrCard = createCards(data)
    elementsGrid.append(arrCard);
});

//открытие и закрытие карточки добавить

openPopupAddButton.addEventListener('click', () => openPopup(popupAdd));

closePopupAddButton.addEventListener('click', () => closePopup(popupAdd));

// добавить карточку через кнопку
function formSubmitSaveHandler(evt) {
    evt.preventDefault();
    const item = {
        name: document.querySelector('.form__input_text_name').value,
        link: document.querySelector('.form__input_text_link').value
    }
    elementsGrid.prepend(createCards(item));
    //evt.currentTarget.reset();
    closePopup(popupAdd);
}
formElementAdd.addEventListener('submit', formSubmitSaveHandler);

// открыть имейдж
function handlerOpenImage(item) {
    const linkPopup = popupImage.querySelector('.popup__link');
    const linkNamePopup = popupImage.querySelector('.popup__link');
    const namePopup = popupImage.querySelector('.popup__name');
    linkPopup.src = item.link;
    linkNamePopup.alt = item.link;
    namePopup.textContent = item.name;
    openPopupImageButton.addEventListener('click', openPopup(popupImage));
    };

    closePopupImageButton.addEventListener('click', () => closePopup(popupImage));
    
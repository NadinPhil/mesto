export default class Card {
    constructor(data, templateSelector, handleCardFormSubmit, handlerImageClick) {
        this._handlerImageClick = handlerImageClick;
        this._handleCardFormSubmit = handleCardFormSubmit;
        this._templateSelector = templateSelector;
        this._data = data;
        this._element = null; 
    }
    
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
          const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.elements-grid__item')
          .cloneNode(true);
          
        // вернём DOM-элемент карточки
          return cardElement;
      } 
      
      generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._popupImage = document.querySelector('.popup_type_image');
        this._popupAdd = document.querySelector('.popup_type_add');
        this._buttonDeleteElement = this._element.querySelector('.elements-grid__delete');
        this._linkElement = this._element.querySelector('.elements-grid__image');
        this._nameElement = this._element.querySelector('.elements-grid__title');
        this._buttonLikeElement = this._element.querySelector('.elements-grid__like');
    
        // Добавим данные
        this._linkElement.src = this._data.link;
        this._linkElement.alt = this._data.name;
        this._nameElement.textContent = this._data.name;

        this._setEventListener();
      
        // Вернём элемент наружу
        return this._element;
      } 

      //Метод кнопки лайк
      _like() {
        this._buttonLikeElement.classList.toggle('elements-grid__like_active');
      }
      
      //Метод удаления карточки
      _delete() {
        this._element.remove();
    }
      
      //Метод закрытия изображения (кнопка крестик)
      _closeImage() {
      this._popupImage.classList.remove('popup_opened');
      }

      
      //Назначаем слушатель
      _setEventListener() {
        this._buttonLikeElement.addEventListener('click', () => {
            this._like();
        });
        this._buttonDeleteElement.addEventListener('click', () => {
            this._delete();
        });
        this._linkElement.addEventListener('click', () => {
            this._handlerImageClick({
                name: this._data.name, 
                link: this._data.link});
        });
        this._popupImage.querySelector('.popup__button').addEventListener('click', () => {
            this._closeImage();
        });
        this._popupAdd.querySelector('.form_type_add').addEventListener('submit', this._handleCardFormSubmit);
      }
        
}
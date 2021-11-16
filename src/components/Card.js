export default class Card {
    constructor({ data, handlerImageClick }, templateSelector){
        this._handlerImageClick = handlerImageClick;
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
        this._element = null;
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
      
      }
        
}
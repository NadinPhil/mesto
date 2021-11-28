export default class Card {
    constructor({ data, handlerImageClick, handlerCardDelete, handlerLikeClick }, templateSelector){
        this._handlerImageClick = handlerImageClick;
        this._templateSelector = templateSelector;
        this._data = data;  //данные карточки
        console.log(data);

        this._likes = data.likes; //массив лайков
        this._element = null;
        this.id = data._id; //айди карточки
        this._currentUserId = data.currentUserId; //айди текущего пользователя
        this._itemOwnerId = data.owner._id; //айди пользователя-создателя
        this._handlerCardDelete = handlerCardDelete;
        this._handlerLikeClick = handlerLikeClick;
        
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
        this._buttonLikeNumber = this._element.querySelector('.elements-grid__like-number');
    
        // Добавим данные
        this._linkElement.src = this._data.link;
        this._linkElement.alt = this._data.name;
        this._nameElement.textContent = this._data.name;

        this._setEventListener();
        this._renewLikes();
        this._buttonLikeNumber.textContent = this._likes.length;
        this._getView();
        console.log(this._buttonDeleteElement);
        // Вернём элемент наружу
        return this._element;
      } 

      //Метод кнопки лайк
      //_like() {
      //  this._buttonLikeElement.classList.toggle('elements-grid__like_active');
      //}
      
      //Метод удаления карточки
      delete() {
        this._element.remove();
        this._element = null;
    }
      
      //Назначаем слушатель
      _setEventListener(){
        this._buttonLikeElement.addEventListener('click', () => {
            //this._like();
            this._handlerLikeClick(this);
        });
        this._buttonDeleteElement.addEventListener('click', () => {
          console.log(123)
            this._handlerCardDelete(this);
            

        });
        this._linkElement.addEventListener('click', () => {
            this._handlerImageClick({
                name: this._data.name, 
                link: this._data.link});
        });
      }

      //проверка лайков
      isLiked(){
        return this._likes.some(user => user._id === this._currentUserId)
      }
      
      //добавление в массив
      setArrayLikes(dataLikes){
        this._likes = dataLikes;
        this._renewLikes();
        //console.log(this);
        //console.log(dataLikes);
      }

      //обновление лайков
      _renewLikes(){
        if (!this.isLiked()){
          this._buttonLikeElement.classList.remove('elements-grid__like_active') 
        }
        else{
        this._buttonLikeElement.classList.add('elements-grid__like_active')
        }
        return this._buttonLikeNumber.textContent = this._likes.length;
      }
      _getView() {
        if( this._currentUserId === this._itemOwnerId){
         this._buttonDeleteElement.classList.add('elements-grid__delete_active');
       }
      }
}
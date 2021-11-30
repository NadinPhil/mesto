import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popup, handlerSubmitForm){
        super(popup);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._popup.querySelector('.form');
        this._inputForm = this._popup.querySelectorAll('.form__input');
        this._buttonSubmit = this._popup.querySelector('.form__button');
    }
    //собираем данные всех полей формы
    _getInputValues() {
        this._formValues = {};
        this._inputForm.forEach((element) => {
            this._formValues[element.name] = element.value;
        
        });
        return this._formValues;
    }
    //добавляем обработчик клика и самбита
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handlerSubmitForm(this._getInputValues());
        });
    }
    //метод закрытия и очистки формы
    close() {
        super.close();
        this._form.reset();
    }

    setLoadSubmit(isLoading, buttonText){
        if (isLoading === true) {
            this._buttonSubmit.textContent = 'Сохранение...'
        }
        else this._buttonSubmit.textContent = buttonText
    }

}
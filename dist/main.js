(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(){function t(e,n,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._handlerImageClick=i,this._handleCardFormSubmit=o,this._templateSelector=n,this._data=e,this._element=null}var n,o;return n=t,(o=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements-grid__item").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._popupImage=document.querySelector(".popup_type_image"),this._popupAdd=document.querySelector(".popup_type_add"),this._buttonDeleteElement=this._element.querySelector(".elements-grid__delete"),this._linkElement=this._element.querySelector(".elements-grid__image"),this._nameElement=this._element.querySelector(".elements-grid__title"),this._buttonLikeElement=this._element.querySelector(".elements-grid__like"),this._linkElement.src=this._data.link,this._linkElement.alt=this._data.name,this._nameElement.textContent=this._data.name,this._setEventListener(),this._element}},{key:"_like",value:function(){this._buttonLikeElement.classList.toggle("elements-grid__like_active")}},{key:"_delete",value:function(){this._element.remove()}},{key:"_closeImage",value:function(){this._popupImage.classList.remove("popup_opened")}},{key:"_setEventListener",value:function(){var e=this;this._buttonLikeElement.addEventListener("click",(function(){e._like()})),this._buttonDeleteElement.addEventListener("click",(function(){e._delete()})),this._linkElement.addEventListener("click",(function(){e._handlerImageClick({name:e._data.name,link:e._data.link})})),this._popupImage.querySelector(".popup__button").addEventListener("click",(function(){e._closeImage()})),this._popupAdd.querySelector(".form_type_add").addEventListener("submit",this._handleCardFormSubmit)}}])&&e(n.prototype,o),t}();function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_invalid",inputErrorClass:"form__input_invalid",errorClass:"error"},i=function(){function e(t,n){var o,i,r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i=function(){var e=r._element.querySelectorAll(r._config.inputSelector);r._element.querySelector(r._config.submitButtonSelector),Array.from(e).forEach((function(e){e.addEventListener("input",(function(){var t=r._element.checkValidity();r._checkInput(e),r.toggleButton(t)}))})),r._element.addEventListener("submit",(function(e){e.preventDefault()}))},(o="_setEventListers")in this?Object.defineProperty(this,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[o]=i,this._config=t,this._element=document.querySelector(n),this._button=this._element.querySelector(this._config.submitButtonSelector)}var t,o;return t=e,(o=[{key:"_showError",value:function(e,t){e.textContent=t.validationMessage,t.classList.add(this._config.inputErrorClass)}},{key:"_hideError",value:function(e,t){e.textContent="",t.classList.remove(this._config.inputErrorClass)}},{key:"_checkInput",value:function(e){var t=!e.validity.valid,n=this._element.querySelector("#".concat(e.id,"-error"));t?this._showError(n,e):this._hideError(n,e)}},{key:"disabledButton",value:function(){this._button.classList.add(this._config.inactiveButtonClass),this._button.disabled="disabled"}},{key:"toggleButton",value:function(e){e?(this._button.classList.remove(this._config.inactiveButtonClass),this._button.disabled=!1):(this._button.classList.add(this._config.inactiveButtonClass),this._button.disabled="disabled")}},{key:"enableValidation",value:function(){var e=this,t=document.querySelectorAll(this._config.formSelector);Array.from(t).forEach((function(t){e._setEventListers(t)})),this._setEventListers()}}])&&n(t.prototype,o),e}(),r=document.querySelector(".elements-grid"),l=document.querySelector(".popup_type_edit"),u=document.querySelector(".popup_type_add"),a=document.querySelector(".popup_type_image"),s=(a.querySelector(".popup__button"),document.querySelector(".profile__edit")),c=document.querySelector(".profile__add"),d=l.querySelector(".popup__button"),_=u.querySelector(".popup__button"),p=document.querySelector(".form_type_edit"),m=(document.querySelector(".form_type_add"),document.querySelector(".form__input_text_title")),f=document.querySelector(".form__input_text_subtitle"),h=document.querySelector(".profile__title"),v=document.querySelector(".profile__subtitle"),y=document.querySelector(".form__input_text_name"),k=document.querySelector(".form__input_text_link"),g=a.querySelector(".popup__link"),b=a.querySelector(".popup__name"),S=new i(o,".form_type_add"),E=new i(o,".form_type_edit");function q(e){return new t(e,"#elements-grid",w,L).generateCard()}function L(e){g.src=e.link,b.textContent=e.name,C(a)}function C(e){e.classList.add("popup_opened"),document.addEventListener("keydown",B)}function x(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",B)}function w(e){e.preventDefault();var t={name:y.value,link:k.value};r.prepend(q(t)),x(u),k.value="",y.value=""}function B(e){"Escape"===e.key&&x(document.querySelector(".popup_opened"))}S.disabledButton(),S.enableValidation(),E.enableValidation(),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=q(e);r.append(t)})),s.addEventListener("click",(function(){m.value=h.textContent,f.value=v.textContent,C(l)})),d.addEventListener("click",(function(){return x(l)})),p.addEventListener("submit",(function(e){e.preventDefault(),h.textContent=m.value,v.textContent=f.value,x(l)})),c.addEventListener("click",(function(){C(u),S.toggleButton(!1)})),_.addEventListener("click",(function(){return x(u)})),document.addEventListener("click",(function(e){e.target.classList.contains("popup")&&x(e.target)})),console.log("Hello, World!");var j=[2,3,5].map((function(e){return 2*e}));console.log(j)})();
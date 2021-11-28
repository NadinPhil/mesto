export default class Api {
constructor({url, headers}){
    this._url = url;
    this._headers = headers;
}

//получение списка карточек в виде массива
getAllCards(){
return fetch ( `${this._url}/cards`, {
    method: "GET",
    headers:  this._headers,
})
.then (res => {
    if (res.ok) {
        return res.json();
    }
  return Promise.reject('Сервер не доступен')
  }) 
 
}

//получение данных пользователя
getUserInfo(){
    return fetch ( `${this._url}/users/me`, {
        method: "GET",
        headers:  this._headers,
    })
    .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Сервер не доступен')
      }) 
     
    }

//лайк карточки
setCardLike(cardId){
    return fetch ( `${this._url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers:  this._headers,
    })
    .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Сервер не доступен')
      }) 
     
    }

//удаление лайка карточки 
removeCardLike(cardId){
    return fetch ( `${this._url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers:  this._headers,
    })
    .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Сервер не доступен')
      }) 
     
    }
    
//добавление карточки
addCard(data){
    return fetch( `${this._url}/cards`, {
        method: "POST",
        headers:  this._headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link
        }),
    })
    .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Произошла ошибка при создании карточки')
      }) 
     
    }

//редактирования профиля
editUserInfo(data){
    console.log(data)
    fetch( `${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
            headers:  this._headers,
        },
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
      })
      .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Произошла ошибка при редактировании профиля')
      }) 
     
    }

//удаление карточки 
removeCard(cardId){
    return fetch ( `${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers:  this._headers,
    })
    .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Сервер не доступен')
      }) 
     
    }

//изменение аватара 
editUserAvatar(userAvatar){
    fetch( `${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            headers:  this._headers,
        },
        body: JSON.stringify({
            avatar: userAvatar.avatar
        })
      })
      .then (res => {
        if (res.ok) {
            return res.json();
        }
      return Promise.reject('Произошла ошибка при редактировании профиля')
      }) 
    }

}
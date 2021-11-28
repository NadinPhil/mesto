export default class UserInfoAvatar{
    constructor(avatarPtofile){
        this._userInfoAvatar = document.querySelector(avatarPtofile);
    }
    editUserAvatar(avatar) {
        if (avatar){
            this._userInfoAvatar.src = avatar;
        }
       else {
        console.log('Ошибка!')
    }
    }
  
}
   
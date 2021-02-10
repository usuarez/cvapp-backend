const Avatar = (userName, options) => {
    const initial = userName.split('')[0].toUpperCase()
    const {width, bg, textColor} = options
    return `
    <div class="initialAvatar"><p class="avatarText">${initial}</p></div>
    <style>
    .initialAvatar {
        margin: 0 auto;
        width: ${(!!width)? width : 156}px;
        height: ${(!!width)? width : 156}px;
        background-color: ${(!!bg) ? bg : '#fff'};
    }
    .avatarText {
        text-align: center;
        color: ${(textColor)?textColor : '#000'};
        margin:0px; 
        padding:0px;
        line-height: ${width}px;
        font-size: ${(!!width)? width*0.616 : 92}px;
      }
    </style>
    `
}
module.exports = Avatar
export const nickname = /^$|^[0-9a-zA-Z!@#$%^&()+-=_№;:?~<>{}[\]/|\\`.""]+$/;
export const website =
  /^$|^(((https|http):\/\/)?(www.)?([0-9a-zA-Z-=_&%?.\\/]{3,1024})(\s)*$)|([0-9a-zA-Z-=_&%?.\\/]{3,1024})(\s)*$/;
export const twitter = /^$|^((https):\/\/)?(www.)?(twitter.com\/|@)?([0-9a-zA-Z_]{4,1024})(\s)*$/;
export const instagram = /^$|^((https:\/\/)?(www.)?(instagram.com\/|@)?([0-9a-zA-Z_./]{4,1024}))(\s)*$/;
export const facebook = /^$|^((https:\/\/)?(www.)?(facebook.com\/|@)?([0-9a-zA-Z_\\/.]{4,1024}))(\s)*$/;
export const aboutMe = /^$|^[0-9a-zA-Z_.\-=;,+\\/()\\[\]:%#@!$'^№&"(){}|?*`~<>\s]+$/;
export const message = /^$|^[0-9a-zA-Z_.\-=;,+\\/()\\[\]:%#@!$'&"|?*`~<>\s]+$/;
export const email = /^$|^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

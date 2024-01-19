

export function getCookie(name) {
    let cookie = "";
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr === document.cookie.match(reg)) {
        cookie = arr[2];
    }
    return cookie;
}

export function setCookie(name, value, expiredays) {
    let exp = new Date();
    exp.setDate(exp.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exp.toUTCString());
}

export function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var val = getCookie(name);
    if (val != null)
        document.cookie = name + "=" + val + ";expires=" + exp.toUTCString();
}
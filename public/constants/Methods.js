export const disableF12 = () => {
    document.onkeydown = function (e) {
        if (e.keyCode === 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
            return false;
        }
    }
}

export const text_truncate = function (str, length, ending) {
    if (length == null) {
        length = str?.length;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str?.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};
export var MAIN = '#00ADB5'
export var SECONDARY = '#2D2D2D'
export var LIGHTSECONDARY = '#343A40'
export var DARKSECONDARY = '#222'

export const changeMainColor = (newColor) => {
    MAIN = newColor
    document.documentElement.style.setProperty('--main-color', newColor);
}

export const changeSecondaryColor = (newColor) => {
    SECONDARY = newColor
    document.documentElement.style.setProperty('--secondary-color', newColor);
}

export const changeLightSecondaryColor = (newColor) => {
    LIGHTSECONDARY = newColor
    document.documentElement.style.setProperty('--light-secondary-color', newColor);
}

export const changeDarkSecondaryColor = (newColor) => {
    DARKSECONDARY = newColor
}
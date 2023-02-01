const text = "Проєктування та монтаж."

const mainPageText = (text) => {
    if (window.matchMedia('(max-device-width: 460px)').matches) {
        document.querySelector(".main-block__text").innerText = text
    }
}

mainPageText(text);

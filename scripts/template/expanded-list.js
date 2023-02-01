import ALMAR from './ALMAR.json' assert {type: 'json'};
import ALM from './ALM.json' assert {type: 'json'};

const createSmallGenTemplate = (
    src,
    title,
    fuel,
    launchSystem,
    output,
    capacity,
    size,
    weight,
) => {
    return `
    <li class="products-list__item">
        <div class="products-list__item-top">
            <img src="${src}" alt="generator"
                class="products-list__image">
        </div>
        <div class="products-list__item_bottom">
            <p class="products-list__title">${title}</p>
            <p class="products-list__text">${fuel === 'diesel' ? "Дизельний" : "Бензиновий"} генератор турецького бренду Alimar з
            ${launchSystem === "auto" ? "стартерною" : "ручною"} системою запуску. Максимальна вихідна потужність: ${output}кВА. Ємність
            паливного бака: ${capacity}л. Розміри: ${size}. Вага: ${weight}кг.</p>
        </div>
    </li>
    `
};


const createBigGenTemplate = (
    src,
    title,
    fuel,
    launchSystem,
    output,
    capacity,
    size,
    weight,
) => {
    return `
    <li class="products-list__item">
        <div class="products-list__item-top">
            <img src="${src}" alt="generator"
                class="products-list__image">
        </div>
        <div class="products-list__item_bottom">
            <p class="products-list__title">${title}</p>
            <p class="products-list__text">${fuel === 'diesel' ? "Дизельний" : "Бензиновий"} генератор турецького бренду Alimar з
            ${launchSystem === "auto" ? "стартерною" : "ручною"} системою запуску. Максимальна вихідна потужність: ${output}кВА. Ємність
            паливного бака з кабіною: ${capacity.withCanopy}л і без кабіни: ${capacity.openSkid}л. Розміри з кабіною: ${size.withCanopy} і без: ${size.openSkid}. Вага з кабіною: ${weight.withCanopy}кг і без кабіни: ${weight.openSkid}кг.</p>
        </div>
    </li>
    `
};

const readyLittleTemplate = (arr) => arr.map((almr) => {
    return createSmallGenTemplate(
        almr.src,
        almr.title,
        almr.fuel,
        almr.launchSystem,
        almr.output,
        almr.capacity,
        almr.size,
        almr.weight
    );
})

const readyBigTemplate = (arr) => arr.map((almr) => {
    return createBigGenTemplate(
        almr.src,
        almr.title,
        almr.fuel,
        almr.launchSystem,
        almr.output,
        almr.capacity,
        almr.size,
        almr.weight
    );
})



const list = document.querySelector('.products-list__container');
const button = document.querySelector('.product-list__button')

list.innerHTML = readyLittleTemplate(ALM).join(" ");

button.addEventListener('click', (e) => {
    e.preventDefault;
    const newList = readyLittleTemplate(ALM).concat(readyBigTemplate(ALMAR));
    list.innerHTML = newList.join(" ");
    button.style.display = "none";
});
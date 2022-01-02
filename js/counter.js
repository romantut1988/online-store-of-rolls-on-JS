// Добовляем прослушку на всём окне
window.addEventListener('click', function (event) {

    // Объявляем переменную для счетчика
    let counter;

    // Проверяем клик строго по кнопкам Плюс или Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим обвертку счетчика
        const counterWrapper = event.target.closest('.counter-wrapper');
        // Находим див с числом счетчика
        counter = counterWrapper.querySelector('[data-counter]');
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой кнопкой Плюс
    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
    if (event.target.dataset.action === 'minus') {

        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');

        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        }
    }

});

window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')) {
        // Находим карточку с товаром, внутри которой был совершен клик
         const card = event.target.closest('.card');

         // Собираем данные с этого товара и записываем в единый объект productInfo
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__currency').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };
        console.log(productInfo);
    }

});

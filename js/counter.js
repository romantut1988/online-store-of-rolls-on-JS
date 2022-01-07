// Div внутри корзины, в которой мы добовляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

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

        // Проверка на товар который находится в корзине
        } else if(event.target.closest('.cart-wrapper') && parseInt(counter.innerText)) {
            event.target.closest('.cart-item').remove();
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

        // Проверять если есть уже такой товар в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            // Если товара нет в корзине то


        // Собранные данные подставим в шаблон для товаров в корзине
        const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
                                <div class="cart-item__top">
                                  <div class="cart-item__img">
                                    <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                                  </div>
                    
                                 <div class="cart-item__desc">
                                      <div class="cart-item__title">${productInfo.title}</div>
                                      <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
                                      
                                      <div class="cart-item__details">
                                      <div class="items items--small counter-wrapper">
                                      <div class="items__control" data-action="minus">-</div>
                                      <div class="items__current" data-counter="">${productInfo.counter}</div>
                                      <div class="items__control" data-action="plus">+</div>
                                 </div>
                                 
                                       <div class="price">
                                       <div class="price__currency">${productInfo.price}</div>
                                       </div>
                                 </div>
                                </div>
                               </div>
                              </div>`;

        // Отобразим товар в корзине
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }
        // Сбрасываем счётчик добавленного товара на '1'
        card.querySelector('[data-counter]').innerText = '1';
    }
});

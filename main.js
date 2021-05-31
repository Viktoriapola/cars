// Импорты классов
import Dropdown from "./classes/Dropdown.js";
import Card from "./classes/Card.js";
import Router from "./classes/Router.js";
import BigCard from "./classes/BigCard.js";
import Preloader from "./classes/Preloader.js";
import PopUp from "./classes/PopUp.js";
import Scroll from "./classes/Scroll.js";
import Burger from "./classes/Burger.js"

// импорты сервисов
import { getBrands } from "./services/brands.js";
import { getCar, getCars } from "./services/cars.js";
import { getModels } from "./services/models.js";

// Селекторы контейнеров
const cardsContainer = document.querySelector(".cards-container"); // контейнер для всех машинок
const filtersContainer = document.querySelector(".filters"); // контейнер для фильтров
const bigCardContainer = document.querySelector(".big-card-container"); // контейнер для страницы с машикой
const searchButton = document.querySelector(".component-search"); // кнопка применения фильтров
const routerContainer = document.getElementById("router"); // контейнер со страницами

//Скролл
const menu = document.querySelector('menu');
const fixed = menu.offsetTop;
const scroll = new Scroll(document, menu);

window.onscroll = function () {
  scroll.scrollFix(menu, fixed);
};

// Прелоадер
const preloader = new Preloader(document.querySelector(".router"), "loading");

// Фильтры
const brandDropdown = new Dropdown("Выберите марку", [], filtersContainer);
const modelDropdown = new Dropdown("Выберите модель", [], filtersContainer);

// Роутер
const router = new Router(routerContainer, (pageId, parameters) => {
  switch (pageId) {
    case "#car": {
      if (parameters && parameters.carId) {
        preloader.show();
        getCar(parameters.carId).then((car) => {
          BigCard.appendCard(bigCardContainer, car);
          preloader.hide();
        });
      } else {
        router.goHome();
      }
      break;
    }
    case "#home": {
      // Получаем авто и бренды
      preloader.show();

      Promise.all([
        getBrands(),
        getCars({
          brand: brandDropdown.selectedValue,
          model: modelDropdown.selectedValue,
        }),
      ]).then(([brands, cars]) => {
        brandDropdown.setItemsList(brands);
        brandDropdown.onSelectItem = (brand) => {
          modelDropdown.setItemsList([]);
          modelDropdown.clearSelectedValue();
          if (brand) {
            getModels(brand).then((models) => {
              modelDropdown.setItemsList(models);
            });
          }
        };
        preloader.hide();
        poupup.pushMessage("Машинки успешно получены");

        cardsContainer.innerHTML = "";
        Card.appendCards(cardsContainer, cars, (carId) => {
          router.goTo("#car", { carId });
        });
      });
    }
  }
});

// Поупап
const poupup = new PopUp(1000);

// Обработчик кнопки "Показать"
searchButton.onclick = () => {
  cardsContainer.innerHTML = "";
  preloader.show();
  getCars({
    brand: brandDropdown.selectedValue,
    model: modelDropdown.selectedValue,
  }).then((cars) => {
    preloader.hide();
    poupup.pushMessage("Машинки успешно получены");

    Card.appendCards(cardsContainer, cars, (carId) => {
      router.goTo("#car");
      preloader.show();
      getCar(carId).then((car) => {
        BigCard.appendCard(bigCardContainer, car);
        preloader.hide();
      });
    });
  });
};

// Бургер
const burgerOpen = document.querySelector('.fa-bars');
const burgerClose = document.querySelector('.fa-times');
const menuBurger = document.querySelector('.menu');
const burger = new Burger(burgerOpen, burgerClose, menuBurger);

// События 
document.addEventListener('menu-opened', (event) => {
  poupup.pushMessage(event.detail.message);
});
document.addEventListener('menu-closed', (event) => {
  poupup.pushMessage(event.detail.message);
});
































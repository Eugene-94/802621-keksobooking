'use strict';

var OBJECTS_QUANTITY = 8;
var Types = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Хижина'
};
var map = document.querySelector('.map');

/**
  *Возвращает целое случайное число в диапазоне [min max]
  @function
  @param {number} min - Нижний предел диапазона
  @param {number} max - Верхний предел диапазона
  @return {number} - Сгенерированное целое число
*/
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  *Собирает строку, содержащую адрес аватарки
  @function
  @param {number} ordinal - порядковый номер объекта в общем массиве генерируемых объектов
  @return {string} - собранная строка с адресом
*/
function getUrl(ordinal) {
  return 'img/avatars/user0' + ordinal + '.png';
}

/**
  *Выбирает случайный заголовок из исходного массива sourceArray
  @function
  @param {array} sourceArray - исходный массив, содержащий все возможные варианты заголовков
  @return {string} - случайно выбранный элемент массива
*/
function getTitle() {
  var titlesList = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  return titlesList[getRandom(0, titlesList.length - 1)];
}

/**
  *Задает случайным образом цену от 1000 до 1000000
  @function
  @return {number} - случайно сгенерированная цена
*/
function getPrice() {
  return getRandom(1000, 1000000);
}

/**
  *Выбирает случайный тип жилья из исходного объекта-перечисления
  @function
  @param {object} enumObject - объект перечисление, содержащий типы жилья
  @return {string} - случайно выбранный ключ объекта
*/
function getType(enumObject) {
  return Object.keys(enumObject)[getRandom(0, 3)].toLowerCase();
}

/**
  *Задает случайным образом количество комнат от 1 до 5
  @function
  @return {number} - случайно сгенерированное число комнат
*/
function getRooms() {
  return getRandom(1, 5);
}

/**
  *Задает случайным образом количество возможных гостей, которых можно разместить
  @function
  @return {number} - случайно сгенерированное число гостей
*/
function getGuestsAmount() {
  return getRandom(1, 10);
}

/**
  *Выбирает случайное время регистрации
  @function
  @param {array} sourceArray - исходный массив, содержащий все возможные варианты времени регистрации
  @return {string} - случайно выбранный элемент массива
*/
function getCheckin() {
  var checkinList = [
    '12:00',
    '13:00',
    '14:00'
  ];
  return checkinList[getRandom(0, checkinList.length - 1)];
}

/**
  *Выбирает случайное время выписки
  @function
  @param {array} sourceArray - исходный массив, содержащий все возможные варианты времени выписки
  @return {string} - случайно выбранный элемент массива
*/
function getCheckout() {
  var checkoutList = [
    '12:00',
    '13:00',
    '14:00'
  ];
  return checkoutList[getRandom(0, checkoutList.length - 1)];
}

/**
  *Выбирает случайные дополнительные опции
  @function
  @param {array} sourceArray - исходный массив, содержащий все возможные опции
  @return {array} featuresItems - массив, содеражщий случайное количество случайных опций
*/
function getFeatures() {
  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var featuresAmount = getRandom(1, featuresList.length);
  var featuresItems = [];
  do {
    featuresItems.push(featuresList[getRandom(0, featuresList.length - 1)]);
  } while (featuresItems.length < featuresAmount);

  return featuresItems;
}

/**
  *Перемешивает массив с фото в случайном порядке
  @function
  @param {array} sourceArray - исходный массив
  @return {array} sourceArray - перемешанный массив
*/
function shufflePhotos() {
  var j;
  var temp;
  var photosList = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  for (var i = photosList.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = photosList[j];
    photosList[j] = photosList[i];
    photosList[i] = temp;
  }

  return photosList;
}

/**
  *Задает случайным образом положение на карте по оси X
  @function
  @return {number} - координата X
*/
function getLocationX() {
  return getRandom(0, map.clientWidth);
}

/**
  *Задает случайным образом положение на карте по оси Y
  @function
  @return {number} - координата Y
*/
function getLocationY() {
  return getRandom(130, 630);
}

/**
  *Задает адрес, сформированный из координат точки по X и Y
  @function
  @return {string} - координата вида "{{location.x}}, {{location.y}}"
*/
function getAddress() {
  return getLocationX() + ', ' + getLocationY();
}

/**
  *создает объект объявления
  @function
  @param {number} ordinal - порядковый номер объекта
  @return {object} - созданный объект
*/
function getObject(ordinal) {
  return {
    author: {
      avatar: getUrl(ordinal)
    },

    offer: {
      title: getTitle(),
      address: getAddress(),
      price: getPrice(),
      type: getType(Types),
      rooms: getRooms(),
      guests: getGuestsAmount(),
      checkin: getCheckin(),
      checkout: getCheckout(),
      features: getFeatures(),
      description: '',
      photos: shufflePhotos()
    },

    location: {
      x: getLocationX(),
      y: getLocationY()
    }
  };
}

/**
  *создает массив объектов объявлений
  @function
  @param {number} objectsAmount - требуемое количество объектов в массиве
  @return {array} objectsArray - созданный массив, содеражщий objectsAmount объектов
*/
function getObjectsArray(objectsAmount) {
  var objectsArray = [];
  for (var i = 1; i <= objectsAmount; i++) {
    var objectItem = getObject(i);
    objectsArray.push(objectItem);
  }

  return objectsArray;
}

/**
  *создает отметки объявлений на карте
  @function
  @param {object} template - используемый шаблон разметки
*/
function makePins(template) {
  for (var j = 0; j < offersList.length; j++) {
    var pinItem = template.cloneNode(true);
    pinItem.style = 'left: ' + offersList[j].location.x + 'px; ' + 'top: ' + offersList[j].location.y + 'px;';
    pinItem.querySelector('img').src = offersList[j].author.avatar;
    pinItem.querySelector('img').alt = offersList[j].offer.title;

    mapPins.appendChild(pinItem);
  }
}

/**
  *указывает в объявлении дополнительные опции
  @function
  @param {object} template - используемый шаблон разметки
*/
function fillFeaturesInfo(template) {
  for (var k = 0; k < offersList[0].offer.features.length; k++) {
    var featureItem = template.cloneNode(true);
    featureItem.classList.add('popup__feature--' + offersList[0].offer.features[k]);

    cardItem.querySelector('.popup__features').appendChild(featureItem);
  }
}

/**
  *собирает строку с информацией о количестве комнат и гостей
  @function
  @param {number} ordinal - порядковый номер объекта, из которого берется информация
  @return {string} - сформированная строка
*/
function getRoomsGuestsOffer(ordinal) {
  return offersList[ordinal].offer.rooms + ' комнаты для ' + offersList[ordinal].offer.guests + ' гостей.';
}

/**
  *собирает строку с информацией о времени въезда и выезда
  @function
  @param {number} ordinal - порядковый номер объекта, из которого берется информация
  @return {string} - сформированная строка
*/
function getCheckinCheckoutOffer(ordinal) {
  return 'Заезд после ' + offersList[ordinal].offer.checkin + ', выезд до ' + offersList[ordinal].offer.checkout;
}

var offersList = getObjectsArray(OBJECTS_QUANTITY);

map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

makePins(pinTemplate);

var mapCardTempalte = document.querySelector('#card').content.querySelector('.map__card');
var cardItem = mapCardTempalte.cloneNode(true);
cardItem.querySelector('.popup__title').textContent = offersList[0].offer.title;
cardItem.querySelector('.popup__text--address').textContent = offersList[0].offer.address;
cardItem.querySelector('.popup__text--price').textContent = offersList[0].offer.price + '₽/ночь';
cardItem.querySelector('.popup__type').textContent = Types[offersList[0].offer.type.toUpperCase()];
cardItem.querySelector('.popup__text--capacity').textContent = getRoomsGuestsOffer(0);
cardItem.querySelector('.popup__text--time').textContent = getCheckinCheckoutOffer(0);

var featureTemplate = document.querySelector('#feature-template').content.querySelector('.popup__feature');

fillFeaturesInfo(featureTemplate);

cardItem.querySelector('.popup__description').textContent = offersList[0].offer.description;

for (var n = 0; n < offersList[0].offer.photos.length; n++) {
  var cardImage = document.createElement('img');
  cardImage.src = offersList[0].offer.photos[n];
  cardImage.alt = 'Фотография жилья';
  cardImage.width = 45;
  cardImage.height = 40;

  cardItem.querySelector('.popup__photos').appendChild(cardImage);
}

cardItem.querySelector('.popup__avatar').src = offersList[0].author.avatar;

var here = document.querySelector('.map__filters-container');
here.insertAdjacentElement('beforebegin', cardItem);

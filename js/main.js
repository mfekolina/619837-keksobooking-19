'use strict';
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
var CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
var HOUSE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var HOUSE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var userMap = document.querySelector('.map');
userMap.classList.remove('map--faded');

var pinsMap = userMap.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getLengthRandomArray = function (length) {
  var newLength = length - getRandomIntInclusive(0, length);
  return newLength;
};

var getRandomArray = function (array) {
  var newArray = [];
  var randomLength = getLengthRandomArray(array.length);
  for (var i = 0; i < randomLength; i++) {
    newArray[i] = array[getRandomIntInclusive(0, array.length)];
  }
  return newArray;
};

var pins = [];

for (var i = 0; i < 8; i++) {
  pins[i] = {
    author:
      {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
    offer: {
      title: '',
      address: '600, 350',
      price: getRandomIntInclusive(100, 1000),
      type: HOUSE_TYPES[getRandomIntInclusive(0, 3)],
      rooms: getRandomIntInclusive(1, 10),
      guests: getRandomIntInclusive(1, 10),
      checkin: CHECKIN_HOURS[getRandomIntInclusive(0, 3)],
      checkout: CHECKOUT_HOURS[getRandomIntInclusive(0, 3)],
      features: getRandomArray(HOUSE_FEATURES),
      description: '',
      photos: getRandomArray(HOUSE_PHOTOS),
    },
    location: {
      x: getRandomIntInclusive(0, 1200),
      y: getRandomIntInclusive(130, 630),
    }

  };
}

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('[style]').textContent = 'left: ' + (pin.location.x - 50 / 2) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinElement.querySelector('[src]').textContent = pin.author.avatar;
  pinElement.querySelector('[alt]').textContent = pin.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
pinsMap.appendChild(fragment);

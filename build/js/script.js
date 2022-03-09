'use strict';

const popupButton = document.querySelector('.popup__button');
const headerButton = document.querySelector('.header__button');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupCloseButton = document.querySelector('.popup__button-close');
const namePopup = document.querySelector('#name');
const telPopup = document.querySelector('#tel');
const question = document.querySelector('#user-question');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-tel');
const buttonForm = document.querySelector('.questions__button-container button');
const accordionElements = document.querySelectorAll('.footer__accordion');
const accordionTitle = document.querySelectorAll('.footer__accordion h3');

const im = new Inputmask('+7 (999) 999-99-99');
if (userPhone) {
  im.mask(userPhone);
}

buttonForm.addEventListener('click', function (evt) {
  if (userName.value.length === 0) {
    evt.preventDefault();
    userName.setCustomValidity('Введите ваше имя');
  } else {
    userName.setCustomValidity('');
  }
  userName.reportValidity();
  localStorage.setItem('name', userName.value);

  if (userPhone.value.length === 0) {
    evt.preventDefault();
    userPhone.setCustomValidity('Введите ваш номер телефона');
  } else if (userPhone.value.length > 0) {
    const phoneNumber = userPhone.value.split('');
    if (phoneNumber.includes('_')) {
      userPhone.setCustomValidity('Введите номер телефона полностью');
    } else {
      userPhone.setCustomValidity('');
    }
  }
  userPhone.reportValidity();
  localStorage.setItem('phone', userPhone.value);
});

userName.addEventListener('input', function () {
  userName.setCustomValidity('');
});

userPhone.addEventListener('input', function () {
  userPhone.setCustomValidity('');
});

const imP = new Inputmask('+7 (999) 999-99-99');
imP.mask(telPopup);

popupButton.addEventListener('click', function (evt) {
  if (namePopup.value.length === 0) {
    evt.preventDefault();
    namePopup.setCustomValidity('Введите ваше имя');
  } else {
    namePopup.setCustomValidity('');
  }
  namePopup.reportValidity();
  localStorage.setItem('name', namePopup.value);

  if (telPopup.value.length === 0) {
    evt.preventDefault();
    telPopup.setCustomValidity('Введите номер телефона');
  } else if (telPopup.value.length > 0) {
    var phoneNumber = telPopup.value.split('');
    if (phoneNumber.includes('_')) {
      telPopup.setCustomValidity('Введите номер телефона полностью');
    } else {
      telPopup.setCustomValidity('');
    }
  } else {
    telPopup.setCustomValidity('');
  }
  telPopup.reportValidity();
  localStorage.setItem('phone', telPopup.value);

  if (question) {
    localStorage.setItem('text', question.value);
  }
});

namePopup.addEventListener('input', function () {
  namePopup.setCustomValidity('');
});

telPopup.addEventListener('input', function () {
  telPopup.setCustomValidity('');
});

headerButton.addEventListener('click', function () {
  popup.classList.add('popup--opened');
  document.body.classList.add('no-scroll');

  namePopup.focus();

  localStorage.setItem('name', namePopup.value);
  localStorage.setItem('tel', telPopup.value);
  localStorage.setItem('text', question.value);

  popupCloseButton.addEventListener('click', closeModalPopup);

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup();
    }
  });

  popup.addEventListener('click', function (evt) {
    if (evt.target !== popupContainer) {
      closePopup();
    }
  });
});

popupContainer.addEventListener('click', function (evt) {
  evt.stopPropagation();
});

function closeModalPopup() {
  popup.classList.remove('popup--opened');
  document.body.classList.remove('no-scroll');
}

function closePopup() {
  closeModalPopup();
  window.removeEventListener('keydown', closePopup);
  popupCloseButton.removeEventListener('click', closePopup);
  headerButton.removeEventListener('click', closePopup);
}

function trapFocus(element) {
  const focusElemenents = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  const firstFocusElement = focusElemenents[0];
  const lastFocusElement = focusElemenents[focusElemenents.length - 1];
  const KEYCODE_TAB = 9;

  element.addEventListener('keydown', function (e) {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusElement) {
        lastFocusElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusElement) {
        firstFocusElement.focus();
        e.preventDefault();
      }
    }
  });
}

if (popup) {
  trapFocus(popup);
}

if (accordionElements) {
  for (let i = 0; i < accordionElements.length; i++) {
    accordionElements[i].classList.remove('footer__accordion--nojs');

  }
}

if (accordionTitle) {
  for (let j = 0; j < accordionTitle.length; j++) {
    accordionTitle[j].addEventListener('click', function (evt) {
      evt.preventDefault();
      let array = Array.from(accordionTitle);
      const target = evt.target;
      const index = array.indexOf(target);
      array.forEach(function (item, n) {
        if (n === index) {
          accordionElements[n].classList.toggle('footer__accordion--active');
        } else {
          accordionElements[n].classList.remove('footer__accordion--active');
        }
      });
    });
  }
}

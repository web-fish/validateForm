'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.forms.login;
  let emailInput = loginForm.emailName;
  let passwordInput = loginForm.passwordName;
  let checkboxInput = loginForm.checkboxName;
  const resultObj = {};

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    validateForm();
  });

  function validateForm() {

    function checkFieldEmail() {
      if (emailInput.value === '') {
        addClass(emailInput, 'isActive');
      } else if (!validateEmail(emailInput.value)) {
        addClassAndValidText(emailInput, 'isActive', 'Email невалидный');
      } else {
        removeClass(emailInput, 'isActive');
      };
    };
    checkFieldEmail();

    function checkFieldPassword() {
      if (passwordInput.value === '') {
        addClass(passwordInput, 'isActive');
      } else if (passwordInput.value.length <= 1 || passwordInput.value.length <= 7) {
        addClassAndValidText(passwordInput, 'isActive', 'Пароль должен содержать как минимум 8 символов');
      } else {
        removeClass(passwordInput, 'isActive');
      };
    };
    checkFieldPassword();

    function checkFieldCheckbox() {
      if (!checkboxInput.checked) {
        checkboxInput.parentElement.lastElementChild.classList.add('isActive');
        checkboxInput.nextElementSibling.classList.add('isActive');
      };
    };
    checkFieldCheckbox();

    function toggleCheckbox() {
      checkboxInput.addEventListener('change', function (e) {
        if (checkboxInput.checked) {
          checkboxInput.parentElement.lastElementChild.classList.remove('isActive');
        } else if (!checkboxInput.checked) {
          e.preventDefault();
          checkboxInput.parentElement.lastElementChild.classList.add('isActive');
        };
      });
    };
    toggleCheckbox();

    function outputObj() {
      if (checkboxInput.checked && passwordInput.value.length >= 8 && validateEmail(emailInput.value)) {
        resultObj.email = emailInput.value;
        resultObj.password = passwordInput.value;
        console.log(resultObj);
      };
    };
    outputObj();

    function addClass(nameInput, nameOfClass) {
      nameInput.classList.add(nameOfClass);
      nameInput.previousElementSibling.classList.add(nameOfClass);
      nameInput.nextElementSibling.classList.add(nameOfClass);
    };

    function removeClass(nameInput, nameOfClass) {
      nameInput.classList.remove(nameOfClass);
      nameInput.previousElementSibling.classList.remove(nameOfClass);
      nameInput.nextElementSibling.classList.remove(nameOfClass);
    };

    function addClassAndValidText(nameInput, nameOfClass, text) {
      nameInput.classList.add(nameOfClass);
      nameInput.previousElementSibling.classList.add(nameOfClass);
      nameInput.nextElementSibling.classList.add(nameOfClass);
      nameInput.nextElementSibling.textContent = text;
    };

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
  };
});
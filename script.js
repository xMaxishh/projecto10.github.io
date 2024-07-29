"use strict";


const logo = document.querySelectorAll('.logo');
const buttonContinue = document.getElementById('continue');
const containerForm = document.querySelector('.form');
const estadoExito = document.querySelector('.msg-succes');
const btnEnviar = document.getElementById('confirm');
const nameCard = document.getElementById('nameCard');
const numberCard = document.getElementById('numberCard');
const timeMes = document.getElementById('timeMes');
const timeYear = document.getElementById('timeYear');
const cvc = document.getElementById('cvc');
const colorError = "hsl(0, 66%, 54%)";
const colorDefault = "";
const error = document.querySelector('.error');

const resetErrors = () => {
    nameCard.style.borderColor = colorDefault;
    numberCard.style.borderColor = colorDefault;
    timeMes.style.borderColor = colorDefault;
    timeYear.style.borderColor = colorDefault;
    cvc.style.borderColor = colorDefault;
    error.style.display = "none";
};

const resetForm = () => {
    nameCard.value = "";
    numberCard.value = "";
    timeMes.value = "";
    timeYear.value = "";
    cvc.value = "";
    document.querySelector('.name').textContent = "Jane Appleseed";
    document.querySelector('.numbers').textContent = "0000 0000 0000 0000";
    document.querySelector('.expired').textContent = "00/00";
    document.querySelector('.number-seg').textContent = "000";
    resetErrors();
};

const validación = (e) => {
    e.preventDefault();
    let valid = true;
    resetErrors();

    if (numberCard.value.trim() === "" || !/^\d+(\s\d+)*$/.test(numberCard.value)) {
        numberCard.style.borderColor = colorError;
        error.style.display = "block";
        document.querySelector('.err1').style.display = "block";
        valid = false;
    }
    if (nameCard.value.trim() === "") {
        nameCard.style.borderColor = colorError;
        error.style.display = "block";
        document.querySelector('.err1').style.display = "block";
        valid = false;
    }


    if (timeMes.value.trim() === "") {
        timeMes.style.borderColor = colorError;
        error.style.display = "block";
        document.querySelector('.err2').style.display = "block"; // Cambiado a 'err2' para el mensaje correcto
        valid = false;
    }

    if (timeYear.value.trim() === "") {
        timeYear.style.borderColor = colorError;
        error.style.display = "block";
        document.querySelector('.err3').style.display = "block"; // Cambiado a 'err3' para el mensaje correcto
        valid = false;
    }

    if (cvc.value.trim() === "") {
        cvc.style.borderColor = colorError;
        error.style.display = "block";
        document.querySelector('.err4').style.display = "block"; // Cambiado a 'err4' para el mensaje correcto
        valid = false;
    }

    if (valid) {
        btnEnviar.addEventListener('click', (e) => {
            e.preventDefault();
            containerForm.style.display = 'none'; // Cambiado a 'containerForm'
            estadoExito.style.display = 'flex';
        });
    }
};

btnEnviar.addEventListener('click', validación);

[nameCard, numberCard, timeMes, timeYear, cvc].forEach(field => {
    field.addEventListener('input', resetErrors);
});

buttonContinue.addEventListener('click', (e) => {
    e.preventDefault();
    estadoExito.style.display = 'none';
    containerForm.style.display = 'block';
    resetForm();
});

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("timeMes");
    const placeholder = document.querySelector(".input-placeholder");

    input.addEventListener("focus", function () {
        placeholder.style.display = 'none';
    });

    input.addEventListener("blur", function () {
        if (!input.value) {
            placeholder.style.display = 'block';
        }
    });

    if (input.value) {
        placeholder.style.display = 'none';
    }
});

const addSpaces = (value) => {
    return Array.from(value).reduce((acc, t, i) => {
        if (i > 0 && i % 4 === 0) acc += " ";
        acc += t;
        return acc;
    }, "");
};

const creditOnInput = (e) => {
    const cardNumber = e.target.value;
    e.target.value = addSpaces(cardNumber.replaceAll(" ", ""));
    document.querySelector('.numbers').textContent = e.target.value;

};

numberCard.addEventListener('input', (e) => {
    creditOnInput(e);
    detectCardType(e.target.value);
});

// const timeMes = document.getElementById('timeMes');
// const timeYear = document.getElementById('timeYear');



timeMes.addEventListener('input', function () {
    const fechaMes = document.querySelector('.expired');

    if (timeMes.value.length > 2) {
        timeMes.value = timeMes.value.slice(0, 2);
    }

    fechaMes.textContent = timeMes.value;

    timeYear.addEventListener('input', function () {
        if (timeYear.value.length > 2) {
            timeYear.value = timeYear.value.slice(0, 2);
        }

        fechaMes.textContent = timeMes.value + "/" + timeYear.value;
    });
});

cvc.addEventListener('input', function () {
    if (cvc.value.length > 3) {
        cvc.value = cvc.value.slice(0, 3);
    }

    document.querySelector('.number-seg').textContent = cvc.value;
});




nameCard.addEventListener('input', function () {
    if (nameCard.value.length > 16) {
        nameCard.value = nameCard.value.slice(0, 16);
    }
    document.querySelector('.name').textContent = nameCard.value;
});


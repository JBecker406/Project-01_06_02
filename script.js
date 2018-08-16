/*
 *  script.js
 *  Form validation functions for index.html
 *
 *  Author: Jeremy Becker
 *  Date: 8.16.18
 *
 */
"use strict";

var formValidity = true;

// function to remove fallback placeholder text
function zeroPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    addressBox.style.color = "black";
    if (addressBox.value === addressBox.placeholder) {
        addressBox.value;
    }
}

// function to restore placeholder text if there is no user entry
function checkPlaceholder() {
    var addressBox = document.getElementById("addrinput");
    if (addressBox.value === "") {
        addressBox.style.color = "rgb(178,184,183)";
        addressBox.value = addressBox.placeholder;
    }
}

// function to add placeholder text for browsers that don't support placeholder attribute
function generatePlaceholder() {
    if (!Modernizr.input.placeholder) {
        var addressBox = document.getElementById("addrinput");
        addressBox.value = addressBox.placeholder;
        addressBox.style.color = "rgb(178,184,183)";
        if (addressBox.addEventListener) {
            addressBox.addEventListener("focus", zeroPlaceholder, false);
            addressBox.addEventListener("blur", checkPlaceholder, false);
        } else if (addressBox.attachEvent) {
            addressBox.attachEvent("onfocus", zeroPlaceholder);
            addressBox.attachEvent("onblur", checkPlaceholder);
        }
    }
}

// function to validate required input fields
function validateRequired() {
    var inputElements = document.getElementsByTagName("input");
    var errorDiv = document.getElementById("errorText");
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement = null;
    try {
        for (let i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            } else {
                currentElement.style.background = "white";
            }
        }
        if (fieldsetValidity) {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        } else {
            throw "Please fill out all Personal Information.";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// function to validate form
function validateForm(evt) {
    formValidity = true;
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    
    validateRequired();

    if (formValidity) {
        document.getElementsByTagName("form")[0].submit();
    }
}

// function to create event listeners
function createEventListeners() {
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
}

// function to configure page
function setUpPage() {
    createEventListeners();
    generatePlaceholder();
}

// function to load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
// ==UserScript==
// @name         Moodle Login Challenge Solver
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Solve Moodle login challenges automatically, autofill username/password, and click login
// @author       You
// @match        https://moodle.iitd.ac.in/login/index.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function solveChallenge(html) {
        if (html.includes("subtract")) {
            const numbers = html.match(/(\d+) - (\d+)/);
            return parseInt(numbers[1]) - parseInt(numbers[2]);
        } else if (html.includes("add")) {
            const numbers = html.match(/(\d+) \+ (\d+)/);
            return parseInt(numbers[1]) + parseInt(numbers[2]);
        } else if (html.includes("enter first value")) {
            const numbers = html.match(/(\d+) , (\d+)/);
            return parseInt(numbers[1]);
        } else if (html.includes("enter second value")) {
            const numbers = html.match(/(\d+) , (\d+)/);
            return parseInt(numbers[2]);
        }
        return null;
    }

    const result = solveChallenge(document.documentElement.innerHTML);

    if (result !== null) {
        const inputElement = document.querySelector('input[name="valuepkg3"]');
        inputElement.value = result;
    }

    // Auto fill username and password
    const usernameElement = document.querySelector('#username');
    const passwordElement = document.querySelector('#password');

    usernameElement.value = "YOUR_USERNAME"; // Replace 'YOUR_USERNAME' with your actual username
    passwordElement.value = "YOUR_PASSWORD"; // Replace 'YOUR_PASSWORD' with your actual password

    // Auto click the login button
    const loginButton = document.querySelector('#loginbtn');
    loginButton.click();

})();

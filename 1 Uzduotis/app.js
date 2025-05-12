const form = document.getElementById("password-form");
const passwordField = document.getElementById("password");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let length = document.getElementById("length").value;
    let includeUppercase = document.getElementById("uppercase").checked;
    let includeLowercase = document.getElementById("lowercase").checked;
    let includeNumbers = document.getElementById("numbers").checked;
    let includeSymbols = document.getElementById("symbols").checked;

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allCharacters = "";
    if (includeUppercase) {
        allCharacters += upper;
    }
    if (includeLowercase) {
        allCharacters += lower;
    }
    if (includeNumbers) {
        allCharacters += numbers;
    }
    if (includeSymbols) {
        allCharacters += symbols;
    }

    let result = "";
    if (allCharacters.length === 0) {
        alert("Please select at least one character type.");
        return;

    }

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * allCharacters.length);
        result += allCharacters[randomIndex];
    }

    passwordField.value = result;
});


function copyPassword() {
    const passwordField = document.getElementById("password");
    const password = passwordField.value;

    navigator.clipboard.writeText(password)
        .then(() => {
            alert("Password copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy password: ", err);
        });

}


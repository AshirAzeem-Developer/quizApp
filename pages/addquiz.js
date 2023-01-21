// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeCnISJN_KIhHDZSo-I34DUc33xqRT4Vo",
    authDomain: "quizapp-9fa43.firebaseapp.com",
    databaseURL: "https://quizapp-9fa43-default-rtdb.firebaseio.com",
    projectId: "quizapp-9fa43",
    storageBucket: "quizapp-9fa43.appspot.com",
    messagingSenderId: "32780507203",
    appId: "1:32780507203:web:af4997c522dcb50fcbdcf6",
    measurementId: "G-JJK66Q92BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();


var question = document.getElementById('question');
var option = document.getElementById('option');
var optionsParent = document.getElementById('optionsParent');
var correctAnswerElem = document.getElementById('correctAnswer');


var options = []
var corerctAnswer;

window.addOptions = function () {
    options.push(option.value);
    console.log(options);

    renderOptions();

}


function renderOptions() {

    optionsParent.innerHTML = '';
    for (var i = 0; i < options.length; i++) {
        optionsParent.innerHTML += `<li onClick="setCorrectAnswer('${options[i]}')" class="p-2 bg-light m-3 shadow">${options[i]}</li>`;

    }
}

window.setCorrectAnswer = function (a) {
    corerctAnswer = a;
    correctAnswerElem.innerHTML = corerctAnswer;

}

window.submitQuestion = function () {

    var obj = {

        question: question.value,
        options: options,
        corerctAnswer: corerctAnswer,
    }
    obj.id = push(ref(db, 'questions/')).key;

    const reference = ref(db, `question/${obj.id}`);
    set(reference, obj);
    console.log(obj);

}


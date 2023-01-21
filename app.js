// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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


// const loader = document.getElementById('loader');
// const showQuestion = document.getElementById('showQuestion');


function getDataFromDatabase() {
    // loader.style.display = 'block';
    // showQuestion.style.display = 'none';
    const reference = ref(db, 'question/');
    onChildAdded(reference, function (data) {
        // console.log(questions);
        questions.push(data.val());
        // loader.style.display = 'none';
        // showQuestion.style.display = 'block';
        renderQuestionn();
    })

}
getDataFromDatabase();


// ------------------------>>>>>>>>>>>>>>Change Display Function Starts<<<<<<<<<<-----------------------

var StartSec = document.getElementById('StartSec');
var scoresec = document.getElementById('ScoreDisplay');
var QUizSec = document.getElementById('QuizSectionNoDisplay');
window.ChangeDisplay = function () {
    StartSec.className = 'QuizSectionNoDisplay';
    QUizSec.className += 'QuizSectionDisplay';
    scoresec.style.display = 'block';
}
// ------------------------>>>>>>>>>>>>>>Change Display Function Ends<<<<<<<<<<-----------------------

var questions = [];

var indexNum = 0;
var marks = 0;


var currentQuestion = document.getElementById('currentQuestion');
var totalQuestion = document.getElementById('totalQuestion');
var question = document.getElementById('question');
var answerParent = document.getElementById('answerParent');
var showmarks = document.getElementById('marks');
var percent = document.getElementById('percentage');


window.checkQuestion = function (a, b) {

    if (a == b) {
        marks++;
        showmarks.innerHTML = marks;
        percent.innerHTML = Math.round((marks / questions.length) * 100) + "%";
    }
    nextQuestion();

}

function nextQuestion() {
    indexNum++;
    if (indexNum == questions.length) {
        var displayMainSec = document.getElementById('QuizSectionNoDisplay');
        displayMainSec.style.display = 'none';
    }
    renderQuestionn();
}

function renderQuestionn() {
    currentQuestion.innerHTML = indexNum + 1;
    totalQuestion.innerHTML = questions.length;
    var obj = questions[indexNum];
    question.innerHTML = obj.question;
    answerParent.innerHTML = '';
    for (var i = 0; i < obj.options.length; i++) {
        answerParent.innerHTML += `<div class="col-md-6 py-2 ">
        <div class="py-2">
            <button onclick="checkQuestion('${obj.options[i]}','${obj.corerctAnswer}')">${obj.options[i]}</button>
        </div>
    </div>`

    }

}
renderQuestionn();


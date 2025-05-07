// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4z3nPWrNm9JIMfPJoZgLNk9Sbmco5Z-k",
  authDomain: "quizapp-9b9ff.firebaseapp.com",
  projectId: "quizapp-9b9ff",
  storageBucket: "quizapp-9b9ff.firebasestorage.app",
  messagingSenderId: "929974221366",
  appId: "1:929974221366:web:3f8d62186a95cfba697697",
  measurementId: "G-QVMWBHHQ5J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// const loader = document.getElementById('loader');
// const showQuestion = document.getElementById('showQuestion');

function getDataFromDatabase() {
  const reference = ref(db, "questions/");
  onChildAdded(reference, (data) => {
    console.log("Data received:", data.val());
    questions.push(data.val());

    // Render only after the first question is loaded
    if (questions.length === 1) {
      renderQuestionn();
    }
  });
}

getDataFromDatabase();

// ------------------------>>>>>>>>>>>>>>Change Display Function Starts<<<<<<<<<<-----------------------

var StartSec = document.getElementById("StartSec");
var scoresec = document.getElementById("ScoreDisplay");
var QUizSec = document.getElementById("QuizSectionNoDisplay");
window.ChangeDisplay = function () {
  StartSec.style.display = "none"; // Hide the start section
  QUizSec.style.display = "block"; // Show the quiz section
  scoresec.style.display = "block"; // Show the score section
  renderQuestionn(); // Now it will render only after the first question is loaded
};

// ------------------------>>>>>>>>>>>>>>Change Display Function Ends<<<<<<<<<<-----------------------

var questions = [];

var indexNum = 0;
var marks = 0;

var currentQuestion = document.getElementById("currentQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var answerParent = document.getElementById("answerParent");
var showmarks = document.getElementById("marks");
var percent = document.getElementById("percentage");

window.checkQuestion = function (a, b) {
  if (a == b) {
    marks++;
    showmarks.innerHTML = marks;
    percent.innerHTML = Math.round((marks / questions.length) * 100) + "%";
  }
  nextQuestion();
};

function nextQuestion() {
  indexNum++;
  if (indexNum == questions.length) {
    var displayMainSec = document.getElementById("QuizSectionNoDisplay");
    displayMainSec.style.display = "none";

    // Show the result section
    var resultSection = document.getElementById("ResultSection");
    resultSection.style.display = "block";

    // Set final score and percentage
    document.getElementById("finalScore").innerHTML = "Score: " + marks;
    document.getElementById("finalPercentage").innerHTML =
      "Percentage: " + Math.round((marks / questions.length) * 100) + "%";

    // Add a personalized message
    let percentage = Math.round((marks / questions.length) * 100);
    let feedbackMessage = "";

    if (percentage === 100) {
      feedbackMessage = "Perfect Score! You're a quiz master! 🎉";
    } else if (percentage >= 75) {
      feedbackMessage =
        "Great Job! You have a strong grasp of the material. 👍";
    } else if (percentage >= 50) {
      feedbackMessage = "Good Effort! Keep practicing to improve. 💪";
    } else {
      feedbackMessage = "Don't give up! Review and try again. 🚀";
    }

    document.getElementById("feedbackMessage").innerHTML = feedbackMessage;

    return;
  }
  renderQuestionn();
}

function renderQuestionn() {
  if (questions.length === 0) {
    currentQuestion.innerHTML = "-";
    totalQuestion.innerHTML = "-";
    question.innerHTML = "Loading...";
    answerParent.innerHTML = "";
    return;
  }

  currentQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length; // Display total questions correctly
  var obj = questions[indexNum];
  question.innerHTML = obj.question;
  answerParent.innerHTML = "";
  for (var i = 0; i < obj.options.length; i++) {
    answerParent.innerHTML += `<div class="col-md-6 py-2">
            <div class="py-2">
                <button onclick="checkQuestion('${obj.options[i]}','${obj.correctAnswer}')">${obj.options[i]}</button>
            </div>
        </div>`;
  }
}
window.restartQuiz = function () {
  indexNum = 0;
  marks = 0;
  showmarks.innerHTML = marks;
  percent.innerHTML = "0%";
  StartSec.style.display = "block";
  document.getElementById("ResultSection").style.display = "none";
  renderQuestionn();
};

renderQuestionn();

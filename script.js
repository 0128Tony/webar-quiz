let current = 0;
let score = 0;
let questions = [];

async function loadQuiz() {
  const res = await fetch("quiz.json");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  const options = [q.answer, ...q.distractors].sort(() => Math.random() - 0.5);

  document.querySelector("#questionText").setAttribute("text", "value", `第 ${current+1} 題：${q.question}`);
  options.forEach((opt, i) => {
    document.querySelectorAll("button")[i].innerText = opt;
    document.querySelectorAll("button")[i].dataset.correct = (opt === q.answer);
  });
}

function checkAnswer(index) {
  const correct = document.querySelectorAll("button")[index].dataset.correct === "true";
  alert(correct ? "✅ 答對了！" : "❌ 答錯了！");
  if (correct) score++;
  current++;
  if (current >= questions.length) {
    alert(`🎯 測驗結束！你答對了 ${score}/${questions.length} 題！`);
  } else {
    showQuestion();
  }
}

window.onload = loadQuiz;

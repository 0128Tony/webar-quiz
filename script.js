
window.addEventListener("DOMContentLoaded", async () => {
  const questionText = document.getElementById("questionText");
  const optionButtons = document.getElementById("optionButtons");

  try {
    const res = await fetch("quiz.json");
    const data = await res.json();
    let current = 0;

    function loadQuestion(index) {
      const item = data[index];
      questionText.setAttribute("text", "value", `第 ${index + 1} 題：${item.question}`);
      optionButtons.innerHTML = "";
      item.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => {
          if (opt === item.answer) {
            alert("✅ 答對了！");
          } else {
            alert("❌ 答錯了！");
          }
          if (index + 1 < data.length) {
            loadQuestion(index + 1);
          } else {
            alert("🎉 測驗結束！");
            questionText.setAttribute("text", "value", "測驗完成！");
            optionButtons.innerHTML = "";
          }
        };
        optionButtons.appendChild(btn);
      });
    }

    loadQuestion(current);
  } catch (err) {
    console.error("載入 quiz.json 失敗：", err);
  }
});

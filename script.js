// Main page script: вешаем обработчик только если кнопка есть на странице
const start_quiz = document.getElementById('start_quiz');
if (start_quiz) {
  start_quiz.addEventListener('click', function() {
    // Сбрасываем сохранённый счёт при старте новой игры
    localStorage.setItem('quiz_score', '0');
    window.location.href = 'Pages/quiz1.html';
  });
}

/* Вопросы
const quiz = [
  {
    question: "Столица Франции?",
    answers: ["Берлин", "Париж", "Рим"],
    correct: 1
  },
  {
    question: "Самый большой океан?",
    answers: ["Атлантический", "Тихий", "Индийский"],
    correct: 1
  },
  {
    question: "Самая высокая гора в мире?",
    answers: ["Эльбрус", "Монблан", "Эверест"],
    correct: 2
  },
  {
    question: "На каком материке находится Украина?",
    answers: ["Азия", "Европа", "Африка"],
    correct: 1
  },
  {
    question: "Какая страна имеет форму сапога?",
    answers: ["Испания", "Италия", "Греция"],
    correct: 1
  },
  {
    question: "Самая длинная река в мире?",
    answers: ["Амазонка", "Нил", "Янцзы"],
    correct: 1
  },
  {
    question: "Столица Японии?",
    answers: ["Осака", "Киото", "Токио"],
    correct: 2
  }
];
*/


var score = 0;

// Определяем текущий номер вопроса (если скрипт запущен на странице вопроса)
var currentQuestion = 0;
if (window.location.pathname.endsWith('quiz1.html')) {
  currentQuestion = 1;
}

// Обработчики на странице викторины — добавляем только если элементы существуют
const correctBtn = document.getElementById('correct');
if (correctBtn) {
  correctBtn.addEventListener('click', function() {
    // Получаем текущий счёт из localStorage (если есть), увеличиваем и сохраняем
    const stored = parseInt(localStorage.getItem('quiz_score') || '0', 10);
    const newScore = stored + 1;
    localStorage.setItem('quiz_score', String(newScore));
    score = newScore;
    console.log('Текущий счет: ' + score);
    // Переход на страницу-результат в той же папке Pages
    if (window.location.pathname.endsWith('quiz1.html')) {
        window.location.href = 'quiz1-correct.html';
    }
    
  });
}

// На странице несколько кнопок с id="incorrect" (в текущем HTML они повторяются).
// Выбираем все элементы с таким id и вешаем обработчик на каждый.
const incorrectBtns = document.querySelectorAll('#incorrect');
if (incorrectBtns.length) {
  incorrectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Сохраняем текущий счёт (не увеличиваем) и оставляем пользователя на странице
      const stored = parseInt(localStorage.getItem('quiz_score') || '0', 10);
      localStorage.setItem('quiz_score', String(stored));
      console.log('Текущий счет (неправильный ответ): ' + stored);
      // Переход на страницу с информацией о неправильном ответе
      if (window.location.pathname.endsWith('quiz1.html')) {

        window.location.href = 'quiz1-incorrect.html';
      }
    });
  });
}



//Текущий счет сохраняется в переменной score, которая увеличивается при правильных ответах и остается неизменной при неправильных. Вы можете использовать эту переменную для отображения итогового результата на странице quiz1-correct.html или quiz1-incorrect.html.
// Отображение счёта на странице результатов (quiz1-correct.html)
var score_display = document.getElementById('score_display');
if (score_display) {
  const stored = parseInt(localStorage.getItem('quiz_score') || '0', 10);
  score_display.textContent = 'Ваш счет: ' + stored;
}



var next_question_btn = document.getElementById('next_question');
if (next_question_btn) {
  next_question_btn.addEventListener('click', function() {
    // Определяем имя текущей страницы
    const last = window.location.pathname.split('/').pop();
    const m = last.match(/quiz(\d+)(?:-(?:correct|incorrect))?\.html/);
    if (m) {
      const n = parseInt(m[1], 10);
      const next = n + 1;
      const nextUrl = 'quiz' + next + '.html';
      // Проверяем существование страницы (работает на сервере); при ошибке просто пробуем перейти
      fetch(nextUrl, { method: 'HEAD' }).then(res => {
        if (res.ok) {
          window.location.href = nextUrl;
        } else {
          window.location.href = 'final_result.html';
        }
      }).catch(() => {
        // В окружении file:// fetch может упасть — всё равно пробуем перейти
        window.location.href = nextUrl;
      });
      return;
    }

    // Если текущая страница не по шаблону — возвращаемся на главную
    if (window.location.pathname.includes('/Pages/')) {
      window.location.href = '../main.html';
    } else {
      window.location.href = 'main.html';
    }
  });
}
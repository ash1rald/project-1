// Main page script: вешаем обработчик только если кнопка есть на странице
const start_quiz = document.getElementById('start_quiz');
if (start_quiz) {
  start_quiz.addEventListener('click', function() {
    // Сбрасываем сохранённый счёт при старте новой игры
    localStorage.setItem('quiz_score', '0');
    window.location.href = 'Pages/quiz1.html';
  });
}


var score = 0;

// Определяем текущий номер вопроса (если скрипт запущен на странице вопроса)
var currentQuestion = 0;
// Определяем номер текущего вопроса из URL
const quizMatch = window.location.pathname.match(/quiz(\d+)\.html/);
if (quizMatch) {
  currentQuestion = parseInt(quizMatch[1], 10);
}

// Обработчик для правильного ответа
const correctBtn = document.getElementById('correct');
if (correctBtn) {
  correctBtn.addEventListener('click', function() {
    // Получаем текущий счёт из localStorage, увеличиваем и сохраняем
    const stored = parseInt(localStorage.getItem('quiz_score') || '0', 10);
    const newScore = stored + 1;
    localStorage.setItem('quiz_score', String(newScore));
    score = newScore;
    console.log('Текущий счет: ' + score);
    // Переход на страницу результата (используем текущий номер вопроса)
    window.location.href = 'quiz' + currentQuestion + '-correct.html';
  });
}

// Обработчик для неправильных ответов
const incorrectBtns = document.querySelectorAll('#incorrect');
if (incorrectBtns.length) {
  incorrectBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Сохраняем текущий счёт (не увеличиваем)
      const stored = parseInt(localStorage.getItem('quiz_score') || '0', 10);
      localStorage.setItem('quiz_score', String(stored));
      console.log('Текущий счет (неправильный ответ): ' + stored);
      // Переход на страницу результата неправильного ответа
      window.location.href = 'quiz' + currentQuestion + '-incorrect.html';
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
          // Проверяем счет перед показом итогов
          const finalScore = parseInt(localStorage.getItem('quiz_score') || '0', 10);
          if (finalScore > 8) {
            window.location.href = 'cheater.html';
          } else {
            window.location.href = 'final_result.html';
          }
        }
      }).catch(() => {
        // В окружении file:// fetch может упасть — пробуем перейти, но сначала проверяем счет
        const finalScore = parseInt(localStorage.getItem('quiz_score') || '0', 10);
        if (finalScore > 8) {
          window.location.href = 'cheater.html';
        } else {
          window.location.href = nextUrl;
        }
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

// Отображение финального счета на странице финального результата
const finalScoreDisplay = document.getElementById('final_score_display');
if (finalScoreDisplay && window.location.pathname.includes('final_result.html')) {
  const stored = parseInt(localStorage.getItem('quiz_score') || '0', 10);
  finalScoreDisplay.textContent = 'Ваш финальный результат: ' + stored;
  finalScoreDisplay.className = 'final-score'; // Добавляем класс для стилизации
}

var restart_btn = document.getElementById('restart_quiz');
if (restart_btn) {
  restart_btn.addEventListener('click', function() {
    // Сбрасываем сохранённый счёт при старте новой игры
    localStorage.setItem('quiz_score', '0');
    // Возвращаемся на главную (с относительным путём из Pages)
    window.location.href = '../main.html';
  });
}
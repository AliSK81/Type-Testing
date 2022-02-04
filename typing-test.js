const TIME_LIMIT = 60;
const TEXT =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";

let wpmText = document.getElementById("wpm");
let errorText = document.getElementById("errors");
let timerText = document.getElementById("time");
let accuracyText = document.getElementById("accuracy");

let typeText = document.getElementById("type-text");

let textArea = document.getElementById("textarea");

let timeLeft = 0;
let timeElapsed = 0;
let errors = 0;
let accuracy = 0;
let typedCharacter = 0;
let timer = null;
let hasStarted = false;

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });

textArea.addEventListener("input", update);

function initializeTest({ timeLimit, text }) {
  textArea.value = '';

  timerText.textContent = timeLeft = timeLimit;

  for (let i = 0; i < text.length; i++) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(text[i]));
    typeText.appendChild(span);
  }
}

function update() {
  if (!hasStarted) {
    timer = setInterval(updateTimer, 1000);
    hasStarted = true;
  }
  typedCharacter++;
  updateCharactersStatus();
  updateErrors();
  updateAccuracy();
}

function updateCharactersStatus() {
  const chTyped = textArea.value[typedCharacter - 1];
  const chSpan = typeText.children[typedCharacter - 1];

  if (textArea.value.length < typedCharacter) {
    typedCharacter -= 2;
    chEdited = typeText.children[typedCharacter];
    if (chEdited.className === 'incorrect-char') {
      errors--;
    }
    chEdited.removeAttribute("class");
  } else {
    if (chTyped == chSpan.textContent) {
      chSpan.classList.add('correct-char');
    } else {
      chSpan.classList.add('incorrect-char');
      errors++;
    }
  }
}

function updateAccuracy() {
  if (typedCharacter === 0) {
    accuracy = 100;
  } else {
    accuracy = Math.round((typedCharacter - errors) / typedCharacter * 100);
  }
  accuracyText.textContent = accuracy;
}

function updateErrors() {
  errorText.textContent = errors;
}

function updateWpm() {
  wpm = Math.round(typedCharacter / 5 / timeElapsed * 60);
  wpmText.textContent = wpm;
}

function updateTimer() {
  // TODO: Complete this function
}

function finishTest() {
  // TODO: Complete this function
}

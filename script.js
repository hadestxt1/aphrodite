const progressBar = document.querySelector('#progressBar');
const revealItems = document.querySelectorAll('.reveal');
const shareButtons = document.querySelectorAll('.share-x');
const copyButton = document.querySelector('#copyLink');
const copyStatus = document.querySelector('#copyStatus');
const stepButtons = document.querySelectorAll('.step');
const stepLabel = document.querySelector('#stepLabel');
const stepText = document.querySelector('#stepText');

const shareText = 'I created a simple educational microsite about BORF and why community content matters in the Base ecosystem.\n\n#BORF #BORFWRITINGCONTEST #BORFBASE #BaseEcosystem #Onchain\n\n@BORFSTRATEGY @base @asal_alizade';
const fallbackUrl = 'https://hadestxt1.github.io/aphrodite/';

const stepContent = [
  {
    label: 'Step 1',
    text: 'A user sees Base mentioned on X, in a mint, in a wallet, or through a friend. The first question is simple: “What is this, and why should I care?”'
  },
  {
    label: 'Step 2',
    text: 'BORF-style community content can slow the idea down. It can explain Base, onchain actions, and culture in words that feel like a real person is helping.'
  },
  {
    label: 'Step 3',
    text: 'With better context, users can explore more carefully. They know what to look for, what questions to ask, and how to keep learning before taking action.'
  }
];

const quiz = [
  {
    question: 'What is Base?',
    answers: [
      'An Ethereum Layer 2 ecosystem designed for lower-cost onchain activity',
      'A private messaging app',
      'A hardware wallet brand'
    ],
    correct: 0,
    feedback: 'Right. Base is commonly explained as an Ethereum Layer 2 ecosystem, which makes onchain activity more approachable for many users.'
  },
  {
    question: 'Why does educational content matter?',
    answers: [
      'It helps people understand before they participate',
      'It guarantees every project will succeed',
      'It replaces the need to think critically'
    ],
    correct: 0,
    feedback: 'Exactly. Education reduces confusion and gives people a better starting point.'
  },
  {
    question: 'What can community writing improve?',
    answers: [
      'Context, confidence, and safer curiosity',
      'Transaction finality on its own',
      'Speculation by default'
    ],
    correct: 0,
    feedback: 'Yes. Community writing is strongest when it explains the why, not when it makes financial promises.'
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function pageUrl() {
  return window.location.href && window.location.protocol.startsWith('http') ? window.location.href : fallbackUrl;
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function openShareIntent() {
  const params = new URLSearchParams({ text: shareText, url: pageUrl() });
  window.open(`https://twitter.com/intent/tweet?${params.toString()}`, '_blank', 'noopener,noreferrer');
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}

function setStep(index) {
  const content = stepContent[index];
  stepLabel.textContent = content.label;
  stepText.textContent = content.text;

  stepButtons.forEach((button) => {
    const isActive = Number(button.dataset.step) === index;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderQuestion() {
  const question = quiz[currentQuestion];
  const answers = document.querySelector('#answers');
  const questionText = document.querySelector('#questionText');
  const questionCount = document.querySelector('#questionCount');
  const scoreText = document.querySelector('#scoreText');
  const feedback = document.querySelector('#feedback');
  const nextButton = document.querySelector('#nextQuestion');

  answered = false;
  questionText.textContent = question.question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${quiz.length}`;
  scoreText.textContent = `Score: ${score}`;
  feedback.textContent = 'Choose an answer to see a quick note.';
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === quiz.length - 1 ? 'See result' : 'Next question';
  answers.innerHTML = '';

  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.type = 'button';
    button.textContent = answer;
    button.addEventListener('click', () => selectAnswer(index));
    answers.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const question = quiz[currentQuestion];
  const answerButtons = document.querySelectorAll('.answer');
  const feedback = document.querySelector('#feedback');
  const nextButton = document.querySelector('#nextQuestion');

  answerButtons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correct) button.classList.add('correct');
    if (buttonIndex === index && index !== question.correct) button.classList.add('wrong');
  });

  if (index === question.correct) {
    score += 1;
    document.querySelector('#scoreText').textContent = `Score: ${score}`;
    feedback.textContent = question.feedback;
  } else {
    feedback.textContent = `Close, but not quite. ${question.feedback}`;
  }

  nextButton.disabled = false;
}

function nextQuestion() {
  const feedback = document.querySelector('#feedback');
  const nextButton = document.querySelector('#nextQuestion');
  const answers = document.querySelector('#answers');

  if (currentQuestion < quiz.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  document.querySelector('#questionText').textContent = 'Quiz complete.';
  document.querySelector('#questionCount').textContent = 'Finished';
  document.querySelector('#scoreText').textContent = `Score: ${score}/${quiz.length}`;
  answers.innerHTML = '';
  feedback.textContent = score === quiz.length
    ? 'Clean sweep. You have the basic story: Base lowers friction, and BORF-style content can help people understand the ecosystem.'
    : 'Nice work. The main idea is simple: clear community education makes onchain exploration less confusing.';
  nextButton.textContent = 'Restart quiz';
  nextButton.disabled = false;
  nextButton.onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextButton.onclick = nextQuestion;
    renderQuestion();
  };
}

async function copyPageLink() {
  try {
    await navigator.clipboard.writeText(pageUrl());
    copyStatus.textContent = 'Page link copied.';
  } catch {
    copyStatus.textContent = 'Copy was not available in this browser. You can copy the URL from the address bar.';
  }
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
shareButtons.forEach((button) => button.addEventListener('click', openShareIntent));
copyButton.addEventListener('click', copyPageLink);
stepButtons.forEach((button) => button.addEventListener('click', () => setStep(Number(button.dataset.step))));
document.querySelector('#nextQuestion').addEventListener('click', nextQuestion);

setupReveal();
renderQuestion();
updateProgress();

const progressBar = document.querySelector('#progressBar');
const revealItems = document.querySelectorAll('.reveal');
const shareButtons = document.querySelectorAll('.share-x');
const copyButton = document.querySelector('#copyLink');
const copyStatus = document.querySelector('#copyStatus');
const fallbackUrl = 'https://hadestxt1.github.io/aphrodite/';
const shareText = 'A quiet essay about BORF, Base, and the value of clear community writing.';

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
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  revealItems.forEach((item) => observer.observe(item));
}

async function copyPageLink() {
  try {
    await navigator.clipboard.writeText(pageUrl());
    copyStatus.textContent = 'Link copied.';
  } catch {
    copyStatus.textContent = 'Copy was not available in this browser. Use the address bar instead.';
  }
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
shareButtons.forEach((button) => button.addEventListener('click', openShareIntent));
copyButton.addEventListener('click', copyPageLink);

setupReveal();
updateProgress();

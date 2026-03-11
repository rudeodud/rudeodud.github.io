/* ================================================
   BOS PORTFOLIO — main.js
   ================================================ */

/* ── 1. 네비게이션 스크롤 효과 & 활성화 ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], div[id]');

window.addEventListener('scroll', () => {
  // 스크롤 시 그림자
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // 현재 섹션 강조
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});


/* ── 2. 햄버거 메뉴 (모바일) ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// 메뉴 항목 클릭 시 닫기
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMenu.classList.remove('open'));
});


/* ── 3. Intersection Observer (fade-up 애니메이션) ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 카드들은 순서대로 딜레이
      entry.target.style.transitionDelay = (i * 80) + 'ms';
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// 기존 정적 요소에 적용
function applyFadeObserver() {
  document.querySelectorAll('.skill-tag, .career-list li, .portfolio-item').forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
  });
}


/* ── 4. projects.html fetch 로드 ── */
fetch('assets/components/projects.html')
  .then(res => {
    if (!res.ok) throw new Error('projects.html 로드 실패: ' + res.status);
    return res.text();
  })
  .then(html => {
    const container = document.getElementById('projects-container');
    container.innerHTML = html;

    // 새로 삽입된 카드에 Observer 등록
    container.querySelectorAll('.project-card.fade-up').forEach(card => {
      fadeObserver.observe(card);
    });
  })
  .catch(err => {
    console.warn(err);
    document.getElementById('projects-container').innerHTML =
      '<p class="projects-loading">프로젝트를 불러올 수 없습니다. (Live Server로 실행해주세요)</p>';
  });


/* ── 5. DOM 로드 후 정적 요소 관찰 시작 ── */
document.addEventListener('DOMContentLoaded', () => {
  applyFadeObserver();
});
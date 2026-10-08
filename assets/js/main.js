/* Re:af corporate site — main.js
   役割は3つだけ：①ヘッダーのスクロール時背景切替 ②スマホのハンバーガー ③社名横スクロールの停止（タップ）
   依存ライブラリなし。 */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var toggle = document.querySelector('.header__toggle');
  var nav = document.getElementById('nav');

  /* ① スクロール後に白背景＋下線 */
  function onScroll() {
    if (!header) { return; }
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ② ハンバーガー */
  function setOpen(open) {
    if (!header || !toggle) { return; }
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setOpen(!header.classList.contains('is-open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) { setOpen(false); }
    });
  }

  /* ③ 社名の横スクロール：タップで停止／再開（hover は CSS） */
  document.querySelectorAll('.marquee').forEach(function (m) {
    m.addEventListener('click', function () {
      m.classList.toggle('is-paused');
    });
  });
})();

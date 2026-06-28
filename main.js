// ===== GRECO club — shared behaviour =====

document.addEventListener('DOMContentLoaded', () => {

  /* Header scroll state */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if(!header) return;
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  /* Mobile nav */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  if(burger && navLinks){
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.15});
  revealEls.forEach((el,i) => { el.style.setProperty('--i', i % 8); io.observe(el); });

  /* Reduced motion respect */
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Generic modal open/close via data attributes */
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.querySelector(trigger.getAttribute('data-modal-target'));
      if(modal) modal.classList.add('open');
    });
  });
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => { if(e.target === backdrop) backdrop.classList.remove('open'); });
    backdrop.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => backdrop.classList.remove('open')));
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.lightbox.open').forEach(m => m.classList.remove('open'));
    }
  });

  /* Lightbox for gallery / about photos */
  const lightbox = document.querySelector('.lightbox');
  if(lightbox){
    const lbImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        const src = el.getAttribute('data-lightbox');
        lbImg.src = src;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });
    const lbClose = lightbox.querySelector('.lb-close');
    if(lbClose) lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
  }

  /* Gallery filters */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry .item');
  if(filterBtns.length){
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.getAttribute('data-filter');
        masonryItems.forEach(it => {
          it.style.display = (f === 'all' || it.getAttribute('data-cat') === f) ? '' : 'none';
        });
      });
    });
  }

  /* News articles inline */
  const newsCards = document.querySelectorAll('.news-card');
  const articleViews = document.querySelectorAll('.article-view');
  const newsList = document.querySelector('.news-list-wrap');
  newsCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = document.querySelector(card.getAttribute('data-article'));
      if(!target) return;
      if(newsList) newsList.style.display = 'none';
      articleViews.forEach(a => a.classList.remove('open'));
      target.classList.add('open');
      window.scrollTo({top: document.querySelector('.section-tight') ? document.querySelector('.page-hero').offsetHeight : 0, behavior:'smooth'});
    });
  });
  document.querySelectorAll('.article-view .back').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.article-view').forEach(a => a.classList.remove('open'));
      if(newsList) newsList.style.display = '';
    });
  });

  /* Group sign-up: reveal trainer contact choice */
  document.querySelectorAll('.group-signup').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.nextElementSibling;
      if(box && box.classList.contains('signup-reveal')){
        box.classList.toggle('shown');
      }
    });
  });

  /* Contact form (demo, no backend) */
  const form = document.querySelector('.feedback-form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2600);
    });
  }
});

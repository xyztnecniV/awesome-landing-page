// Interaction scripts: menu toggle, smooth scroll, reveal on scroll
(function(){
  'use strict';

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  navToggle.addEventListener('click', function(){
    nav.classList.toggle('open');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Ensure elements have reveal class
  ['.hero-title','.hero-sub','.card','.plan','.section-title'].forEach(selector=>{
    document.querySelectorAll(selector).forEach(el=>el.classList.add('reveal'));
  });

})();
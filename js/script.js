// js/script.js - interactivity for landing page
(function(){
  'use strict';

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');

  if(navToggle && primaryNav){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }

  // Smooth scroll for internal links
  document.addEventListener('click', function(e){
    const anchor = e.target.closest('a[href^="#"]');
    if(!anchor) return;
    const href = anchor.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // Close mobile nav when clicking an item
      if(primaryNav && primaryNav.classList.contains('open')){
        primaryNav.classList.remove('open');
        if(navToggle) navToggle.setAttribute('aria-expanded','false');
      }
    }
  });

  // Simple reveal on scroll (intersection observer)
  const reveals = document.querySelectorAll('.feature, .hero-inner, .cta-inner');
  if('IntersectionObserver' in window && reveals.length){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('reveal');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>obs.observe(r));
  }
})();

// Advanced interactions: menu toggle, reveal on scroll, lazy loading, form handling
(function(){
  'use strict';

  // Menu toggle for mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
    });
  }

  // IntersectionObserver for reveal animations
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.15});

  document.querySelectorAll('.feature-card, .plan, .testimonial, .stat, .hero-copy').forEach(el=>observer.observe(el));

  // Lazy load images using loading=lazy where possible, for SVG fallback we handle onload
  document.querySelectorAll('img').forEach(img=>{
    if('loading' in HTMLImageElement.prototype){
      img.setAttribute('loading','lazy');
    }
  });

  // Simple form handling with validation and microinteraction
  const form = document.querySelector('.cta-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const input = form.querySelector('input[name="email"]');
      const email = input.value.trim();
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
        input.animate([{transform:'translateY(0)'},{transform:'translateY(-6px)'},{transform:'translateY(0)'}],{duration:300});
        input.style.borderColor = 'rgba(255,100,100,0.9)';
        setTimeout(()=>input.style.borderColor='transparent',1000);
        return;
      }
      // Microinteraction: show success then reset
      const submitBtn = form.querySelector('button[type=submit]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłanie...';
      setTimeout(()=>{
        submitBtn.textContent = 'Wysłano ✔';
        submitBtn.style.background = 'linear-gradient(135deg,#06b6d4,#7c3aed)';
        setTimeout(()=>{
          submitBtn.disabled = false;
          submitBtn.textContent = 'Wypróbuj za darmo';
          form.reset();
        },1600);
      },900);
    });
  }

  // Keyboard accessibility for details summary
  document.querySelectorAll('details summary').forEach(s=>{
    s.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        s.parentElement.toggleAttribute('open');
      }
    });
  });

  // Dark mode toggle from prefers-color-scheme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(prefersDark) document.body.classList.add('dark');

})();

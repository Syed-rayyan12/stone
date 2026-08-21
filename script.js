/**
 * Stonemere Life Management - Enterprise Frontend Scripts
 * Traditional jQuery & Vanilla ES6+ interactions with GSAP enhancements
 */

$(document).ready(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. STICKY HEADER SHRINK & SCROLL STATE
  // ------------------------------------------------------------------------
  const $siteHeader = $('.site-header');

  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop();
    if (scrollPos > 40) {
      $siteHeader.addClass('is-scrolled');
    } else {
      $siteHeader.removeClass('is-scrolled');
    }
  });

  // ------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION TOGGLE
  // ------------------------------------------------------------------------
  const $mobileToggle = $('#mobileNavToggle');
  const $mainNav = $('#mainNav');

  $mobileToggle.on('click', function () {
    const isOpen = $mainNav.hasClass('is-open');
    if (isOpen) {
      $mainNav.removeClass('is-open');
      $(this).html('<i class="fa-solid fa-bars"></i>').attr('aria-expanded', 'false');
      $('body').css('overflow', '');
    } else {
      $mainNav.addClass('is-open');
      $(this).html('<i class="fa-solid fa-xmark"></i>').attr('aria-expanded', 'true');
      $('body').css('overflow', 'hidden');
    }
  });

  // Close mobile nav on link click
  $('.nav-link').on('click', function () {
    if ($(window).width() <= 768) {
      $mainNav.removeClass('is-open');
      $mobileToggle.html('<i class="fa-solid fa-bars"></i>').attr('aria-expanded', 'false');
      $('body').css('overflow', '');
    }
  });

  // ------------------------------------------------------------------------
  // 3. DUAL-ROUTE CONTACT & REFERRAL HUB TABS
  // ------------------------------------------------------------------------
  $('.hub-tab-btn').on('click', function () {
    const targetTab = $(this).data('tab');

    $('.hub-tab-btn').removeClass('active').attr('aria-selected', 'false');
    $(this).addClass('active').attr('aria-selected', 'true');

    $('.hub-tab-content').removeClass('active');
    $(`#tab-${targetTab}`).addClass('active');
  });

  // ------------------------------------------------------------------------
  // 4. ACCORDION / FAQ EXPANSION
  // ------------------------------------------------------------------------
  $('.accordion-trigger').on('click', function () {
    const $item = $(this).closest('.accordion-item');
    const $body = $item.find('.accordion-body');
    const isActive = $item.hasClass('active');

    // Close others in same accordion
    $item.siblings('.accordion-item').removeClass('active').find('.accordion-body').css('max-height', '0');

    if (isActive) {
      $item.removeClass('active');
      $body.css('max-height', '0');
    } else {
      $item.addClass('active');
      $body.css('max-height', $body.prop('scrollHeight') + 30 + 'px');
    }
  });

  // ------------------------------------------------------------------------
  // 5. CONSULTATION MODAL CONTROLS
  // ------------------------------------------------------------------------
  window.openConsultModal = function (topic) {
    const $modal = $('#consultModal');
    if (topic && $('#modalTopic').length) {
      $('#modalTopic').val(topic);
    }
    $modal.addClass('is-active');
    $('body').css('overflow', 'hidden');
  };

  window.closeConsultModal = function () {
    $('#consultModal').removeClass('is-active');
    $('body').css('overflow', '');
  };

  $(document).on('click', '.open-consult-trigger', function (e) {
    e.preventDefault();
    const topic = $(this).data('topic') || '';
    window.openConsultModal(topic);
  });

  $('.modal-close, .modal-overlay').on('click', function (e) {
    if (e.target === this) {
      window.closeConsultModal();
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeConsultModal();
    }
  });

  // ------------------------------------------------------------------------
  // 6. FORM SUBMISSION FEEDBACK HANDLERS
  // ------------------------------------------------------------------------
  $('#familyEnquiryForm, #referralForm, #modalConsultForm, #directContactForm').on('submit', function (e) {
    e.preventDefault();
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const originalText = $submitBtn.html();

    $submitBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Submitting Securely...');

    setTimeout(function () {
      $submitBtn.prop('disabled', false).html(originalText);
      
      const $feedback = $form.siblings('.form-feedback').length 
        ? $form.siblings('.form-feedback') 
        : $form.find('.form-feedback');

      $form.slideUp(300);
      $feedback.fadeIn(400);

      // Scroll to feedback gently
      $('html, body').animate({
        scrollTop: $feedback.offset().top - 120
      }, 400);
    }, 900);
  });

  // ------------------------------------------------------------------------
  // 7. INTERACTIVE 3D CARD TILT MICRO-INTERACTION (DESKTOP)
  // ------------------------------------------------------------------------
  if ($(window).width() > 992) {
    $('.service-card, .contrast-card, .pricing-card, .service-visual-card').on('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      $(this).css({
        transform: `perspective(1000px) rotateX(${deltaY * -2.5}deg) rotateY(${deltaX * 2.5}deg) translateY(-4px)`,
        transition: 'transform 0.08s ease-out'
      });
    }).on('mouseleave', function () {
      $(this).css({
        transform: '',
        transition: 'transform 0.4s ease-out'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. INTERACTIVE CASE STUDY TABS
  // ------------------------------------------------------------------------
  $('.case-tab-pill').on('click', function () {
    const targetCase = $(this).data('case');
    $('.case-tab-pill').removeClass('active');
    $(this).addClass('active');

    $('.case-panel').removeClass('active');
    $(`#case-${targetCase}`).addClass('active');
  });

  // ------------------------------------------------------------------------
  // 9. INTERACTIVE SITUATION ASSESSOR & SERVICE MATCHER
  // ------------------------------------------------------------------------
  const recommendations = {
    'dementia': {
      title: 'Dementia Home Preparation & Preservation Protocol',
      desc: 'Immediate sensory calming adaptations, fall hazard removal, and dignified keepsake cataloguing tailored to memory support.',
      route: '/dementia-home-prep.html',
      actionText: 'Explore Dementia Protocols'
    },
    'clearance': {
      title: 'Probate Estate Clearance & Valuables Inventory',
      desc: 'Accredited RICS valuation, itemised photographic asset logging, ethical clearance, and global shipping for executors.',
      route: '/house-clearance.html',
      actionText: 'Explore Clearance Workflows'
    },
    'crisis': {
      title: 'Rapid Crisis Life Coordination (Within 24–48 Hours)',
      desc: 'Direct deployment by Paul Harrison to coordinate hospital discharge, urgent property safety, and medical liaison.',
      route: '/contact.html',
      actionText: 'Request Urgent Triage'
    },
    'concierge': {
      title: 'Private Monthly Retainer (Gold / Platinum)',
      desc: 'Ongoing peace of mind with allocated monthly hours, weekly home visits, and 24/7 priority emergency dispatch.',
      route: '/pricing.html',
      actionText: 'View Retainer Memberships'
    }
  };

  $('.assessor-card-btn').on('click', function () {
    $('.assessor-card-btn').removeClass('selected');
    $(this).addClass('selected');

    const key = $(this).data('type');
    const rec = recommendations[key] || recommendations['crisis'];

    $('#assessorResultTitle').text(rec.title);
    $('#assessorResultDesc').text(rec.desc);
    $('#assessorActionLink').attr('href', rec.route).html(`<i class="fa-solid fa-arrow-right"></i> ${rec.actionText}`);
    
    $('#assessorResultBox').slideDown(300);
    
    // Auto-update consultation modal topic
    $('#modalTopic').val(`Assessor Match: ${rec.title}`);
  });

  // ------------------------------------------------------------------------
  // 10. ANIMATED STAT COUNTERS
  // ------------------------------------------------------------------------
  function animateCounters() {
    $('.counter-num').each(function () {
      const $this = $(this);
      if ($this.hasClass('counted')) return;

      const targetText = $this.text().trim();
      const numMatch = targetText.match(/\d+(\.\d+)?/);
      if (!numMatch) return;

      const targetVal = parseFloat(numMatch[0]);
      const prefix = targetText.startsWith('£') ? '£' : '';
      const suffix = targetText.replace(/^[£]?\d+(\.\d+)?/, '');

      $this.addClass('counted');

      let current = 0;
      const duration = 1500;
      const steps = 40;
      const increment = targetVal / steps;
      const intervalTime = duration / steps;

      const timer = setInterval(function () {
        current += increment;
        if (current >= targetVal) {
          clearInterval(timer);
          $this.text(prefix + (targetVal % 1 === 0 ? targetVal : targetVal.toFixed(1)) + suffix);
        } else {
          $this.text(prefix + (targetVal % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix);
        }
      }, intervalTime);
    });
  }

  // ------------------------------------------------------------------------
  // 11. SCROLL REVEAL & GSAP ANIMATIONS
  // ------------------------------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.querySelector('.counter-num') || entry.target.classList.contains('counter-box')) {
          animateCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll, .section-header, .contrast-card, .service-card, .service-visual-card, .pricing-card, .director-spotlight-card, .assessor-widget, .counter-box').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.15
    });

    gsap.from('.hero-visual-card', {
      opacity: 0,
      x: 30,
      duration: 1,
      ease: 'power2.out',
      delay: 0.3
    });
  }

  console.log('Stonemere Life Management website scripts initialized.');
});

/* ============================================================
   HariNext Global — interactions
   Vanilla JS, no dependencies. Every module guards for absence
   so a single file can serve every page.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Sticky header ---- */
  (function header() {
    var hdr = document.querySelector('.hdr');
    if (!hdr) return;
    var last = null;
    function onScroll() {
      var stuck = window.scrollY > 24;
      if (stuck !== last) {
        hdr.classList.toggle('is-stuck', stuck);
        last = stuck;
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---- 2. Mobile drawer ---- */
  (function drawer() {
    var burger = document.querySelector('.burger');
    var panel = document.querySelector('.drawer');
    if (!burger || !panel) return;

    var links = panel.querySelectorAll('.drawer__link');

    function setOpen(open) {
      burger.classList.toggle('is-open', open);
      panel.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      links.forEach(function (l, i) {
        l.style.transitionDelay = open ? (0.12 + i * 0.06) + 's' : '0s';
      });
    }

    burger.addEventListener('click', function () {
      setOpen(!panel.classList.contains('is-open'));
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 940 && panel.classList.contains('is-open')) setOpen(false);
    });
  })();

  /* ---- 3. Scroll reveal ---- */
  (function reveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el) {
      // stagger siblings that share a parent
      var stagger = el.getAttribute('data-stagger');
      if (stagger) el.style.setProperty('--d', (parseFloat(stagger) / 1000) + 's');
      io.observe(el);
    });
  })();

  /* ---- 4. Marquee: duplicate track for a seamless loop ---- */
  (function marquee() {
    document.querySelectorAll('.marquee').forEach(function (m) {
      var track = m.querySelector('.marquee__track');
      if (!track) return;
      var clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      m.appendChild(clone);
    });
  })();

  /* ---- 5. Accordion ---- */
  (function accordion() {
    var items = document.querySelectorAll('.acc__item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector('.acc__btn');
      var panel = item.querySelector('.acc__panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        // single-open behaviour
        items.forEach(function (other) {
          other.classList.remove('is-open');
          var b = other.querySelector('.acc__btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // open the first one by default
    var first = items[0];
    first.classList.add('is-open');
    var fb = first.querySelector('.acc__btn');
    if (fb) fb.setAttribute('aria-expanded', 'true');
  })();

  /* ---- 6. Count-up stats ---- */
  (function counters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var dur = 1400;
      var start = performance.now();
      var dec = (el.getAttribute('data-count').indexOf('.') > -1) ? 1 : 0;

      function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---- 7. Contact form ---------------------------------------
     No backend is wired up. This composes a mailto: draft so the
     form works the moment you open the site. To take submissions
     server-side, swap this for Formspree / Netlify Forms / your
     own endpoint — see README.md.
  ------------------------------------------------------------ */
  (function contactForm() {
    var form = document.querySelector('#enquiry');
    if (!form) return;

    var status = form.querySelector('.form__status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var services = data.getAll('service');

      var lines = [
        'Name:     ' + (data.get('name') || '—'),
        'Company:  ' + (data.get('company') || '—'),
        'Email:    ' + (data.get('email') || '—'),
        'Phone:    ' + (data.get('phone') || '—'),
        'Budget:   ' + (data.get('budget') || '—'),
        'Services: ' + (services.length ? services.join(', ') : '—'),
        '',
        'Project brief:',
        (data.get('brief') || '—')
      ];

      var to = form.getAttribute('data-mailto') || 'hello@harinextglobal.com';
      var subject = 'New enquiry — ' + (data.get('name') || 'Website form');
      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      if (status) {
        status.hidden = false;
        status.textContent = 'Opening your email app with the brief prefilled. If nothing happens, write to ' + to + ' directly.';
      }
    });
  })();

  /* ---- 8. Current year ---- */
  (function year() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  })();

})();

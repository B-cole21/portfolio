(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var navToggle = document.getElementById("navToggle");

  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  }

  function setActiveLink() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var sections = links
      .map(function (link) {
        var id = link.getAttribute("href");
        return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    var pos = window.scrollY + window.innerHeight / 3;
    var currentId = null;

    sections.forEach(function (section) {
      if (pos >= section.offsetTop) currentId = section.id;
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      var last = sections[sections.length - 1];
      if (last) currentId = last.id;
    }

    links.forEach(function (link) {
      var id = link.getAttribute("href");
      link.classList.toggle("active", id === "#" + currentId);
    });
  }

  function closeMenu() {
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      if (navToggle) {
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (navLinks) {
    navLinks.addEventListener("click", function (event) {
      if (event.target.classList.contains("nav-link")) closeMenu();
    });
  }

  window.addEventListener("scroll", function () {
    onScroll();
    setActiveLink();
  });
  onScroll();
  setActiveLink();

  document.getElementById("year").textContent = new Date().getFullYear();

  /* Typewriter for hero roles */
  var typeEl = document.getElementById("typeWriter");
  if (typeEl) {
    var roles = [
      "System Developer",
      "Full-stack Developer",
      "Photographer",
      "Video Editor",
      "Graphic Designer"
    ];
    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function type() {
      var role = roles[roleIndex];
      var current = role.substring(0, charIndex);

      if (deleting) {
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      } else {
        charIndex++;
        if (charIndex === role.length) deleting = true;
      }

      typeEl.innerHTML = current + '<span class="cursor">|</span>';
      setTimeout(type, deleting ? 40 : 90);
    }
    type();
  }

  /* Skill bars animate when visible */
  var skillFill = Array.prototype.slice.call(document.querySelectorAll(".skill-bar-fill"));
  var fillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute("data-width");
          fillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  skillFill.forEach(function (el) {
    fillObserver.observe(el);
  });

  /* Project screenshot switcher */
  Array.prototype.slice.call(document.querySelectorAll(".shot-thumbs")).forEach(function (thumbs) {
    var card = thumbs.closest(".project-card");
    var main = card && card.querySelector(".project-shot img");
    if (!main) return;
    thumbs.addEventListener("click", function (event) {
      var btn = event.target.closest("button");
      if (!btn) return;
      main.src = btn.getAttribute("data-src");
      Array.prototype.slice.call(thumbs.querySelectorAll("button")).forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
    });
  });

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll(".section-title, .about-card, .skill-card, .project-card, .timeline-card, .contact-card");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }
})();

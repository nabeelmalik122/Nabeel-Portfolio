document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Preloader
  // ==========================================
  const preloader = document.getElementById("preloader");
  const loadingPercent = document.getElementById("loadingPercent");
  const loadingMessage = document.getElementById("loadingMessage");
  const loadingFill = document.getElementById("loadingFill");
  const loadingMessages = [
    "Initializing portfolio experience...",
    "Loading creative direction...",
    "Preparing developer story...",
    "Finalizing the showcase...",
    "Almost ready to present...",
  ];

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 11) + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
    }

    const messageIndex = Math.min(
      Math.floor(progress / 20),
      loadingMessages.length - 1,
    );

    if (loadingPercent) {
      loadingPercent.textContent = `${progress}%`;
    }

    if (loadingMessage) {
      loadingMessage.textContent = loadingMessages[messageIndex];
    }

    if (loadingFill) {
      loadingFill.style.width = `${progress}%`;
    }

    if (progress >= 100) {
      setTimeout(() => {
        preloader.classList.add("fade-out");
        document.body.classList.remove("is-loading");
      }, 450);
    }
  }, 180);

  // ==========================================
  // 2. Custom Magnetic Cursor System
  // ==========================================
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth trail animation using requestAnimationFrame
  function animateCursor() {
    // Inner dot - responsive tracking
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Outer ring - trailing easing lag
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states expansion
  const interactiveElements = document.querySelectorAll(
    ".interactive, a, button, input, textarea, .filter-btn, .side-dot",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.add("cursor-hover");
      // Wait a moment or check if actually left
      document.body.classList.remove("cursor-hover");
    });
  });

  // Cursor Particle Trail (spawned on rapid movements)
  let lastParticleSpawn = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastParticleSpawn > 60) {
      // Limit spawning density
      createTrailParticle(e.clientX, e.clientY);
      lastParticleSpawn = now;
    }
  });

  function createTrailParticle(x, y) {
    // Don't create trail particles on mobile devices
    if (window.innerWidth <= 768) return;

    const particle = document.createElement("div");
    particle.className = "mouse-trail-particle";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 500);
  }

  // ==========================================
  // 3. Dynamic Scroll Progress & Navbar Effect
  // ==========================================
  const progressBar = document.getElementById("progressBar");
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    // Scroll progress bar
    const scrollTotal =
      document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal > 0) {
      const scrollPercent = (window.scrollY / scrollTotal) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Glassmorphism sticky navbar state
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top appearance
    if (window.scrollY > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  // Back to Top functionality
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ==========================================
  // 4. Mobile Navigation Menu Toggle
  // ==========================================
  const menuBtn = document.getElementById("menuBtn");
  const navLinksList = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinksList.classList.toggle("active");
    // Simple bar animation inside SVG if needed
  });

  // Close menu on click of nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksList.classList.remove("active");
    });
  });

  // ==========================================
  // 5. Hero Dynamic Typing Text
  // ==========================================
  const typingText = document.getElementById("typingText");
  const words = [
    "MERN Stack Developer",
    "Full Stack Developer",
    "Problem Solver",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingText) {
    typeEffect();
  }

  // ==========================================
  // 6. About / Personal Journey Timeline Print Resume Preview
  // ==========================================
  const previewResumeBtn = document.getElementById("previewResumeBtn");
  if (previewResumeBtn) {
    previewResumeBtn.addEventListener("click", () => {
      const resumeWindow = window.open("", "_blank");
      resumeWindow.document.write(`
        <html>
        <head>
          <title>Resume - Nabeel Muhammad</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #3d2d24; background: #faf6f0; line-height: 1.6; }
            h1 { color: #2b1b12; border-bottom: 2px solid #c08552; padding-bottom: 10px; margin-top: 0; }
            h2 { color: #8b5cf6; margin-top: 30px; }
            .meta { display: flex; gap: 40px; margin-bottom: 20px; font-weight: 500; color: #6e5a4f; }
            .timeline-item { margin-bottom: 20px; }
            .date { font-weight: bold; color: #c08552; }
            button { background: #c08552; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-bottom: 20px; }
            button:hover { background: #8b5cf6; }
            @media print { button { display: none; } }
          </style>
        </head>
        <body>
          <button onclick="window.print()">Print Resume / Save as PDF</button>
          <h1>Nabeel Muhammad</h1>
          <div class="meta">
            <span>Email: maliknabeelkhattak432@gmail.com</span>
            <span>Phone: +92 307 9009095</span>
            <span>Location: Nowshera, Pakistan</span>
          </div>
          <p><strong>Full Stack / MERN Stack Web Developer</strong>. Passionate about building modern, scalable web applications with beautiful UIs and powerful backends.</p>
          
          <h2>Education</h2>
          <div class="timeline-item">
            <div class="date">2021 – 2025</div>
            <strong>BS Computer Science</strong> - Abdul Wali Khan University Mardan (AWKUM SRH Pabbi Campus)
          </div>
          <div class="timeline-item">
            <div class="date">2019 – 2021</div>
            <strong>Intermediate (Pre-Engineering)</strong> - Cenna College Pabbi
          </div>
          <div class="timeline-item">
            <div class="date">2017 – 2019</div>
            <strong>Matriculation</strong> - Cenna Public School Pabbi
          </div>

          <h2>Experience</h2>
          <div class="timeline-item">
            <div class="date">2024 – Present</div>
            <strong>Full Stack Developer (Freelance / Remote)</strong>
            <p>Designing, coding, and maintaining robust client projects utilizing MongoDB, Node, React, and server-side templates.</p>
          </div>
          <div class="timeline-item">
            <div class="date">2023</div>
            <strong>Frontend Developer Intern</strong> - Tech Startup
            <p>Collaborated to implement beautiful UI components, reusable structures, and responsive layouts.</p>
          </div>
        </body>
        </html>
      `);
      resumeWindow.document.close();
    });
  }

  // ==========================================
  // 7. Click Ripple Effect for Buttons
  // ==========================================
  const buttons = document.querySelectorAll(".btn, .interactive-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ==========================================
  // 8. 3D Tilt Effect on Cards
  // ==========================================
  const cards = document.querySelectorAll(".project-card, .service-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Max ±8 degree rotation
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    });
  });

  // ==========================================
  // 9. Magnetic Button Effect
  // ==========================================
  const magneticBtns = document.querySelectorAll(".btn-primary, .social-icon");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Pull element up to 10px towards cursor
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.03)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // ==========================================
  // 10. Scroll Reveal Animations (Intersection Observer)
  // ==========================================
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  reveals.forEach((reveal) => {
    revealObserver.observe(reveal);
  });

  // Skill progress bars activation
  const skillSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".progress-bar-fill");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const targetPercent = bar.getAttribute("data-percent");
            bar.style.width = targetPercent;
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  if (skillSection) {
    skillsObserver.observe(skillSection);
  }

  // ==========================================
  // 11. Side Dot Navigation & Nav Highlight
  // ==========================================
  const sections = document.querySelectorAll("section");
  const sideDots = document.querySelectorAll(".side-dot");
  const navLinkItems = document.querySelectorAll(".nav-link");

  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute("id");

          // Highlight side dots
          sideDots.forEach((dot) => {
            if (dot.getAttribute("data-target") === `#${activeId}`) {
              dot.classList.add("active");
            } else {
              dot.classList.remove("active");
            }
          });

          // Highlight header nav links
          navLinkItems.forEach((link) => {
            if (link.getAttribute("href") === `#${activeId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-20% 0px -60% 0px", // Matches central viewpoint intersection
    },
  );

  sections.forEach((sec) => {
    activeSectionObserver.observe(sec);
  });

  // Dot Click scroll
  sideDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const targetId = dot.getAttribute("data-target");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ==========================================
  // 12. Counter Animation (Fun Stats)
  // ==========================================
  const statsSection = document.getElementById("stats");
  const counters = document.querySelectorAll(".counter");

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            const duration = 2000; // 2 seconds count-up duration
            const increment = target / (duration / 16); // ~60fps

            let count = 0;
            const updateCount = () => {
              count += increment;
              if (count < target) {
                counter.textContent =
                  Math.ceil(count) + (target > 5 ? "+" : "");
                requestAnimationFrame(updateCount);
              } else {
                counter.textContent = target + "+";
              }
            };
            updateCount();
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    },
  );

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 13. Testimonials Carousel Slider
  // ==========================================
  const track = document.getElementById("testimonialsTrack");
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("sliderDots");

  let currentSlideIndex = 0;

  // Create dot indicators
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `slider-dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => moveToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function moveToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots[currentSlideIndex].classList.remove("active");
    dots[index].classList.add("active");
    currentSlideIndex = index;
  }

  prevBtn.addEventListener("click", () => {
    let index = currentSlideIndex - 1;
    if (index < 0) index = slides.length - 1;
    moveToSlide(index);
  });

  nextBtn.addEventListener("click", () => {
    let index = currentSlideIndex + 1;
    if (index >= slides.length) index = 0;
    moveToSlide(index);
  });

  // Touch/Swipe support for Testimonials Carousel
  let startX = 0;
  let isSwiping = false;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      // Threshold
      if (diff > 0) {
        // Swipe Right -> Prev
        let index = currentSlideIndex - 1;
        if (index < 0) index = slides.length - 1;
        moveToSlide(index);
      } else {
        // Swipe Left -> Next
        let index = currentSlideIndex + 1;
        if (index >= slides.length) index = 0;
        moveToSlide(index);
      }
      isSwiping = false;
    }
  });

  // Autoplay Testimonials
  let testimonialsAutoplay = setInterval(() => {
    let index = currentSlideIndex + 1;
    if (index >= slides.length) index = 0;
    moveToSlide(index);
  }, 6000);

  track.addEventListener("mouseenter", () =>
    clearInterval(testimonialsAutoplay),
  );
  track.addEventListener("mouseleave", () => {
    testimonialsAutoplay = setInterval(() => {
      let index = currentSlideIndex + 1;
      if (index >= slides.length) index = 0;
      moveToSlide(index);
    }, 6000);
  });

  // ==========================================
  // 14. Projects Portfolio Category Filter
  // ==========================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Set active button style
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        // Custom animated fade filters
        if (filterVal === "all" || cardCategory === filterVal) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // ==========================================
  // 15. Form Submission & Custom Canvas Confetti
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const confettiCanvas = document.getElementById("confetti-canvas");
  const ctx = confettiCanvas.getContext("2d");

  let confettiParticles = [];
  let isConfettiRunning = false;

  // Resize confetti canvas
  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfettiCanvas);
  resizeConfettiCanvas();

  class ConfettiParticle {
    constructor() {
      this.x = Math.random() * confettiCanvas.width;
      this.y = Math.random() * -100 - 20;
      this.size = Math.random() * 8 + 4;
      this.color = `hsl(${Math.random() * 360}, 75%, 60%)`;
      this.speedY = Math.random() * 4 + 3;
      this.speedX = Math.random() * 3 - 1.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 4 - 2;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function startConfetti() {
    isConfettiRunning = true;
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
      confettiParticles.push(new ConfettiParticle());
    }
    animateConfetti();
  }

  function animateConfetti() {
    if (!isConfettiRunning) return;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let activeParticles = 0;
    confettiParticles.forEach((p) => {
      if (p.y < confettiCanvas.height) {
        p.update();
        p.draw();
        activeParticles++;
      }
    });

    if (activeParticles > 0) {
      requestAnimationFrame(animateConfetti);
    } else {
      isConfettiRunning = false;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // Handle Form Submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check basic validation
    const nameInput = document.getElementById("formName");
    const emailInput = document.getElementById("formEmail");
    const subjectInput = document.getElementById("formSubject");
    const messageInput = document.getElementById("formMessage");

    let isValid = true;
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        isValid = false;
      } else {
        input.style.borderColor = "";
      }
    });

    if (!isValid) {
      // Gentle vibration/shake animation
      contactForm.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" },
        ],
        {
          duration: 300,
          easing: "ease-in-out",
        },
      );
      return;
    }

    // Success action
    successModal.classList.add("active");
    startConfetti();
    contactForm.reset();
  });

  closeModalBtn.addEventListener("click", () => {
    successModal.classList.remove("active");
    isConfettiRunning = false;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  });

  // Dark/Light Theme Switching with Storage
  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Dynamic scale effect on click
    themeToggle.animate(
      [
        { transform: "scale(1) rotate(0deg)" },
        { transform: "scale(0.8) rotate(180deg)" },
        { transform: "scale(1.1) rotate(360deg)" },
        { transform: "scale(1) rotate(360deg)" },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
      },
    );
  });
});

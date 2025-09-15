// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Hide loading screen after a short delay
  setTimeout(function () {
    const loading = document.getElementById("loading");
    loading.classList.add("hidden");
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 1000);

  // Mobile menu functionality
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  mobileMenuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Change icon based on menu state
    const icon = this.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Smooth scrolling for navigation links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header background change on scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background =
        "linear-gradient(135deg, rgba(45,80,22,0.95) 0%, rgba(74,124,89,0.95) 100%)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background =
        "linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)";
      header.style.backdropFilter = "none";
    }
  });

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all product cards and other animated elements
  const animatedElements = document.querySelectorAll(
    ".product-card, .contact-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

  // Enhanced button hover effects
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Contact method click tracking (for analytics - optional)
  const contactButtons = document.querySelectorAll(".contact-card .btn");
  contactButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const method = this.textContent.includes("WhatsApp")
        ? "WhatsApp"
        : "Email";
      console.log(`User clicked: ${method} order button`);

      // Add a small success feedback
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Opening...';
      this.style.background = "linear-gradient(45deg, #4CAF50, #45a049)";

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = "";
      }, 2000);
    });
  });

  // Add typing effect to hero subtitle
  const heroSubtitle = document.querySelector(".hero-content p");
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = "";

  let charIndex = 0;
  function typeWriter() {
    if (charIndex < originalText.length) {
      heroSubtitle.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    }
  }

  // Start typing effect after hero animation
  setTimeout(typeWriter, 1500);

  // Add parallax effect to hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  });

  // Product card interaction enhancement
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(5deg)";
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0deg)";
    });
  });

  // Add click to call functionality for mobile
  if (window.innerWidth <= 768) {
    const phoneNumber = "+27123456789";
    const callButton = document.createElement("a");
    callButton.href = `tel:${phoneNumber}`;
    callButton.className = "btn btn-primary";
    callButton.innerHTML = '<i class="fas fa-phone"></i> Call Now';
    callButton.style.position = "fixed";
    callButton.style.bottom = "20px";
    callButton.style.right = "20px";
    callButton.style.zIndex = "1000";
    callButton.style.borderRadius = "50px";
    callButton.style.padding = "1rem";
    callButton.style.boxShadow = "0 4px 15px rgba(255,68,68,0.4)";

    document.body.appendChild(callButton);
  }

  // Add scroll-to-top button
  const scrollTopButton = document.createElement("button");
  scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopButton.className = "scroll-top-btn";
  scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff4444, #ff6666);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(255,68,68,0.4);
    `;

  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.opacity = "1";
      scrollTopButton.style.visibility = "visible";
    } else {
      scrollTopButton.style.opacity = "0";
      scrollTopButton.style.visibility = "hidden";
    }
  });

  document.body.appendChild(scrollTopButton);
});

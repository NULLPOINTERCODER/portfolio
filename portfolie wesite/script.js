// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    scrollToSection(targetId);
    
    // Close mobile menu if open
    document.querySelector('nav ul').classList.remove('active');
    document.querySelector('.mobile-menu-btn i').className = 'fas fa-bars';
  });
});

function scrollToSection(id) {
  const section = document.querySelector(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 70,
      behavior: 'smooth'
    });
  }
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
  
  // Scroll progress indicator
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = this.elements[0].value;
  const email = this.elements[1].value;
  const subject = this.elements[2].value;
  const message = this.elements[3].value;
  
  // Here you would typically send the data to a server
  console.log({ name, email, subject, message });
  
  // Show success message
  alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
  
  // Reset form
  this.reset();
});


const typewriterTexts = [
  "Full Stack Developer",
  "UI/UX Designer", 
  "Frontend Specialist",
  "Backend Engineer",
  "Problem Solver",
  "Tech Enthusiast"
];

let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;     // Typing speed per character
let deletingSpeed = 100;    // Deleting speed per character
let pauseDelay = 1500;     // Delay after full word is typed

function typeWriter() {
  const el = document.querySelector('.typewriter');
  const currentText = typewriterTexts[currentTextIndex];

  if (isDeleting) {
    el.textContent = currentText.substring(0, charIndex--);
  } else {
    el.textContent = currentText.substring(0, charIndex++);
  }

  let delay = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentText.length + 1) {
    isDeleting = true;
    delay = pauseDelay;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
    delay = 1000;
  }

  setTimeout(typeWriter, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  typeWriter(); // Call only once!
});



// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00ffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true, straight: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
  
  // Start typewriter effect
  typeWriter();
  
  // Initialize skill animations
  document.querySelectorAll('.skill-progress').forEach(progressBar => {
    const targetWidth = progressBar.style.width;
    progressBar.style.width = '0%';
    
    setTimeout(() => {
      progressBar.style.width = targetWidth;
      
      // Add percentage counter
      const percentSpan = progressBar.closest('.skill-item').querySelector('span:last-child');
      let currentPercent = 0;
      const targetPercent = parseInt(targetWidth);
      const counter = setInterval(() => {
        if (currentPercent >= targetPercent) {
          clearInterval(counter);
        } else {
          currentPercent++;
          percentSpan.textContent = currentPercent + '%';
        }
      }, 20);
    }, 500);
  });
});

// Project filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Update active button
    document.querySelector('.filter-btn.active').classList.remove('active');
    this.classList.add('active');
    
    // Filter projects
    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 3D tilt effect for project cards
// Alternative: More subtle hover effect
// document.querySelectorAll('.project-card').forEach(card => {
//   card.addEventListener('mousemove', (e) => {
//     const xAxis = (window.innerWidth / 2 - e.pageX) / 30; // Reduced from 15 to 30
//     const yAxis = (window.innerHeight / 2 - e.pageY) / 30; // Reduced from 15 to 30
//     card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   });

//   card.addEventListener('mouseenter', () => {
//     card.style.transition = 'transform 0.3s ease';
//   });

//   card.addEventListener('mouseleave', () => {
//     card.style.transition = 'transform 0.3s ease';
//     card.style.transform = 'rotateY(0deg) rotateX(0deg)';
//   });
// });

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(follower);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 100);
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});
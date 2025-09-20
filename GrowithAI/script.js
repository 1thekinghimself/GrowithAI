// Set current year
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Create floating particles
  function createParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      container.appendChild(particle);
    }
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function() {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
      }
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Animated counters
  function animateCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    counters.forEach(counter => {
      if (counter.dataset.target) {
        const target = parseInt(counter.dataset.target);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            // Handle different counter types
            if (target === 40 || target === 98) {
              counter.textContent = target + '%';
            } else {
              counter.textContent = target + '+';
            }
            clearInterval(timer);
          } else {
            if (target === 40 || target === 98) {
              counter.textContent = Math.floor(current) + '%';
            } else {
              counter.textContent = Math.floor(current) + '+';
            }
          }
        }, 20);
      }
    });
  }

  // Scroll animations
  function checkAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const isVisible = elementTop < window.innerHeight - 100;
      
      if (isVisible && !element.classList.contains('appear')) {
        element.classList.add('appear');
        
        // Trigger counter animation for stats section
        if (element.querySelector('.stats-counter')) {
          setTimeout(animateCounters, 300);
        }
      }
    });
  }

  // Chatbot functionality
  const chatResponses = {
    'how does ai lead generation work': "Our AI lead generation uses machine learning algorithms to analyze your target market, identify potential customers based on behavior patterns, and automatically engage them through personalized outreach campaigns. It can increase qualified leads by up to 150%!",
    "what's included in the growth plan": "The Growth plan includes everything in Starter plus AI-powered lead generation, smart analytics dashboard, basic predictive analysis, and priority support. It's perfect for scaling businesses looking to automate their growth processes.",
    'can you integrate with our existing tools': "Absolutely! We integrate with 500+ popular business tools including CRM systems, marketing platforms, and productivity apps. Our team handles the entire integration process to ensure seamless data flow.",
    'pricing': "We offer three flexible plans: Starter at $199/month for basic automation, Growth at $399/month for comprehensive AI solutions, and Scale at $999/month for enterprise-level features with dedicated support.",
    'default': "Thanks for your question! Our AI solutions are designed to transform businesses through intelligent automation, lead generation, and predictive analytics. We'd love to discuss your specific needs - would you like to schedule a free consultation?"
  };

  function addMessage(content, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    
    if (isUser) {
      messageDiv.className = 'flex justify-end mb-4';
      messageDiv.innerHTML = `
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl px-6 py-3 max-w-md">
          <p>${content}</p>
        </div>
      `;
    } else {
      messageDiv.className = 'chat-message';
      messageDiv.innerHTML = `
        <div class="flex items-start mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <i class="fas fa-robot text-white"></i>
          </div>
          <div class="glass-morphism rounded-2xl px-6 py-3 border border-gray-600 max-w-md">
            <p class="text-white">${content}</p>
          </div>
        </div>
      `;
      
      setTimeout(() => {
        messageDiv.classList.add('active');
      }, 100);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleChatMessage(message) {
    const lowerMessage = message.toLowerCase();
    let response = chatResponses.default;
    
    for (let key in chatResponses) {
      if (lowerMessage.includes(key)) {
        response = chatResponses[key];
        break;
      }
    }
    
    setTimeout(() => {
      addMessage(response);
    }, 1000);
  }

  // Chat input handling
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      const input = document.getElementById('chat-input');
      if (!input) return;
      
      const message = input.value.trim();
      
      if (message) {
        addMessage(message, true);
        input.value = '';
        handleChatMessage(message);
      }
    });
  }

  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
          sendBtn.click();
        }
      }
    });
  }

  // Demo question buttons
  document.querySelectorAll('.demo-question').forEach(button => {
    button.addEventListener('click', function() {
      const question = this.textContent;
      addMessage(question, true);
      handleChatMessage(question);
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Initialize
  createParticles();
  checkAnimations();
  window.addEventListener('scroll', checkAnimations);
});
import { config } from './config.js';

let selectedRating = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupStarRating();
  setupForm();
  setupExplainers();
});

function initializeApp() {
  // Apply configuration to DOM elements
  const elements = {
    businessName: document.getElementById('business-name'),
    headline: document.getElementById('headline'),
    subhead: document.getElementById('subhead'),
    submitBtn: document.getElementById('submit-btn'),
    logo: document.getElementById('logo')
  };

  if (elements.businessName) elements.businessName.textContent = config.businessName;
  if (elements.headline) elements.headline.textContent = config.texts.landingHeadline;
  if (elements.subhead) elements.subhead.textContent = config.texts.landingSubhead;
  if (elements.submitBtn) elements.submitBtn.textContent = config.texts.submitBtn;
  if (elements.logo) elements.logo.src = config.logoPath;

  // Configure lead capture
  const leadCaptureGroup = document.getElementById('lead-capture-group');
  const leadCaptureLabel = document.getElementById('lead-capture-label');
  
  if (leadCaptureGroup && leadCaptureLabel) {
    leadCaptureLabel.textContent = config.texts.leadCaptureLabel;
    
    // Hide lead capture if not in demo mode or disabled
    if (!config.leadCaptureUrl) {
      leadCaptureGroup.style.display = 'none';
    }
  }

  // Configure explainer texts
  const headlineExplainerText = document.getElementById('headline-explainer-text');
  const starExplainerText = document.getElementById('star-explainer-text');
  
  if (headlineExplainerText) headlineExplainerText.textContent = config.explainers.headline;
  if (starExplainerText) starExplainerText.textContent = config.explainers.starWidget;

  // Hide explainers if disabled
  if (!config.flags.showExplainers) {
    const explainers = document.querySelectorAll('.explainer-btn');
    explainers.forEach(btn => btn.style.display = 'none');
  }

  // Set CSS custom properties for theming
  document.documentElement.style.setProperty('--primary-color', config.primaryColor);
  
  // Update page title
  document.title = `${config.businessName} - Feedback`;
}

function setupStarRating() {
  const starContainer = document.getElementById('star-rating');
  if (!starContainer) return;

  const stars = starContainer.querySelectorAll('.star');
  const submitBtn = document.getElementById('submit-btn');

  stars.forEach((star, index) => {
    // Handle click events
    star.addEventListener('click', (e) => {
      e.preventDefault();
      const rating = parseInt(star.dataset.rating);
      selectRating(rating);
    });

    // Handle hover effects
    star.addEventListener('mouseenter', () => {
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating);
    });

    star.addEventListener('mouseleave', () => {
      highlightStars(selectedRating);
    });

    // Handle keyboard navigation
    star.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rating = parseInt(star.dataset.rating);
        selectRating(rating);
      }
    });
  });

  // Reset stars when mouse leaves container
  starContainer.addEventListener('mouseleave', () => {
    highlightStars(selectedRating);
  });

  function selectRating(rating) {
    selectedRating = rating;
    highlightStars(rating);
    
    // Enable submit button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.add('enabled');
    }
  }

  function highlightStars(rating) {
    stars.forEach((star, index) => {
      const starRating = index + 1;
      const starIcon = star.querySelector('.star-icon');
      
      if (starRating <= rating) {
        star.classList.add('filled');
        starIcon.setAttribute('fill', 'currentColor');
      } else {
        star.classList.remove('filled');
        starIcon.setAttribute('fill', 'none');
      }
    });
  }
}

function setupForm() {
  const form = document.getElementById('rating-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (selectedRating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const leadCapture = formData.get('leadCapture') === 'on';
    const honeypot = formData.get('_hp');
    
    // Store user data in sessionStorage for form prefilling
    sessionStorage.setItem('rr_name', name || '');
    sessionStorage.setItem('rr_email', email || '');
    sessionStorage.setItem('rr_rating', String(selectedRating || ''));
    
    // Handle lead capture (if enabled and checkbox is checked)
    if (leadCapture && config.leadCaptureUrl && !honeypot) {
      handleLeadCapture(name, email, selectedRating);
    }
    
    // FTC Compliant: Route based on rating but keep everything on same page
    if (selectedRating <= 3) {
      showApologyPanel();
    } else {
      showSuccessPanel();
    }
  });
}

// Handle lead capture submission via Vercel serverless function
async function handleLeadCapture(name, email, rating) {
  if (!config.leadCaptureUrl) return;
  
  const payload = {
    name: name || 'Anonymous',
    email: email || '',
    source: 'demo_rating',
    rating: rating,
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch(config.leadCaptureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('✅ Lead captured successfully');
    } else {
      console.log('⚠️ Lead capture returned non-200 status');
    }
  } catch (error) {
    // Silently fail - don't block user experience
    console.log('Lead capture failed:', error);
  }
}

// Setup explainer functionality
function setupExplainers() {
  if (!config.flags.showExplainers) return;
  
  const explainerButtons = document.querySelectorAll('.explainer-btn');
  const tooltips = document.querySelectorAll('.tooltip');
  
  explainerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const tooltipId = button.id.replace('-explainer', '-tooltip');
      const tooltip = document.getElementById(tooltipId);
      
      if (tooltip) {
        // Hide all other tooltips
        tooltips.forEach(t => t.classList.remove('visible'));
        
        // Show this tooltip
        tooltip.classList.add('visible');
        
        // Position tooltip near the button
        positionTooltip(tooltip, button);
      }
    });
  });
  
  // Close tooltip functionality
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tooltip-close')) {
      e.target.closest('.tooltip').classList.remove('visible');
    }
    
    // Close tooltips when clicking outside
    if (!e.target.closest('.explainer-btn') && !e.target.closest('.tooltip')) {
      tooltips.forEach(tooltip => tooltip.classList.remove('visible'));
    }
  });
  
  // Escape key to close tooltips
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      tooltips.forEach(tooltip => tooltip.classList.remove('visible'));
    }
  });
}

// Position tooltip relative to trigger button
function positionTooltip(tooltip, trigger) {
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Position to the right of the trigger, or left if no space
  let left = triggerRect.right + 10;
  let top = triggerRect.top;
  
  // Check if tooltip would go off-screen
  if (left + tooltipRect.width > window.innerWidth) {
    left = triggerRect.left - tooltipRect.width - 10;
  }
  
  // Ensure tooltip stays within viewport
  if (left < 10) left = 10;
  if (top + tooltipRect.height > window.innerHeight) {
    top = window.innerHeight - tooltipRect.height - 10;
  }
  if (top < 10) top = 10;
  
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

// FTC Compliant Panel Functions
function showApologyPanel() {
  const form = document.getElementById('rating-form');
  const apologyPanel = document.getElementById('apology-panel');
  
  if (form && apologyPanel) {
    // Hide the original form
    form.style.display = 'none';
    
    // Configure and show apology panel
    document.getElementById('apology-heading').textContent = config.texts.apologyHeading;
    document.getElementById('apology-blurb').textContent = config.texts.apologyBlurb;
    
    const apologyReviewBtn = document.getElementById('apology-public-review-btn');
    apologyReviewBtn.href = config.publicReviewUrl;
    
    // Handle demo redirect for apology panel
    if (config.publicReviewUrl === '#demo-redirect') {
      apologyReviewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showDemoRedirectMessage();
      });
    }
    
    // Show the panel
    apologyPanel.classList.remove('rr-apology-panel');
    apologyPanel.style.display = 'block';
    
    // Focus on the textarea for better UX
    const textarea = document.getElementById('feedback-textarea');
    if (textarea) {
      textarea.focus();
    }
    
    // Setup feedback submission
    setupApologyFeedback();
  }
}

function showSuccessPanel() {
  const form = document.getElementById('rating-form');
  const successPanel = document.getElementById('success-panel');
  
  if (form && successPanel) {
    // Hide the original form
    form.style.display = 'none';
    
    // Configure and show success panel
    document.getElementById('success-heading').textContent = config.texts.successHeading;
    document.getElementById('success-blurb').textContent = config.texts.successBlurb;
    document.getElementById('success-public-review-btn').href = config.publicReviewUrl;
    
    // Show the panel
    successPanel.classList.remove('rr-success-panel');
    successPanel.style.display = 'block';
    
    // Start countdown for auto-redirect
    startAutoRedirect();
  }
}

function setupApologyFeedback() {
  const sendFeedbackBtn = document.getElementById('send-feedback-btn');
  const textarea = document.getElementById('feedback-textarea');
  
  if (sendFeedbackBtn && textarea) {
    sendFeedbackBtn.addEventListener('click', () => {
      const feedback = textarea.value.trim();
      
      // Show success message
      sendFeedbackBtn.textContent = '✓ Feedback Sent';
      sendFeedbackBtn.disabled = true;
      sendFeedbackBtn.classList.add('btn-success');
      
      // Optional: You could send this feedback to your server here
      console.log('Private feedback:', feedback);
      
      // Re-enable after a few seconds for better UX
      setTimeout(() => {
        sendFeedbackBtn.textContent = 'Send Private Feedback';
        sendFeedbackBtn.disabled = false;
        sendFeedbackBtn.classList.remove('btn-success');
      }, 3000);
    });
  }
}

function startAutoRedirect() {
  const countdownEl = document.getElementById('countdown');
  let timeLeft = 3;
  
  const countdown = setInterval(() => {
    timeLeft--;
    if (countdownEl) {
      countdownEl.textContent = timeLeft;
    }
    
    if (timeLeft <= 0) {
      clearInterval(countdown);
      // For demo purposes, show a message instead of redirecting
      showDemoRedirectMessage();
    }
  }, 1000);
  
  // Allow user to click the button to skip countdown
  const reviewBtn = document.getElementById('success-public-review-btn');
  if (reviewBtn) {
    reviewBtn.addEventListener('click', (e) => {
      if (config.publicReviewUrl === '#demo-redirect') {
        e.preventDefault();
        clearInterval(countdown);
        showDemoRedirectMessage();
      } else {
        clearInterval(countdown);
      }
    });
  }
}

function showDemoRedirectMessage() {
  const successPanel = document.getElementById('success-panel');
  if (successPanel) {
    successPanel.innerHTML = `
      <div class="demo-redirect-message">
        <h2 class="panel-heading">Demo Complete!</h2>
        <p class="panel-text">In a real implementation, customers would now be redirected to your Google Reviews page or other review platform.</p>
        <p class="panel-text">This ensures FTC compliance by always providing access to public review platforms.</p>
        <div class="panel-actions">
          <button type="button" onclick="location.reload()" class="btn btn-primary">Try Again</button>
        </div>
      </div>
    `;
  }
}

// Utility functions for other pages
export function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-toast';
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

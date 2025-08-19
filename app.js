// Navigation functionality for Saul's Handyman Service
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons and pages
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    // Function to show a specific page
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('active');
        });
        
        // Show the selected page
        const targetPage = document.getElementById(pageId + '-page');
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
        }
        
        // Update navigation button states
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mark the current navigation button as active
        const activeButton = document.querySelector(`[data-page="${pageId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Scroll to top when switching pages
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Add click event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
        
        // Add keyboard navigation support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                if (pageId) {
                    showPage(pageId);
                }
            }
        });
    });
    
    // Ensure home page is shown by default
    showPage('home');
    
    // Handle SMS links specifically - prevent any interference
    const smsLinks = document.querySelectorAll('a[href^="sms:"]');
    smsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            // Let the browser handle the SMS link naturally
            const phoneNumber = '+18777804236';
            
            // Try different SMS formats for better compatibility
            if (navigator.userAgent.match(/iPhone/i)) {
                // iOS format
                window.location.href = `sms:${phoneNumber}&body=Hi, I'm interested in your handyman services. Could we discuss my project?`;
            } else if (navigator.userAgent.match(/Android/i)) {
                // Android format
                window.location.href = `sms:${phoneNumber}?body=Hi, I'm interested in your handyman services. Could we discuss my project?`;
            } else {
                // Generic format
                window.location.href = `sms:${phoneNumber}`;
            }
        });
    });
    
    // Handle phone links as backup
    const phoneLinks = document.querySelectorAll('.phone-link');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            // If it's not already an SMS link, make it one
            if (!this.href.startsWith('sms:')) {
                e.preventDefault();
                const phoneNumber = '+18777804236';
                if (navigator.userAgent.match(/iPhone/i)) {
                    window.location.href = `sms:${phoneNumber}&body=Hi, I'm interested in your handyman services. Could we discuss my project?`;
                } else if (navigator.userAgent.match(/Android/i)) {
                    window.location.href = `sms:${phoneNumber}?body=Hi, I'm interested in your handyman services. Could we discuss my project?`;
                } else {
                    window.location.href = `sms:${phoneNumber}`;
                }
            }
        });
    });
    
    // Handle all text/SMS buttons specifically
    const textButtons = document.querySelectorAll('.text-btn, .btn[href^="sms:"]');
    textButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const phoneNumber = '+18777804236';
            
            // Determine the message based on button text
            let message = 'Hi, I\'m interested in your handyman services. Could we discuss my project?';
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('roof')) {
                message = 'Hi, I\'m interested in roof repair services. Could we discuss my project?';
            } else if (buttonText.includes('tile')) {
                message = 'Hi, I\'m interested in tile installation services. Could we discuss my project?';
            } else if (buttonText.includes('cabinet')) {
                message = 'Hi, I\'m interested in cabinet installation services. Could we discuss my project?';
            } else if (buttonText.includes('pipe')) {
                message = 'Hi, I\'m interested in pipe repair services. Could we discuss my project?';
            } else if (buttonText.includes('quote')) {
                message = 'Hi, I\'d like to get a quote for handyman services. When would be a good time to discuss my project?';
            }
            
            // Try different SMS formats for better compatibility
            if (navigator.userAgent.match(/iPhone/i)) {
                window.location.href = `sms:${phoneNumber}&body=${encodeURIComponent(message)}`;
            } else if (navigator.userAgent.match(/Android/i)) {
                window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
            } else {
                window.location.href = `sms:${phoneNumber}`;
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Accessibility improvements
    navButtons.forEach(button => {
        const pageId = button.getAttribute('data-page');
        button.setAttribute('aria-label', `Navigate to ${pageId} page`);
        button.setAttribute('role', 'tab');
    });
    
    pages.forEach(page => {
        page.setAttribute('role', 'tabpanel');
    });
    
    // Handle keyboard navigation for better accessibility
    let currentNavIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('nav-btn')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                
                if (e.key === 'ArrowRight') {
                    currentNavIndex = (currentNavIndex + 1) % navButtons.length;
                } else {
                    currentNavIndex = (currentNavIndex - 1 + navButtons.length) % navButtons.length;
                }
                
                navButtons[currentNavIndex].focus();
            }
        }
    });
    
    // Update current nav index when buttons are clicked
    navButtons.forEach((button, index) => {
        button.addEventListener('focus', function() {
            currentNavIndex = index;
        });
    });
    
    // Add visual feedback for button interactions
    const allInteractiveElements = document.querySelectorAll('.btn, .nav-btn, .text-btn, .phone-link');
    allInteractiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Debug logging
    console.log('Saul\'s Handyman Service website loaded successfully');
    console.log('Navigation buttons found:', navButtons.length);
    console.log('Pages found:', pages.length);
    console.log('SMS links found:', smsLinks.length);
});
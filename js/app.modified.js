// Additional terminal functionality and interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Extra functionality beyond the console.js core
    
    // Time display functionality
    const localTimeDisplay = document.getElementById('local-time');
    const eatTimeDisplay = document.getElementById('eat-time');
    
    function updateTime() {
        // Get current local time
        const now = new Date();
        
        // Format local time
        const localTimeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        // Calculate EAT (UTC+3) time
        const eatOptions = { 
            timeZone: 'Africa/Nairobi',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        };
        const eatTimeStr = now.toLocaleTimeString('en-US', eatOptions);
        
        // Update the time displays
        localTimeDisplay.textContent = localTimeStr;
        eatTimeDisplay.textContent = eatTimeStr;
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

    // 1. Enable drag functionality for the terminal container (for a more desktop-like experience)
    const terminalHeader = document.querySelector('.terminal-header');
    const terminalContainer = document.querySelector('.terminal-container');
    
    let isDragging = false;
    let offsetX, offsetY;
    
    // Only apply dragging on larger screens
    if (window.innerWidth > 768) {
        terminalHeader.addEventListener('mousedown', (e) => {
            // Prevent drag on window controls
            if (e.target.closest('.window-controls') || e.target.closest('.theme-toggle')) return;
            
            isDragging = true;
            offsetX = e.clientX - terminalContainer.getBoundingClientRect().left;
            offsetY = e.clientY - terminalContainer.getBoundingClientRect().top;
            
            terminalContainer.style.transition = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            // Keep the terminal within viewport bounds
            const maxX = window.innerWidth - terminalContainer.offsetWidth;
            const maxY = window.innerHeight - terminalContainer.offsetHeight;
            
            const boundedX = Math.max(0, Math.min(x, maxX));
            const boundedY = Math.max(0, Math.min(y, maxY));
            
            terminalContainer.style.position = 'absolute';
            terminalContainer.style.left = boundedX + 'px';
            terminalContainer.style.top = boundedY + 'px';
            terminalContainer.style.margin = '0';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            terminalContainer.style.transition = 'box-shadow 0.3s ease';
        });
    }
    
    // 2. Create a maximize/minimize functionality
    const maximizeBtn = document.querySelector('.control.maximize');
    let isMaximized = false;
    let prevDimensions = {};
    
    maximizeBtn.addEventListener('click', () => {
        if (!isMaximized) {
            // Save current dimensions and position
            prevDimensions = {
                width: terminalContainer.style.width,
                height: terminalContainer.style.height,
                top: terminalContainer.style.top,
                left: terminalContainer.style.left,
                borderRadius: terminalContainer.style.borderRadius
            };
            
            // Maximize
            terminalContainer.style.position = 'fixed';
            terminalContainer.style.top = '0';
            terminalContainer.style.left = '0';
            terminalContainer.style.width = '100%';
            terminalContainer.style.height = '100%';
            terminalContainer.style.borderRadius = '0';
            terminalContainer.style.maxWidth = 'none';
            
            isMaximized = true;
        } else {
            // Restore previous dimensions
            Object.keys(prevDimensions).forEach(key => {
                terminalContainer.style[key] = prevDimensions[key];
            });
            
            // If no previous position (never dragged), restore to center
            if (!prevDimensions.top) {
                terminalContainer.style.position = '';
                terminalContainer.style.top = '';
                terminalContainer.style.left = '';
                terminalContainer.style.width = '';
                terminalContainer.style.height = '';
                terminalContainer.style.maxWidth = '';
            }
            
            isMaximized = false;
        }
    });
    
    // 3. Minimize functionality (just a visual effect)
    const minimizeBtn = document.querySelector('.control.minimize');
    let isMinimized = false;
    
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            terminalContainer.style.transform = 'scale(0.1)';
            terminalContainer.style.opacity = '0';
            
            setTimeout(() => {
                terminalContainer.style.transform = 'scale(1)';
                terminalContainer.style.opacity = '1';
            }, 1000);
        }
    });
    
    // 4. Allow terminal commands to be clicked from output history
    document.querySelector('.terminal-content').addEventListener('click', (e) => {
        const cmdElement = e.target.closest('.command-input');
        if (cmdElement) {
            // Skip the command if clicking on the timestamp or prompt parts
            if (e.target.classList.contains('timestamp') || 
                e.target.classList.contains('cmd-prompt') ||
                e.target.closest('.cmd-prompt')) return;
            
            // Extract command by removing timestamp and prompt
            const fullText = cmdElement.textContent;
            const commandPart = fullText.replace(/^\[.*\].*\$\s*/, '').trim();
            
            if (commandPart && window.terminal) {
                document.getElementById('terminal-input').value = commandPart;
                document.getElementById('terminal-input').focus();
                
                // Hide any suggestions that might be open
                if (window.terminal.hideSuggestions) {
                    window.terminal.hideSuggestions();
                }
            }
        }
    });
    
    // 5. Easter Egg functionality (type "matrix" to trigger a matrix effect)
    const originalProcessCommand = TerminalConsole.prototype.processCommand;
    
    TerminalConsole.prototype.processCommand = function(command) {
        const trimmedCommand = command.trim().toLowerCase();
        
        if (trimmedCommand === 'matrix') {
            // First, call the original to print the command
            originalProcessCommand.call(this, command);
            // Then show the matrix effect
            this.showMatrixEffect();
            return;
        }
        
        // Call the original method for normal operation
        return originalProcessCommand.call(this, command);
    };
    
    // Matrix effect easter egg
    TerminalConsole.prototype.showMatrixEffect = function() {
        this.addLine('Entering the Matrix...', 'highlight-text');
        
        // Create matrix canvas
        const canvas = document.createElement('canvas');
        canvas.width = this.content.offsetWidth;
        canvas.height = 300;
        canvas.style.marginBottom = '16px';
        this.content.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Matrix characters
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$&+,:;=?@#|<>!%(){}[]^~-_*/\\'.split('');
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        // Array of drops - one per column
        const drops = [];
        
        // Initialize all drops at random positions
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
        
        // Draw the matrix
        const matrix = () => {
            // Black with opacity to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Green text
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            // Loop over each drop
            for (let i = 0; i < drops.length; i++) {
                // Get random character
                const text = characters[Math.floor(Math.random() * characters.length)];
                
                // x = i*fontSize, y = value of drops[i]*fontSize
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Randomly reset drops back to top
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move drops down
                drops[i]++;
            }
        };
        
        // Timer for the matrix animation
        const matrixTimer = setInterval(matrix, 33);
        
        // Stop after 5 seconds
        setTimeout(() => {
            clearInterval(matrixTimer);
            this.addLine('Matrix mode deactivated. Back to reality.', 'warning-text');
        }, 5000);
        
        this.scrollToBottom();
    };
    
    // 6. Add Intersection Observer for scroll animations
    // Setup intersection observer for scroll animations
    setTimeout(() => {
        const setupScrollAnimations = () => {
            // Target elements to observe
            const sections = [
                '.skills-container',
                '.projects-container',
                '.work-experience-container',
                '.education-container',
                '.contact-container',
                '.status-container'
            ];
            
            // Options for the observer
            const observerOptions = {
                root: document.querySelector('.terminal-content'),
                rootMargin: '0px',
                threshold: 0.1
            };
            
            // Callback for intersection changes
            const intersectionCallback = (entries, observer) => {
                entries.forEach(entry => {
                    // Get all child elements for animation
                    const children = entry.target.querySelectorAll('.skill-category, .project, .work-item, .education-item, .contact-item, .status-item');
                    
                    if (entry.isIntersecting) {
                        // When entering viewport
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Animate children if they exist
                        children.forEach(child => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateX(0)';
                        });
                    } else {
                        // When exiting viewport (only if scrolled above)
                        if (entry.boundingClientRect.y > 0) {
                            entry.target.style.opacity = '0.5';
                            entry.target.style.transform = 'translateY(20px)';
                            
                            // Fade out children if they exist
                            children.forEach(child => {
                                child.style.opacity = '0.5';
                                child.style.transform = 'translateX(-10px)';
                            });
                        }
                    }
                });
            };
            
            // Create observer
            const observer = new IntersectionObserver(intersectionCallback, observerOptions);
            
            // Start observing elements as they're added
            const observeNewSections = () => {
                sections.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        // Add transition styles
                        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        observer.observe(el);
                    });
                });
            };
            
            // Initial observe
            observeNewSections();
            
            // Also add a mutation observer to detect when new sections are added
            const contentObserver = new MutationObserver(() => {
                observeNewSections();
            });
            
            // Start observing terminal content for changes
            contentObserver.observe(document.querySelector('.terminal-content'), {
                childList: true,
                subtree: true
            });
        };
        
        // Setup scroll animations after a delay to ensure DOM is ready
        setupScrollAnimations();
    }, 1000);
    
    // Footer links setup - simplified with no typing animation
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Simple hover state management
    footerLinks.forEach(link => {
        const textElement = link.querySelector('.footer-text');
        if (textElement) {
            // Store original text for accessibility
            const originalText = textElement.textContent;
            textElement.setAttribute('aria-label', originalText);
        }
    });

    // Simple hover effect for mobile devices via class toggle
    if ('ontouchstart' in window) {
        footerLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.classList.add('hover');
                setTimeout(() => {
                    link.classList.remove('hover');
                }, 2000); // Keep expanded for 2 seconds on touch devices
            });
        });
    }
    
    // Ensure the footer is always visible
    const footer = document.querySelector('.terminal-footer');
    if (footer) {
        // Force visibility
        footer.style.opacity = '1';
        footer.style.visibility = 'visible';
    }
    
    // Create a global reference for easy callbacks
    window.terminal = document.querySelector('.terminal-content');
});

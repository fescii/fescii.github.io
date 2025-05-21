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
            terminalContainer.style.width = '100%';
            terminalContainer.style.height = '100%';
            terminalContainer.style.top = '0';
            terminalContainer.style.left = '0';
            terminalContainer.style.borderRadius = '0';
        } else {
            // Restore previous dimensions and position
            terminalContainer.style.width = prevDimensions.width || '80%';
            terminalContainer.style.height = prevDimensions.height || '80%';
            terminalContainer.style.top = prevDimensions.top || '50%';
            terminalContainer.style.left = prevDimensions.left || '50%';
            terminalContainer.style.borderRadius = prevDimensions.borderRadius || '8px';
        }
        
        isMaximized = !isMaximized;
    });
    
    // 3. Handle minimize functionality
    const minimizeBtn = document.querySelector('.control.minimize');
    let isMinimized = false;
    let terminalHeight;
    
    minimizeBtn.addEventListener('click', () => {
        if (!isMinimized) {
            terminalHeight = terminalContainer.style.height;
            terminalContainer.style.height = '30px';
            document.querySelector('.terminal-body').style.display = 'none';
            document.querySelector('.terminal-footer').style.display = 'none';
        } else {
            terminalContainer.style.height = terminalHeight || '80%';
            document.querySelector('.terminal-body').style.display = '';
            document.querySelector('.terminal-footer').style.display = '';
        }
        
        isMinimized = !isMinimized;
    });
    
    // 4. Handle close button
    const closeBtn = document.querySelector('.control.close');
    closeBtn.addEventListener('click', () => {
        terminalContainer.style.opacity = '0';
        setTimeout(() => {
            terminalContainer.style.display = 'none';
        }, 500);
    });
    
    // 5. Theme toggle functionality (light/dark mode)
    // This can be expanded in the future with more themes
    const themeToggle = document.createElement('div');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    
    // Insert theme toggle before the time display
    const timeDisplay = document.querySelector('.time-display');
    terminalHeader.insertBefore(themeToggle, timeDisplay);
    
    let isDarkMode = true;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        isDarkMode = !isDarkMode;
        themeToggle.innerHTML = isDarkMode ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
    });
});
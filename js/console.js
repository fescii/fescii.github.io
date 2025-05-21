// Terminal functionality
class TerminalConsole {
    constructor() {
        this.content = document.querySelector('.terminal-content');
        this.input = document.getElementById('terminal-input');
        this.prompt = document.querySelector('.prompt');
        this.suggestionsList = document.getElementById('autocomplete-suggestions');
        this.cmdHistory = this.loadCommandHistory();
        this.historyCursor = this.cmdHistory.length;
        this.currentSuggestions = [];
        this.selectedSuggestion = -1;
        this.commandsData = {
            '--help': { description: 'Show available commands' },
            '--about': { description: 'Show about information' },
            '--skills': { description: 'List technical skills' },
            '--work': { description: 'Show work experience' },
            '--projects': { description: 'Show projects' },
            '--education': { description: 'Show education' },
            '--contact': { description: 'Display contact information' },
            '--support': { description: 'Show ways to support my work' },
            '--clear': { description: 'Clear terminal screen' },
            '--status': { description: 'Show system status' },
            '--exit': { description: 'Exit terminal' },
        };

        // User data for the portfolio
        this.userData = {
            name: 'Fredrick Ochieng',
            title: 'Software & AI Developer',
            address: 'Prison Road, Off Kitengela Hwy, Kajiado County, Kenya',
            phone: '+254 713 253 018',
            email: 'isfescii@gmail.com',
            profile: 'Software & AI Developer with 3+ years designing scalable RESTful APIs and integrating AI/ML services. Spearheaded backend work that improved lead-qualification throughput by 60% and reduced response latency by 40%.',
            experience: [
                {
                    title: 'Contract Software Engineer',
                    company: 'Stahla.com (AI SDR)',
                    location: 'Remote',
                    period: 'Apr 2025 – Apr 2025',
                    description: [
                        'Developed FastAPI endpoints automating lead intake and qualification, boosting SDR throughput by 60%.',
                        'Integrated Bland.ai voice and Marvin AI classification services to handle 3 webhook channels (form, email, voice).',
                        'Orchestrated HubSpot data sync and scoped an in-app pricing engine, cutting average quote turnaround by 25%.'
                    ]
                },
                {
                    title: 'Software Engineer',
                    company: 'The Alcohesion (VPU)',
                    location: 'Remote/Kenya',
                    period: '2024 – Mar 2025',
                    description: [
                        'Architected core Django/FastAPI modules (Membership, EAC Wallet), ensuring secure, scalable operations for 1K+ users.',
                        'Collaborated with product and design teams to translate whitepaper workflows into automated backend processes.',
                        'Optimized database queries—reduced average transaction time by 35%.'
                    ]
                },
                {
                    title: 'Founder & Lead Developer',
                    company: 'aduki, Inc.',
                    location: 'Kitengela, Kenya',
                    period: 'Jan 2022 – Present',
                    description: [
                        'Designed and maintained Express.js/Django/Actix APIs supporting AI features for 500+ monthly active users.',
                        'Leveraged Python data pipelines to prepare training sets, improving model accuracy by 15%.'
                    ]
                }
            ],
            skills: {
                'Languages': [
                    { name: 'Python', level: 'Professional' },
                    { name: 'Rust', level: 'Basic' },
                    { name: 'JavaScript', level: 'Intermediate' },
                    { name: 'PHP', level: 'Intermediate' },
                    { name: 'Kotlin', level: 'Intermediate' },
                    { name: 'C++', level: 'Occasionally' }
                ],
                'Frontend Developer': [
                    { name: 'HTML', level: 'Just Enough' },
                    { name: 'CSS', level: 'Advanced' },
                    { name: 'JavaScript', level: 'Intermediate' },
                    { name: 'Bootstrap', level: 'Intermediate' },
                    { name: 'Web Components', level: 'Professional' },
                    { name: 'React', level: 'Intermediate' }
                ],
                'Backend Developer': [
                    { name: 'Django', level: 'Just Enough' },
                    { name: 'Express JS', level: 'Intermediate' },
                    { name: 'Actix', level: 'Intermediate' },
                    { name: 'Docker', level: 'Intermediate' },
                    { name: 'Memcache', level: 'Intermediate' },
                    { name: 'Nginx', level: 'Intermediate' }
                ],
                'Databases': [
                    { name: 'Postgres', level: 'Intermediate' },
                    { name: 'MongoDB', level: 'Intermediate' },
                    { name: 'MySQL', level: 'Intermediate' },
                    { name: 'Redis', level: 'Intermediate' },
                    { name: 'Client Indexed DB', level: 'Intermediate' }
                ],
                'Frameworks/Tools': [
                    { name: 'FastAPI', level: 'Professional' },
                    { name: 'Django', level: 'Intermediate' },
                    { name: 'Express.js', level: 'Intermediate' },
                    { name: 'Docker', level: 'Intermediate' },
                    { name: 'n8n', level: 'Intermediate' }
                ],
                'Data & AI': [
                    { name: 'Pandas', level: 'Professional' },
                    { name: 'ML & AI-API Integration', level: 'Professional' }
                ]
            },
            education: [
                {
                    degree: 'BSc, Computer Science',
                    institution: 'The East African University',
                    period: '2020 – 2024'
                },
                {
                    degree: 'Data Science Cert.',
                    institution: 'DataCamp',
                    period: '2021 – 2022'
                }
            ],
            projects: [
                {
                    title: 'Zoanai Platform',
                    description: 'Built PWA with offline support; architected backend for future AI-powered content recommendations.'
                },
                {
                    title: 'Credit Approval Predictor',
                    description: 'Compared classification models on real-world data; documented an end-to-end ML pipeline.'
                },
                {
                    title: 'Colink',
                    description: 'Developed a Git-integrated document authoring tool, used by 50+ users for version control.'
                }
            ],
            services: [
                {
                    title: 'Backend Developer',
                    description: 'I build robust, secure and scalable backend systems using modern technologies.'
                },
                {
                    title: 'UI/UX Designer',
                    description: 'I create beautiful user interfaces with a focus on user experience and accessibility.'
                },
                {
                    title: 'Python Developer',
                    description: 'Professional Python development including AI/ML integration, data processing and web applications.'
                }
            ],
            stats: {
                experience: '3+ Years',
                projects: '10+ Projects',
                support: 'Online 24/7'
            },
            contact: {
                email: 'isfescii@gmail.com',
                phone: '+254 713 253 018',
                github: 'github.com/fescii',
                linkedin: 'linkedin.com/in/fescii'
            }
        };

        this.init();
    }

    init() {
        // Setup event listeners
        this.input.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.input.addEventListener('input', this.handleInput.bind(this));
        document.addEventListener('click', (e) => {
            // Close suggestions if clicking outside
            if (!e.target.closest('.autocomplete-suggestions') && !e.target.closest('#terminal-input')) {
                this.hideSuggestions();
            }
            this.input.focus();
        });
        
        // Setup custom cursor
        this.setupCursor();
        
        // Window controls (for effect)
        const closeBtn = document.querySelector('.control.close');
        closeBtn.addEventListener('click', this.showCloseMessage.bind(this));
        
        // Show welcome message
        this.showWelcomeMessage();
        
        // Make the terminal globally accessible for app.js integration
        window.terminal = this;
    }
    
    setupCursor() {
        // Create cursor element (horizontal line)
        const cursor = document.createElement('div');
        cursor.className = 'terminal-cursor';
        
        // Create info tooltip element
        const cursorInfo = document.createElement('div');
        cursorInfo.className = 'terminal-cursor-info';
        
        // Add cursor and info element after input wrapper
        const inputWrapper = this.input.parentElement;
        inputWrapper.appendChild(cursor);
        inputWrapper.appendChild(cursorInfo);
        
        // Store cursor elements for later access
        this.cursor = cursor;
        this.cursorInfo = cursorInfo;
        
        // Position cursor at current input position
        this.updateCursorPosition();
        
        // Listen for input changes to reposition cursor
        this.input.addEventListener('input', () => {
            this.updateCursorPosition();
        });
        
        // Update cursor width based on next character
        this.input.addEventListener('keydown', (e) => {
            if (e.key.length === 1) {
                cursor.style.width = '8px'; // Wider when typing
            }
            this.updateCursorPosition();
        });
        
        // Animated command suggestions that change during blinking
        const commandTips = [
            { text: "try '--help' for commands", color: "var(--cmd-command)" },
            { text: "use arrow keys to navigate history", color: "var(--cmd-highlight)" },
            { text: "type '--skills' to see my skills", color: "#55efc4" },
            { text: "use Tab to autocomplete commands", color: "#fd79a8" },
            { text: "try '--support' to help me out", color: "#ffbb33" },
            { text: "use '--clear' to reset the terminal", color: "#74b9ff" }
        ];
        
        let tipIndex = 0;
        
        // Combined blink and tip animation
        setInterval(() => {
            const isVisible = cursor.style.opacity !== '0';
            
            if (isVisible) {
                cursor.style.opacity = '0';
                cursorInfo.style.opacity = '0';
                cursorInfo.style.transform = 'translateY(5px)';
                
                // Update to next tip
                tipIndex = (tipIndex + 1) % commandTips.length;
                const tip = commandTips[tipIndex];
                cursorInfo.textContent = tip.text;
                cursorInfo.style.color = tip.color;
                
            } else {
                cursor.style.opacity = '1';
                cursorInfo.style.opacity = '0.8';
                cursorInfo.style.transform = 'translateY(0)';
                
                // Update cursor width back to normal when blinking back
                cursor.style.width = '10px';
            }
        }, 800);
    }
    
    updateCursorPosition() {
        if (!this.cursor || !this.input) return;
        
        // Get cursor position based on input value and caret position
        const inputValue = this.input.value;
        const cursorPosition = this.input.selectionStart;
        const textBeforeCursor = inputValue.substring(0, cursorPosition);
        
        // Create a temporary span to measure text width
        const temp = document.createElement('span');
        temp.style.font = getComputedStyle(this.input).font;
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        temp.textContent = textBeforeCursor;
        document.body.appendChild(temp);
        
        // Position cursor and info at the calculated position
        const inputRect = this.input.getBoundingClientRect();
        const textWidth = temp.getBoundingClientRect().width;
        
        this.cursor.style.left = `${textWidth + 4}px`;
        this.cursorInfo.style.left = `${textWidth}px`;
        
        // Clean up
        document.body.removeChild(temp);
    }
    
    loadCommandHistory() {
        try {
            const savedHistory = localStorage.getItem('terminal_history');
            return savedHistory ? JSON.parse(savedHistory) : [];
        } catch (error) {
            console.error('Failed to load command history:', error);
            return [];
        }
    }
    
    saveCommandHistory() {
        try {
            // Keep only the last 50 commands to avoid excessive storage
            const trimmedHistory = this.cmdHistory.slice(-50);
            localStorage.setItem('terminal_history', JSON.stringify(trimmedHistory));
        } catch (error) {
            console.error('Failed to save command history:', error);
        }
    }

    // Theme toggle removed - using only dark theme

    showCloseMessage() {
        this.addLine('Use the --exit command to close the terminal.', 'warning-text');
    }

    handleKeyPress(e) {
        // Handle tab completion
        if (e.key === 'Tab') {
            e.preventDefault();
            if (this.currentSuggestions.length > 0) {
                this.input.value = this.currentSuggestions[0].command;
                this.hideSuggestions();
            }
            return;
        }
        
        // Handle suggestion navigation
        if (this.suggestionsList.style.display === 'block') {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateSuggestion(1);
                return;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSuggestion(-1);
                return;
            } else if (e.key === 'Enter' && this.selectedSuggestion >= 0) {
                e.preventDefault();
                this.selectSuggestion(this.selectedSuggestion);
                return;
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.hideSuggestions();
                return;
            }
        }
        
        // Normal command handling
        if (e.key === 'Enter') {
            const command = this.input.value.trim();
            this.processCommand(command);
            this.input.value = '';
            this.hideSuggestions();
            
            // Add to history if not empty and not a duplicate of the last command
            if (command && (this.cmdHistory.length === 0 || this.cmdHistory[this.cmdHistory.length - 1] !== command)) {
                this.cmdHistory.push(command);
                this.saveCommandHistory();
            }
            
            this.historyCursor = this.cmdHistory.length;
        } else if (e.key === 'ArrowUp' && this.suggestionsList.style.display !== 'block') {
            e.preventDefault();
            this.navigateHistory('up');
        } else if (e.key === 'ArrowDown' && this.suggestionsList.style.display !== 'block') {
            e.preventDefault();
            this.navigateHistory('down');
        }
    }

    navigateHistory(direction) {
        if (this.cmdHistory.length === 0) return;
        
        if (direction === 'up') {
            this.historyCursor = Math.max(0, this.historyCursor - 1);
        } else {
            this.historyCursor = Math.min(this.cmdHistory.length, this.historyCursor + 1);
        }
        
        this.input.value = this.historyCursor < this.cmdHistory.length ? this.cmdHistory[this.historyCursor] : '';
    }
    
    handleInput(e) {
        const inputText = this.input.value.trim();
        
        if (inputText) {
            this.showSuggestions(inputText);
        } else {
            this.hideSuggestions();
        }
    }
    
    showSuggestions(inputText) {
        // Filter commands based on input
        this.currentSuggestions = Object.entries(this.commandsData)
            .filter(([cmd, data]) => cmd.startsWith(inputText))
            .map(([cmd, data]) => ({ command: cmd, description: data.description }));
        
        if (this.currentSuggestions.length > 0) {
            this.suggestionsList.innerHTML = '';
            this.currentSuggestions.forEach((suggestion, index) => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `
                    <span class="command">${suggestion.command}</span>
                    <span class="description">${suggestion.description}</span>
                `;
                item.addEventListener('click', () => this.selectSuggestion(index));
                item.addEventListener('mouseover', () => {
                    this.highlightSuggestion(index);
                });
                // Add staggered animation delay
                item.style.animationDelay = `${index * 0.05}s`;
                this.suggestionsList.appendChild(item);
            });
            
            this.suggestionsList.style.display = 'block';
            this.selectedSuggestion = -1;
        } else {
            this.hideSuggestions();
        }
    }
    
    hideSuggestions() {
        this.suggestionsList.style.display = 'none';
        this.currentSuggestions = [];
        this.selectedSuggestion = -1;
    }
    
    navigateSuggestion(direction) {
        if (this.currentSuggestions.length === 0) return;
        
        const totalSuggestions = this.currentSuggestions.length;
        
        // Calculate new selected index with wraparound
        if (direction > 0) {
            this.selectedSuggestion = (this.selectedSuggestion + 1) % totalSuggestions;
        } else {
            this.selectedSuggestion = (this.selectedSuggestion - 1 + totalSuggestions) % totalSuggestions;
        }
        
        this.highlightSuggestion(this.selectedSuggestion);
    }
    
    highlightSuggestion(index) {
        // Remove previous highlight
        const items = this.suggestionsList.querySelectorAll('.suggestion-item');
        items.forEach(item => item.classList.remove('selected'));
        
        // Add highlight to current selection
        if (index >= 0 && index < items.length) {
            items[index].classList.add('selected');
            this.selectedSuggestion = index;
        }
    }
    
    selectSuggestion(index) {
        if (index >= 0 && index < this.currentSuggestions.length) {
            this.input.value = this.currentSuggestions[index].command;
            this.hideSuggestions();
            this.input.focus();
        }
    }

    processCommand(command) {
        // Add timestamp
        const now = new Date();
        const timeString = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
        
        // Create styled prompt components
        const styledPrompt = `
            <span class="cmd-prompt">
                <span class="user">fescii</span><span class="at">@</span><span class="machine">portfolio</span><span class="path">:~</span><span class="dollar">$</span>
            </span>
        `.replace(/\s+/g, ' ').trim();
        
        // Add the command with timestamp
        this.addHtmlLine(`<span class="timestamp">${timeString}</span>${styledPrompt} ${command}`, 'command-input');
        
        // Parse the command
        const trimmedCommand = command.trim();
        
        if (!trimmedCommand) {
            this.addBlankLine();
            return;
        }
        
        // Handle commands
        switch (trimmedCommand) {
            case '--help':
                this.showHelp();
                break;
            case '--about':
                this.showAbout();
                break;
            case '--skills':
                this.showSkills();
                break;
            case '--work':
                this.showWorkExperience();
                break;
            case '--projects':
                this.showProjects();
                break;
            case '--education':
                this.showEducation();
                break;
            case '--contact':
                this.showContact();
                break;
            case '--support':
                this.showSupport();
                break;
            case '--clear':
                this.clearTerminal();
                break;
            case '--status':
                this.showStatus();
                break;
            case '--exit':
                this.exitTerminal();
                break;
            default:
                this.addLine(`Command not found: ${trimmedCommand}. Type --help to see available commands.`, 'error-text');
        }
        
        this.addBlankLine();
        this.scrollToBottom();
    }

    addLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.innerText = text;
        this.content.appendChild(line);
    }

    addBlankLine() {
        const blank = document.createElement('div');
        blank.className = 'output-line';
        blank.innerHTML = '&nbsp;';
        this.content.appendChild(blank);
    }

    addHtmlLine(html, className = '') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.innerHTML = html;
        this.content.appendChild(line);
    }

    scrollToBottom() {
        this.content.scrollTop = this.content.scrollHeight;
    }

    clearTerminal() {
        this.content.innerHTML = '';
        this.addLine('Terminal cleared.', 'dim-text');
        this.showWelcomeMessage();
    }

    exitTerminal() {
        this.addLine('Thanks for visiting my portfolio terminal! Goodbye!', 'highlight-text');
        this.addLine('Closing terminal in 3 seconds...', 'dim-text');
        
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
                    <h1>Terminal Closed</h1>
                    <p>Refresh the page to restart</p>
                    <button onclick="location.reload()">Restart Terminal</button>
                </div>
            `;
        }, 3000);
    }

    showWelcomeMessage() {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
        const timeString = now.toLocaleTimeString('en-US');
        
        const ascii = `
  ______              _      _      _     
 |  ____|            | |    (_)    | |    
 | |__ _ __ ___  __ _| | ___ _  ___| | __ 
 |  __| '__/ _ \\/ _\` | |/ _ \\ |/ __| |/ / 
 | |  | | |  __/ (_| | |  __/ | (__|   <  
 |_|  |_|  \\___|\\__,_|_|\\___|_|\\___|_|\\_\\ 
        `;
        
        // Create welcome container with animated elements
        const welcomeContainer = document.createElement('div');
        welcomeContainer.className = 'welcome-container';
        
        // ASCII art with enhanced animation
        const asciiArt = document.createElement('pre');
        asciiArt.className = 'welcome-ascii';
        asciiArt.textContent = ascii;
        
        // Welcome message with typing effect
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `<span class="highlight-text typing-animation">Welcome to ${this.userData.name}'s Portfolio Terminal!</span>`;
        
        // Version info with animated appearance
        const versionInfo = document.createElement('div');
        versionInfo.className = 'welcome-version-info';
        versionInfo.innerHTML = `<span class="dim-text">Version 0.1.16 | ${dateString} at ${timeString}</span>`;
        
        // Adding elements to container
        welcomeContainer.appendChild(asciiArt);
        welcomeContainer.appendChild(welcomeMessage);
        welcomeContainer.appendChild(versionInfo);
        
        // Payment links with enhanced animations
        const paymentLinks = document.createElement('div');
        paymentLinks.className = 'payment-links';
        paymentLinks.innerHTML = `
            <span class="payment-caption">Because servers don't run on applause... ☕</span>
            <div class="payment-container">
                <a href="https://www.paypal.com/ncp/payment/HGL5EX39CHK7Q" target="_blank" class="payment-link paypal">
                    <i class="bi bi-paypal"></i> PayPal
                </a>
                <a href="https://buymeacoffee.com/femar" target="_blank" class="payment-link buymeacoffee">
                    <i class="bi bi-cup-hot-fill"></i> Buy Me a Coffee
                </a>
                <div class="payment-link mpesa">
                    <i class="bi bi-phone-fill"></i> M-Pesa Till: <span>05381359</span>
                </div>
            </div>
        `;
        
        // Apple Music player container
        const musicPlayer = document.createElement('div');
        musicPlayer.className = 'apple-music-player';
        musicPlayer.innerHTML = `
            <div class="music-caption">🎵 Currently Playing:</div>
            <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="width:100%;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/song/the-end/1192962310?theme=dark"></iframe>
        `;
        
        // System ready message with animated prompt
        const systemReadyMsg = document.createElement('div');
        systemReadyMsg.className = 'system-ready';
        systemReadyMsg.innerHTML = `
            <div class="loading-indicator">
                <div class="loading-bar"></div>
            </div>
            <span class="system-message">System ready. Type <span class="cmd-hint">--help</span> to see available commands.</span>
        `;
        
        // Add all elements to terminal content
        this.content.appendChild(welcomeContainer);
        this.content.appendChild(paymentLinks);
        this.content.appendChild(musicPlayer);
        this.addBlankLine();
        this.content.appendChild(systemReadyMsg);
        this.addBlankLine();
        
        // Simulate terminal boot sequence
        setTimeout(() => {
            welcomeContainer.classList.add('show');
            // this.scrollToBottom();
        }, 300);
    }

    showHelp() {
        this.addLine('Available Commands', 'highlight-text');
        this.addBlankLine();
        
        // Create commands container with grid layout for better organization
        const commandsContainer = document.createElement('div');
        commandsContainer.className = 'commands-container';
        
        // Add each command with staggered animation
        Object.entries(this.commandsData).forEach(([cmd, data], index) => {
            const commandItem = document.createElement('div');
            commandItem.className = 'command-help-item';
            commandItem.style.setProperty('--index', index);
            
            // Add command with icon
            const commandName = document.createElement('div');
            commandName.className = 'command-help-name';
            commandName.innerHTML = `<i class="bi bi-terminal"></i> ${cmd}`;
            
            // Add description
            const commandDesc = document.createElement('div');
            commandDesc.className = 'command-help-desc';
            commandDesc.textContent = data.description;
            
            // Add to container
            commandItem.appendChild(commandName);
            commandItem.appendChild(commandDesc);
            commandsContainer.appendChild(commandItem);
        });
        
        // Add commands container to terminal content
        this.content.appendChild(commandsContainer);
        
        // Add hint at the bottom
        const hintContainer = document.createElement('div');
        hintContainer.className = 'help-hint';
        hintContainer.innerHTML = '<i class="bi bi-info-circle"></i> Tip: Commands can be clicked from history or completed with Tab.';
        
        // Add with a delay for visual appeal
        setTimeout(() => {
            this.content.appendChild(hintContainer);
            this.scrollToBottom();
        }, 500);
    }

    showAbout() {
        this.addLine('About Me', 'highlight-text');
        this.addBlankLine();
        
        // Create animated about container
        const aboutContainer = document.createElement('div');
        aboutContainer.className = 'about-container';
        
        // Personal info section with animation
        const infoSection = document.createElement('div');
        infoSection.className = 'about-info-section';
        
        const infoItems = [
            { label: 'Name', value: this.userData.name },
            { label: 'Title', value: this.userData.title },
            { label: 'Location', value: this.userData.address }
        ];
        
        infoItems.forEach((item, index) => {
            const infoItem = document.createElement('div');
            infoItem.className = 'about-info-item';
            infoItem.style.setProperty('--index', index);
            infoItem.innerHTML = `
                <span class="about-info-label">${item.label}:</span>
                <span class="about-info-value">${item.value}</span>
            `;
            infoSection.appendChild(infoItem);
        });
        
        aboutContainer.appendChild(infoSection);
        
        // Profile section with animation
        const profileSection = document.createElement('div');
        profileSection.className = 'summary-section';
        
        const profileTitle = document.createElement('div');
        profileTitle.className = 'highlight-text';
        profileTitle.textContent = 'Profile:';
        profileSection.appendChild(profileTitle);
        
        const profileText = document.createElement('div');
        profileText.className = 'profile-text';
        profileText.textContent = this.userData.profile;
        profileSection.appendChild(profileText);
        
        aboutContainer.appendChild(profileSection);
        
        // Stats section with animation
        const statsSection = document.createElement('div');
        statsSection.className = 'stats-section';
        
        const statsTitle = document.createElement('div');
        statsTitle.className = 'highlight-text';
        statsTitle.textContent = 'Quick Stats:';
        statsSection.appendChild(statsTitle);
        
        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';
        
        Object.entries(this.userData.stats).forEach(([key, value], index) => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.style.setProperty('--index', index);
            
            const statKey = document.createElement('div');
            statKey.className = 'stat-key';
            statKey.textContent = key;
            
            const statValue = document.createElement('div');
            statValue.className = 'stat-value';
            statValue.textContent = value;
            
            statItem.appendChild(statKey);
            statItem.appendChild(statValue);
            statsGrid.appendChild(statItem);
        });
        
        statsSection.appendChild(statsGrid);
        aboutContainer.appendChild(statsSection);
        
        // Add to terminal content
        this.content.appendChild(aboutContainer);
        this.scrollToBottom();
    }

    showSkills() {
        this.addLine('My Technical Skills', 'highlight-text');
        
        let categoryDelay = 0;
        for (const [category, skills] of Object.entries(this.userData.skills)) {
            this.addBlankLine();
            
            // Create a category element with animation delay
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            categoryDiv.style.setProperty('--delay', categoryDelay);
            categoryDelay++;
            
            // Add category title
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'skill-category-title';
            categoryTitle.textContent = category;
            categoryDiv.appendChild(categoryTitle);
            
            // Add skills with staggered animation
            skills.forEach((skill, index) => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item';
                skillItem.style.setProperty('--index', index);
                
                const skillName = document.createElement('div');
                skillName.className = 'skill-name';
                skillName.textContent = skill.name;
                
                const skillLevel = document.createElement('div');
                skillLevel.className = 'skill-level';
                skillLevel.textContent = skill.level;
                
                skillItem.appendChild(skillName);
                skillItem.appendChild(skillLevel);
                categoryDiv.appendChild(skillItem);
            });
            
            // Create the outer container and add the category to it
            const skillsContainer = document.createElement('div');
            skillsContainer.className = 'skills-container';
            skillsContainer.appendChild(categoryDiv);
            
            this.content.appendChild(skillsContainer);
        }
        
        this.scrollToBottom();
    }

    showWorkExperience() {
        this.addLine('Work Experience', 'highlight-text');
        this.addBlankLine();
        
        // Create container for work experience items
        const expContainer = document.createElement('div');
        expContainer.className = 'work-experience-container';
        
        this.userData.experience.forEach((job, index) => {
            const jobItem = document.createElement('div');
            jobItem.className = 'work-item';
            jobItem.style.setProperty('--index', index); // Set animation delay based on index
            
            const jobTitle = document.createElement('div');
            jobTitle.className = 'work-title';
            jobTitle.innerHTML = `${job.title} <span class="work-company">• ${job.company}</span> <span class="work-period">${job.period}</span>`;
            
            const jobDescription = document.createElement('div');
            jobDescription.className = 'work-description';
            
            // Add each bullet point with staggered delay
            job.description.forEach((item, bulletIndex) => {
                const bullet = document.createElement('div');
                bullet.className = 'work-bullet';
                bullet.style.setProperty('--bullet-index', bulletIndex); // Set bullet animation delay
                bullet.textContent = item;
                jobDescription.appendChild(bullet);
            });
            
            jobItem.appendChild(jobTitle);
            jobItem.appendChild(jobDescription);
            
            expContainer.appendChild(jobItem);
        });
        
        this.content.appendChild(expContainer);
        this.scrollToBottom();
    }

    showProjects() {
        this.addLine('Projects', 'highlight-text');
        this.addBlankLine();
        
        // Create a container for projects with animation
        const projectsContainer = document.createElement('div');
        projectsContainer.className = 'projects-container';
        
        this.userData.projects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project';
            projectDiv.style.setProperty('--index', index); // Set animation delay based on index
            
            const projectTitle = document.createElement('div');
            projectTitle.className = 'project-title';
            projectTitle.textContent = project.title;
            
            const projectDesc = document.createElement('div');
            projectDesc.className = 'project-description';
            projectDesc.textContent = project.description;
            
            projectDiv.appendChild(projectTitle);
            projectDiv.appendChild(projectDesc);
            
            projectsContainer.appendChild(projectDiv);
        });
        
        this.content.appendChild(projectsContainer);
        this.scrollToBottom();
    }

    showEducation() {
        this.addLine('Education', 'highlight-text');
        this.addBlankLine();
        
        // Create container for education items with animation
        const eduContainer = document.createElement('div');
        eduContainer.className = 'education-container';
        
        this.userData.education.forEach((edu, index) => {
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.style.setProperty('--index', index); // Set animation delay based on index
            
            const degreeDiv = document.createElement('div');
            degreeDiv.className = 'work-title';
            degreeDiv.textContent = edu.degree;
            
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'dim-text';
            detailsDiv.textContent = `${edu.institution} • ${edu.period}`;
            
            eduItem.appendChild(degreeDiv);
            eduItem.appendChild(detailsDiv);
            
            eduContainer.appendChild(eduItem);
        });
        
        this.content.appendChild(eduContainer);
        this.scrollToBottom();
    }

    showContact() {
        this.addLine('Contact Information', 'highlight-text');
        this.addBlankLine();
        
        const contact = this.userData.contact;
        
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-container';
        
        // Create contact items with animation delays
        const contactItems = [
            {
                icon: 'bi-envelope',
                label: 'Email',
                value: contact.email
            },
            {
                icon: 'bi-telephone',
                label: 'Phone',
                value: contact.phone
            },
            {
                icon: 'bi-github',
                label: 'GitHub',
                value: contact.github
            },
            {
                icon: 'bi-linkedin',
                label: 'LinkedIn',
                value: contact.linkedin
            }
        ];
        
        contactItems.forEach((item, index) => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.style.setProperty('--index', index); // Set animation delay
            
            contactItem.innerHTML = `
                <i class="bi ${item.icon} contact-icon"></i>
                <span class="contact-label">${item.label}:</span>
                <span class="contact-value">${item.value}</span>
            `;
            
            contactDiv.appendChild(contactItem);
        });
        
        this.content.appendChild(contactDiv);
        this.addBlankLine();
        
        // Add a message with animation
        const messageDiv = document.createElement('div');
        messageDiv.className = 'contact-message';
        messageDiv.textContent = 'Feel free to reach out for collaborations or opportunities!';
        messageDiv.style.animation = 'fadeUpIn 0.5s ease-out forwards 1s';
        messageDiv.style.opacity = '0';
        
        this.content.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showStatus() {
        const date = new Date();
        const localTimeStr = date.toLocaleString();
        
        // Get EAT time (UTC+3)
        const eatOptions = { 
            timeZone: 'Africa/Nairobi',
            dateStyle: 'full',
            timeStyle: 'medium'
        };
        const eatTimeStr = date.toLocaleString('en-US', eatOptions);
        
        this.addLine('System Status', 'highlight-text');
        this.addBlankLine();
        
        // Create status items array for animation
        const statusItems = [
            { label: 'Local Time:', value: localTimeStr },
            { label: 'EAT (UTC+3):', value: eatTimeStr },
            { label: 'Status:', value: '● Online', className: 'online' },
            { label: 'Portfolio Version:', value: '1.0.0' },
            { label: 'Last Updated:', value: 'May 21, 2025' },
            { label: 'Environment:', value: 'Terminal Interface' }
        ];
        
        // Create container element
        const statusContainer = document.createElement('div');
        statusContainer.className = 'status-container';
        
        // Add each status item with staggered animation
        statusItems.forEach((item, index) => {
            const statusItem = document.createElement('div');
            statusItem.className = 'status-item';
            statusItem.style.setProperty('--index', index);
            
            const statusLabel = document.createElement('span');
            statusLabel.className = 'status-label';
            statusLabel.textContent = item.label;
            
            const statusValue = document.createElement('span');
            statusValue.className = `status-value ${item.className || ''}`;
            statusValue.innerHTML = item.value;
            statusValue.style.setProperty('--index', index);
            
            statusItem.appendChild(statusLabel);
            statusItem.appendChild(statusValue);
            statusContainer.appendChild(statusItem);
        });
        
        this.content.appendChild(statusContainer);
        this.scrollToBottom();
    }
    
    showSupport() {
        this.addLine('Support My Work', 'highlight-text');
        this.addBlankLine();
        
        this.addLine('If you found my work helpful or impressive, consider supporting me via:', 'dim-text');
        this.addBlankLine();
        
        // Payment links with sarcastic dev caption
        this.addHtmlLine(`
            <div class="payment-links">
                <span class="payment-caption">Because debugging doesn't pay the bills... 💻</span>
                <div class="payment-container">
                    <a href="https://www.paypal.com/ncp/payment/HGL5EX39CHK7Q" target="_blank" class="payment-link paypal">
                        <i class="bi bi-paypal"></i> PayPal
                    </a>
                    <a href="https://buymeacoffee.com/femar" target="_blank" class="payment-link buymeacoffee">
                        <i class="bi bi-cup-hot-fill"></i> Buy Me a Coffee
                    </a>
                    <div class="payment-link mpesa">
                        <i class="bi bi-phone-fill"></i> M-Pesa Till: <span>05381359</span>
                    </div>
                </div>
            </div>
        `, '');
        
        this.addBlankLine();
        this.addLine('Thank you for your support! It helps me create more awesome projects.', 'system-message');
    }
}

// Initialize the terminal when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalConsole();
});
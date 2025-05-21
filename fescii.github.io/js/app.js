// filepath: /home/femar/AO3/fescii.github.io/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const terminal = document.getElementById('terminal');
    const body = document.body;

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    }

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    // Smooth scrolling behavior
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    };

    // Example of adding command handling (to be expanded in console.js)
    terminal.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const command = terminal.value.trim();
            // Handle command input (to be implemented in console.js)
            console.log(`Command entered: ${command}`);
            terminal.value = ''; // Clear input after command
        }
    });
});
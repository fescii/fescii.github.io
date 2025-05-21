// filepath: /home/femar/AO3/fescii.github.io/js/console.js

const terminalOutput = document.getElementById('terminal-output');
const inputField = document.getElementById('input-field');
const clearButton = document.getElementById('clear-button');

const commands = {
    help: "Available commands: --help, --about, --skills, --work, --contact, --clear, --status, --exit",
    about: "I'm a web developer with a passion for creating interactive applications.",
    skills: "JavaScript, HTML, CSS, React, Node.js",
    work: "Check out my projects on GitHub!",
    contact: "You can reach me at myemail@example.com",
    clear: () => {
        terminalOutput.innerHTML = '';
    },
    status: "All systems operational.",
    exit: () => {
        terminalOutput.innerHTML += "<br>Goodbye!";
        inputField.disabled = true;
    }
};

function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim();
        inputField.value = '';
        processCommand(userInput);
    }
}

function processCommand(input) {
    const command = input.split(' ')[0].replace('--', '');
    const response = commands[command] || "Command not found. Type --help for a list of commands.";
    if (typeof response === 'function') {
        response();
    } else {
        terminalOutput.innerHTML += `<br>${response}`;
    }
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to the bottom
}

clearButton.addEventListener('click', commands.clear);
inputField.addEventListener('keydown', handleInput);
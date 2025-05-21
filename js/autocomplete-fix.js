// Fix for autocomplete with the new HTML structure
document.addEventListener('DOMContentLoaded', () => {
    // Get references to key elements
    const suggestionsElem = document.getElementById('autocomplete-suggestions');
    
    if (suggestionsElem) {
        // Add scroll indicator for autocomplete
        suggestionsElem.addEventListener('scroll', function() {
            // Add scrollable class when content is scrollable
            const isScrollable = this.scrollHeight > this.clientHeight;
            if (isScrollable) {
                this.classList.add('scrollable');
            } else {
                this.classList.remove('scrollable');
            }
        });
        
        // Add keyboard handling improvements
        document.getElementById('terminal-input').addEventListener('keydown', function(e) {
            // Check if suggestions are visible
            if (suggestionsElem.style.display === 'block') {
                // When Escape is pressed, hide suggestions
                if (e.key === 'Escape') {
                    suggestionsElem.style.display = 'none';
                }
            }
        });
    }
    
    // Monitor for window resize to adjust positioning
    window.addEventListener('resize', () => {
        if (suggestionsElem && suggestionsElem.style.display !== 'none') {
            // When visible, trigger a scroll event to check scrollability
            suggestionsElem.dispatchEvent(new Event('scroll'));
        }
    });
    
    // Add this script to the HTML
    if (!document.querySelector('script[src="js/autocomplete-fix.js"]')) {
        const script = document.createElement('script');
        script.src = 'js/autocomplete-fix.js';
        document.body.appendChild(script);
    }
});

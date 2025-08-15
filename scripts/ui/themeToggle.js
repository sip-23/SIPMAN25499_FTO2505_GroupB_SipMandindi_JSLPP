const toggleSlider = document.getElementById('themeToggle');
const toggleSliderMobile = document.getElementById('themeToggle-mobile');
const bod = document.documentElement;

/**
 * Toggle event listener for light mode and dark mode
 * Mobile toggle for light-mode darkmode
*/ 
export function setupThemeToggle() {
    toggleSlider.addEventListener('change', () => {
        if (toggleSlider.checked) {
            bod.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            bod.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Mobile toggle for light-mode darkmode
    toggleSliderMobile.addEventListener('change', () => {
        if (toggleSliderMobile.checked) {
            bod.classList.add('dark');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            bod.classList.remove('dark');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        bod.classList.add('dark');
        toggle.checked = true;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        bod.classList.add('dark');
        toggle.checked = true;
    }

}
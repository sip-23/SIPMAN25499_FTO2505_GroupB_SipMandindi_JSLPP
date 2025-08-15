const sidebar = document.querySelector('.sidebar');
const hideSidebarBtn = document.getElementById('hideSidebar');
const showSidebarBtn = document.getElementById('showSidebar');
const mobileSidebar = document.getElementById('drawer');
const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
const closeMobileSidebarBtn = document.getElementById('closeMobileSidebarBtn');

/**
 *  function to Hide sidebar
 */
export function hideSidebarVisability() {
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('lg:w-[300px]');
    sidebar.classList.add('opacity-0');
    sidebar.classList.add('w-0');
    sidebar.classList.add('border-none');
    showSidebarBtn.classList.remove('hidden');
    localStorage.setItem('sidebarHidden', 'true');

}

/**
 * function to show sidebar
 */ 
export function showSidebarVisability() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('lg:w-[300px]');
    sidebar.classList.remove('opacity-0');
    sidebar.classList.remove('w-0');
    sidebar.classList.remove('border-none');
    showSidebarBtn.classList.add('hidden');
    localStorage.setItem('sidebarHidden', 'false');
}

/**
 * function to show sidebar on mobile view
 */ 
export function showSidebarVisabilityMobile(){
    mobileSidebar.classList.remove('hidden');
    localStorage.setItem('sidebarHidden', 'false');
}

/**
 * function to hide sidebar on mobile view
 */ 
export function hideSidebarVisabilityMobile(){
    mobileSidebar.classList.add('hidden');
    localStorage.setItem('sidebarHidden', 'true');
}

/**
 * function to show sidebar state 
 */ 
export function checkSidebarState () {
    const isHidden = localStorage.getItem('sidebarHidden') === 'true';
    if (isHidden){
        hideSidebarVisability();
    }
    else {
        showSidebarVisability();
    }
}
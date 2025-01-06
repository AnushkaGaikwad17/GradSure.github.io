document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    const content = document.getElementById('content');
    
    menuIcon.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            content.style.marginLeft = '0';
        } else {
            sidebar.classList.add('open');
            content.style.marginLeft = '250px'; /* Adjust according to sidebar width */
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('sidebar-close-btn');
  const sidebar = document.getElementById('nav-sidebar');
  const overlay = document.getElementById('overlay');

  const openSidebar = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  };

  // Event listeners
  openMenuBtn.addEventListener('click', openSidebar);
  closeMenuBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);
});
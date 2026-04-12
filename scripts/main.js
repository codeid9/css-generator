lucide.createIcons();

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sidebar = document.getElementsByClassName('sidebar')[0];
const sidebarToggle = document.querySelector(".sidebar-toggle");
let isSidebarOpen = true;

// toggle sidebar
sidebarToggle.addEventListener("click", () => {
    isSidebarOpen = isSidebarOpen ? false : true;
    const icon = sidebarToggle.querySelector("svg");
    if (isSidebarOpen) {
        sidebar.classList.remove('active');
        icon.setAttribute("data-lucide", "panel-left-close");
    } else {
        sidebar.classList.add('active');
        icon.setAttribute("data-lucide", "panel-left-open");
    }
    lucide.createIcons();
});
// apply theme (dark/light mode)
themeToggle.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    body.setAttribute("data-theme", isDark ? "light" : "dark");
    const icon = themeToggle.querySelector("svg");
    if (isDark) {
        icon.setAttribute("data-lucide", "moon");
    } else {
        icon.setAttribute("data-lucide", "sun");
    }
    lucide.createIcons();
});

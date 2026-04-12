// selectors
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sidebar = document.getElementsByClassName("sidebar")[0];
const sidebarToggle = document.querySelector(".sidebar-toggle");
let isSidebarOpen = true;
const appState = {
    activeTool: "box-shadow",
    settings: {
        boxShadow: {
            x: 10,
            y: 10,
            blur: 20,
            spread: 2,
            color: "rgb(0,0,0)",
            opacity: 0.5,
        },
        textShadow: {
            x: 10,
            y: 10,
            blur: 20,
            color: "rgb(0,0,0)",
            opacity: 0.5,
        },
        borderRadius: {
            all: 8,
            topLeft: 8,
            topRight: 8,
            bottomLeft: 8,
            bottomRight: 8,
        },
    },
};

// ======== App Functions ========

function initTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            appState.activeTool = tab.getAttribute("data-tool");
            document.getElementById("tool-title").innerText = tab.title;
            // update tools input 
            const controls = document.querySelectorAll('.tool-settings');
            controls.forEach(c=>c.classList.remove('active'));
            const toolSettings = document.getElementById(`${appState.activeTool}-controls`);
            toolSettings.classList.add('active');
        });

    });

}
// Box Shadow Update
function updateBoxShadow() {
    const x = document.getElementById("bs-x");
    const y = document.getElementById("bs-y");
    const blur = document.getElementById("bs-blur");
    const spread = document.getElementById("bs-spread");
    const color = document.getElementById("bs-color");
    const opacity = document.getElementById("bs-opacity");

    function handleInputs (){
        appState.settings.boxShadow.x = x.value;
        appState.settings.boxShadow.y = y.value;
        appState.settings.boxShadow.blur = blur.value;
        appState.settings.boxShadow.spread = spread.value;
        appState.settings.boxShadow.color = color.value;
        appState.settings.boxShadow.opacity = opacity.value;
        console.log(appState);
        renderPreview()
    }

    // eventlisteners 
    x.addEventListener('input',handleInputs);
    y.addEventListener('input',handleInputs);
    blur.addEventListener('input',handleInputs);
    spread.addEventListener('input',handleInputs);
    color.addEventListener('input',handleInputs);
    opacity.addEventListener('input',handleInputs);

    
}

function renderPreview(){
    // console.log(appState.settings.boxShadow);
    // const rgba = RGBtoRGBA(color,opacity);
    // const shadowStr = `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;

}

function RGBtoRGBA(color,opacity){
    const clr = color.split("(")[1].split(")")[0].split(',');
    return `rgba(${clr[0]},${clr[1]},${clr[2]},${opacity})`;
}

// initilize App
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    // Initial setup
    initTabs();
    updateBoxShadow()
});
// toggle sidebar
sidebarToggle.addEventListener("click", () => {
    isSidebarOpen = isSidebarOpen ? false : true;
    const icon = sidebarToggle.querySelector("svg");
    const controls = document.getElementById('controls-tab')
    if (isSidebarOpen) {
        sidebar.classList.remove("active");
        icon.setAttribute("data-lucide", "panel-left-close");
        controls.style.visibility='visible';
        controls.style.opacity=1;
    } else {
        controls.style.visibility='hidden';
        controls.style.opacity=0;
        sidebar.classList.add("active");
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

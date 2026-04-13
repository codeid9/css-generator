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
            color: "#000000",
            opacity: 1,
        },
        textShadow: {
            x: 10,
            y: 10,
            blur: 20,
            color: "#000000",
            opacity: 1,
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
    const code = document.getElementById('code');
    const targetBox = document.getElementById('target-box');
    const {x,y,blur,spread,color,opacity} = appState.settings.boxShadow;
    const rgba = HextoRGBA(color,opacity);
    const shadowStr = `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
    code.innerText = `box-shadow:${shadowStr};`
    targetBox.style.boxShadow = shadowStr;
}

function HextoRGBA(hex,opacity){
    let r = parseInt(hex.slice(1,3),16);
    let g = parseInt(hex.slice(3,5),16);
    let b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${opacity})`;
}

// initilize App
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    // Initial setup
    initTabs();
    updateBoxShadow()
    renderPreview()
});
document.getElementById('copy-code-btn').addEventListener('click',()=>{
    const text = document.getElementById('code').innerText
    window.navigator.clipboard.writeText(text)
})
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

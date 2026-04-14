// selectors
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const sidebar = document.getElementsByClassName("sidebar")[0];
const sidebarToggle = document.querySelector(".sidebar-toggle");
const targetBox = document.getElementById("target-box");
const codeOutput = document.getElementById("code");
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
    const controls = document.querySelectorAll(".tool-settings");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            // change tool heading
            appState.activeTool = tab.getAttribute("data-tool");
            document.getElementById("tool-title").innerText = tab.title;
            // update tools input
            controls.forEach((c) => c.classList.remove("active"));
            const toolSettings = document.getElementById(
                `${appState.activeTool}-controls`,
            );
            toolSettings.classList.add("active");
            renderPreview();
        });
    });
}

function initInputs() {
    // box-shadow listeners
    const bsControls = [
        "bs-x",
        "bs-y",
        "bs-blur",
        "bs-spread",
        "bs-color",
        "bs-opacity",
    ];
    bsControls.forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", (e) => {
                const prop = id.split("-")[1];
                appState.settings.boxShadow[prop] = e.target.value;
                renderPreview();
            });
        }
    });
    // text-shadow listeners
}
// View Output
function renderPreview() {
    const s = appState.settings;

    // box shadow logic
    const bs = s.boxShadow;
    const bsColor = HextoRGBA(bs.color, bs.opacity);
    const bsStr = `${bs.x}px ${bs.y}px ${bs.blur}px ${bs.spread}px ${bsColor}`;

    // text Shadow

    // apply css on target
    targetBox.style.boxShadow = bsStr;

    // Show Active Tool's output
    if (appState.activeTool === "box-shadow") {
        codeOutput.innerText = `box-shadow: ${bsStr};`;
    }
}

function HextoRGBA(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${opacity})`;
}

// initilize App
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    // Initial setup
    initTabs();
    initInputs();
    renderPreview();
});
// copy code to clipboard
document.getElementById("copy-code-btn").addEventListener("click", () => {
    const text = document.getElementById("code").innerText;
    window.navigator.clipboard.writeText(text);
});
// toggle sidebar
sidebarToggle.addEventListener("click", () => {
    isSidebarOpen = isSidebarOpen ? false : true;
    const icon = sidebarToggle.querySelector("svg");
    const controls = document.getElementById("controls-tab");
    if (isSidebarOpen) {
        sidebar.classList.remove("active");
        icon.setAttribute("data-lucide", "panel-left-close");
        controls.style.visibility = "visible";
        controls.style.opacity = 1;
    } else {
        controls.style.visibility = "hidden";
        controls.style.opacity = 0;
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

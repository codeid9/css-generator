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
            tl: 8,
            tr: 8,
            bl: 8,
            br: 8,
        },
        background: {
            type: "linear-gradient",
            angle: 90,
            colors: ["#3b82f6", "#2dd4bf", "#ff5733"],
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
    const tsControls = ["ts-x", "ts-y", "ts-blur", "ts-opacity", "ts-color"];
    tsControls.forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", (e) => {
                const prop = id.split("-")[1];
                appState.settings.textShadow[prop] = e.target.value;
                renderPreview();
            });
        }
    });
    // border-radius listeners
    const brControls = ["b-tl", "b-tr", "b-bl", "b-br"];
    brControls.forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", (e) => {
                const prop = id.split("-")[1];
                appState.settings.borderRadius[prop] = e.target.value;
                renderPreview();
            });
        }
    });
    // background listeners
    // 1. Listen for Type change (Select)
    const typeSelect = document.getElementById("bg-type");
    typeSelect.addEventListener("change", (e) => {
        appState.settings.background.type = e.target.value;
        // Logical Fix: Conic aur Radial mein angle ka logic alag hota hai
        const angleGroup = document.getElementById("angle-group");
        angleGroup.style.display =
            e.target.value === "radial-gradient" ? "none" : "block";
        renderPreview();
    });

    const bgControls = ["bg-color1", "bg-color2"];
    const angleInput = document.getElementById("bg-angle");
    const angleDisplay =
        angleInput.parentElement.querySelector(".value-display");

    if (angleInput) {
        angleInput.addEventListener("input", (e) => {
            const val = e.target.value;
            appState.settings.background.angle = val;
            if (angleDisplay) {
                angleDisplay.innerText = `${val}°`;
            }
            renderPreview();
        });
    }

    bgControls.forEach((id) => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener("input", (e) => {
                // 'color1', 'color2', 'angle'
                const prop = id.replace("bg-", "");
                appState.settings.background[prop] = e.target.value;
                renderPreview();
            });
        }
    });
}
// render colors
function renderColorInputs() {
    const container = document.getElementById("colors-container");
    if (!container) return; // Guard clause

    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "color-wrapper";

    appState.settings.background.colors.forEach((color, index) => {
        const div = document.createElement("div");
        div.className = "color-input-item"; // for Styling
        div.innerHTML = `
            <input type="color" value="${color}" data-index="${index}" class="bg-color-picker">
            <button class="remove-color-btn" data-index="${index}">
                <i data-lucide="trash-2"></i>
            </button>
        `;

        // 1. Color change listener
        div.querySelector("input").addEventListener("input", (e) => {
            appState.settings.background.colors[index] = e.target.value;
            renderPreview();
        });

        // 2. Remove button listener
        div.querySelector(".remove-color-btn").addEventListener("click", () => {
            if (appState.settings.background.colors.length > 2) {
                appState.settings.background.colors.splice(index, 1);
                renderColorInputs();
                renderPreview();
            } else {
                alert("atleast 2 colors should have!!");
            }
        });

        wrapper.appendChild(div);
    });

    container.appendChild(wrapper);

    if (window.lucide) lucide.createIcons();
}
// View Output
function renderPreview() {
    const s = appState.settings;

    // box shadow logic
    const bs = s.boxShadow;
    const bsColor = HextoRGBA(bs.color, bs.opacity);
    const bsStr = `${bs.x}px ${bs.y}px ${bs.blur}px ${bs.spread}px ${bsColor}`;
    // text Shadow
    const ts = s.textShadow;
    const tsColor = HextoRGBA(ts.color, ts.opacity);
    const tsStr = `${ts.x}px ${ts.y}px ${ts.blur}px ${tsColor}`;
    // border-radius
    const br = s.borderRadius;
    const borderRadiusStr = `${br.tl}px ${br.tr}px ${br.br}px ${br.bl}px`;
    // background generator
    const bg = s.background;
    const colorsStr = bg.colors.join(", ");
    let finalStr = "";

    if (bg.type === "linear-gradient") {
        finalStr = `linear-gradient(${bg.angle}deg, ${colorsStr})`;
    } else if (bg.type === "radial-gradient") {
        finalStr = `radial-gradient(circle, ${colorsStr})`;
    } else {
        finalStr = `conic-gradient(from ${bg.angle}deg, ${colorsStr})`;
    }

    // apply css on target
    targetBox.style.boxShadow = bsStr;
    targetBox.style.textShadow = tsStr;
    targetBox.style.borderRadius = borderRadiusStr;
    targetBox.style.background = finalStr;

    // Show Active Tool's output
    if (appState.activeTool === "box-shadow") {
        codeOutput.innerText = `box-shadow: ${bsStr};`;
    } else if (appState.activeTool === "text-shadow") {
        codeOutput.innerText = `text-shadow: ${tsStr};`;
    } else if (appState.activeTool === "border-radius") {
        codeOutput.innerText = `border-radius: ${borderRadiusStr};`;
    } else if (appState.activeTool === "background") {
        codeOutput.innerText = `background: ${finalStr};`;
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
    renderColorInputs();
    document.getElementById("add-color-btn").addEventListener("click", () => {
        appState.settings.background.colors.push("#ffffff");
        renderColorInputs();
        renderPreview();
    });
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

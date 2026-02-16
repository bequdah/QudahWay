document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const currentPage = pathParts.pop();
    const folder = pathParts.pop();

    // 0. EXTRA BULLETPROOF EXIT for index.html
    const isHomePage = !currentPage || (currentPage === 'index.html' && folder === 'QudahWay') || currentPath.endsWith('/') || currentPath.endsWith('/QudahWay');

    if (isHomePage) {
        return;
    }

    // Identify Subject
    const isIR = currentPath.includes('/ir/');
    const isCV = currentPath.includes('/cv/');

    // 1. Create the styles
    const style = document.createElement('style');
    style.innerHTML = `
        #nav-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 60px 0 40px 0;
            margin-top: 40px;
            border-top: 1px solid rgba(51, 65, 85, 0.3);
            font-family: 'Inter', sans-serif;
            background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.8));
            position: relative;
            z-index: 9999;
            box-sizing: border-box;
        }

        #nav-toggle {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border: 1px solid #38bdf8;
            padding: 14px 40px;
            border-radius: 40px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            font-weight: 700;
            gap: 12px;
            font-family: 'Cairo', sans-serif;
            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.1);
        }

        #nav-toggle:hover {
            background: #38bdf8;
            color: #0f172a;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
        }

        #nav-menu {
            position: absolute;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%) translateY(20px) scale(0.95);
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(51, 65, 85, 0.8);
            border-radius: 24px;
            padding: 18px;
            width: 320px;
            max-width: calc(100vw - 40px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            flex-direction: column;
            gap: 8px;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
            text-align: right;
            direction: rtl;
        }

        #nav-menu.visible {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
            pointer-events: auto;
            visibility: visible;
        }

        .nav-header {
            color: #facc15;
            font-weight: 900;
            padding: 5px 10px 15px 10px;
            border-bottom: 1px solid rgba(51, 65, 85, 0.5);
            margin-bottom: 8px;
            font-size: 1.2rem;
            text-align: center;
            font-family: 'Cairo', sans-serif;
        }

        .nav-link {
            color: #f1f5f9;
            text-decoration: none;
            padding: 12px 16px;
            border-radius: 12px;
            transition: all 0.2s;
            font-size: 0.95rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 12px;
            border: 1px solid transparent;
            font-family: 'Cairo', sans-serif;
        }

        .nav-link:hover {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border-color: rgba(56, 189, 248, 0.2);
            transform: translateX(-5px);
        }

        .nav-link.active-page {
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border-color: rgba(56, 189, 248, 0.4);
            pointer-events: none;
        }

        #fixed-home-btn {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            background: rgba(15, 23, 42, 0.9) !important;
            backdrop-filter: blur(10px);
            border: 2px solid #38bdf8 !important;
            color: #38bdf8 !important;
            width: 55px !important;
            height: 55px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            z-index: 1000000 !important;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5) !important;
            transition: all 0.3s ease;
            text-decoration: none !important;
            font-size: 1.6rem !important;
        }

        #fixed-home-btn:hover {
            transform: scale(1.1);
            background: #38bdf8 !important;
            color: #0f172a !important;
        }

        /* Mobile specific adjustments to ensure it stays fixed and doesn't interfere */
        @media (max-width: 600px) {
            #fixed-home-btn {
                top: 15px !important;
                right: 15px !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 1.4rem !important;
            }
        }
    `;
    document.head.appendChild(style);

    // CLEANUP: Remove any existing hardcoded home buttons to prevent duplicates
    const oldBtns = document.querySelectorAll('#floating-home, #fixed-back-btn, [title="العودة للرئيسية"], [title="Back to Home"]');
    oldBtns.forEach(btn => btn.remove());

    // 2. Build the dynamic menu content
    // ... (rest of the code below in nav.js)

    // 2. Build the dynamic menu content
    let menuHTML = `
        <div class="nav-header">
            <span style="color: #38bdf8">Qudah</span><span style="color: #facc15">Way</span> Map
        </div>
        <a href="../index.html" class="nav-link" style="color: #facc15; background: rgba(250, 204, 21, 0.05); border-color: rgba(250, 204, 21, 0.2); justify-content: center; text-align: center;">🏠 الرئيسية (الأكاديمية)</a>
        <a href="index.html" class="nav-link" style="color: #38bdf8; background: rgba(56, 189, 248, 0.05); border-color: rgba(56, 189, 248, 0.2); justify-content: center; text-align: center;">📋 لوحة التحكم</a>
        <div style="height: 1px; background: rgba(51, 65, 85, 0.5); margin: 5px 10px;"></div>
    `;

    if (isIR) {
        menuHTML += `
            <div class="nav-header" style="font-size: 1rem; color: #38bdf8;">Information Retrieval</div>
            <a href="intro.html" class="nav-link">📂 00. Intro & Definitions</a>
            <a href="text-retrieval.html" class="nav-link">📚 01. Text Retrieval Basics</a>
            <a href="boolean-retrieval.html" class="nav-link">🔍 02. Boolean Retrieval</a>
            <a href="text-operations.html" class="nav-link">📝 03. Text Operations</a>
            <a href="phrase-queries.html" class="nav-link">💬 04. Phrase Queries</a>
            <a href="skiplist.html" class="nav-link">⏭️ 05. Skip Lists</a>
            <a href="vector_space_model.html" class="nav-link">🚀 06. Vector Space Model</a>
            <a href="Probabilistic_Model.html" class="nav-link">🎲 07. Probabilistic Model</a>
            <div style="height: 1px; background: rgba(51, 65, 85, 0.5); margin: 5px 10px;"></div>
            <a href="exam.html" class="nav-link" style="color: #fb7185; border-color: rgba(251, 113, 133, 0.2); background: rgba(251, 113, 133, 0.05); justify-content: center;">
                🎯 IR Exams Bank
            </a>
        `;
    } else if (isCV) {
        menuHTML += `
            <div class="nav-header" style="font-size: 1.1rem; color: #34d399;">Computer Vision</div>
            <a href="cv-introduction.html" class="nav-link">👁️ 01. CV Introduction</a>
        `;
    }

    const navContainer = document.createElement('div');
    navContainer.id = 'nav-container';
    navContainer.innerHTML = `
        <button id="nav-toggle" aria-label="Toggle Menu">
            <span class="icon">☰</span>
            <span>تصفح خريطة المساق</span>
        </button>
        <div id="nav-menu">${menuHTML}</div>
    `;

    document.body.appendChild(navContainer);

    // Toggle logic
    const toggleBtn = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const icon = toggleBtn.querySelector('.icon');

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('visible');
        icon.textContent = menu.classList.contains('visible') ? '✕' : '☰';
    });

    document.addEventListener('click', function (event) {
        if (!navContainer.contains(event.target) && menu.classList.contains('visible')) {
            menu.classList.remove('visible');
            icon.textContent = '☰';
        }
    });

    // Highlight current page
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || currentPath.endsWith(href)) {
            link.classList.add('active-page');
        }
    });
});

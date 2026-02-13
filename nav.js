document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop();

    // 0. EXTRA BULLETPROOF EXIT for index.html
    // Checks for: 'index.html', empty string (root), or if the path ends with /QudahWay/
    const isHomePage = !currentPage || currentPage === 'index.html' || currentPath.endsWith('/') || currentPath.endsWith('/QudahWay');

    if (isHomePage) {
        return; // ABSOLUTELY DO NOT SHOW ON HOME PAGE
    }

    // Force body to be a column to ensure footer-style nav stays at bottom
    if (window.getComputedStyle(document.body).display === 'flex') {
        document.body.style.flexDirection = 'column';
        document.body.style.alignItems = 'center';
    }

    // 1. Create the styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Footer Nav Styles - Fixed for all layouts */
        #nav-container {
            width: 100%;
            max-width: 100% !important;
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
            flex-shrink: 0;
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
            white-space: nowrap;
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
            gap: 10px;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;
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
            font-family: 'Satisfy', cursive;
        }

        .nav-link {
            color: #f1f5f9;
            text-decoration: none;
            padding: 14px 20px;
            border-radius: 14px;
            transition: all 0.2s;
            font-size: 0.95rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 14px;
            border: 1px solid transparent;
        }

        .nav-link:hover {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border-color: rgba(56, 189, 248, 0.2);
            transform: translateX(8px);
        }

        .nav-link.active-page {
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border-color: rgba(56, 189, 248, 0.4);
            pointer-events: none;
        }

        /* Fixed Home Button */
        #fixed-home-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(56, 189, 248, 0.3);
            color: #38bdf8;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            font-size: 1.2rem;
        }

        #fixed-home-btn:hover {
            transform: scale(1.1);
            background: #38bdf8;
            color: #0f172a;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.6);
        }
    `;
    document.head.appendChild(style);

    // 2. Create the Footer Nav Container
    const navContainer = document.createElement('div');
    navContainer.id = 'nav-container';

    navContainer.innerHTML = `
        <button id="nav-toggle" aria-label="Toggle Menu">
            <span class="icon">☰</span>
            <span>تصفح خريطة المساق</span>
        </button>
        <div id="nav-menu">
            <div class="nav-header">
                <span style="color: #38bdf8">Qudah</span><span style="color: #facc15">Way</span> Map
            </div>
            
            <a href="index.html" class="nav-link" style="color: #facc15; background: rgba(250, 204, 21, 0.05); border-color: rgba(250, 204, 21, 0.2);">🏠 العودة للرئيسية</a>
            <div style="height: 1px; background: rgba(51, 65, 85, 0.5); margin: 5px 10px;"></div>

            <a href="index-print.html" class="nav-link">📂 00. Intro & Definitions</a>
            <a href="text-retrieval-print.html" class="nav-link">📚 01. Text Retrieval Basics</a>
            <a href="boolean-retrieval-print.html" class="nav-link">🔍 02. Boolean Retrieval</a>
            <a href="text-operations-print.html" class="nav-link">📝 03. Text Operations</a>
            <a href="phrase_queries_print.html" class="nav-link">💬 04. Phrase Queries</a>
            <a href="skiplist-print.html" class="nav-link">⏭️ 05. Skip Lists</a>
            <a href="vector_space_model.html" class="nav-link">🚀 06. Vector Space Model</a>
            <a href="Probabilistic_Model.html" class="nav-link">🎲 07. Probabilistic Model</a>
            <div style="height: 1px; background: rgba(51, 65, 85, 0.5); margin: 5px 10px;"></div>
            <a href="exam.html" class="nav-link" style="color: #fb7185; border-color: rgba(251, 113, 133, 0.2); background: rgba(251, 113, 133, 0.05);">
                🎯 Previous Exams Bank
            </a>
        </div>
    `;

    document.body.appendChild(navContainer);

    // Create and Append Fixed Home Button
    const homeBtn = document.createElement('a');
    homeBtn.id = 'fixed-home-btn';
    homeBtn.href = 'index.html';
    homeBtn.innerHTML = '🏠';
    homeBtn.title = 'Back to Home';
    document.body.appendChild(homeBtn);

    // 3. Add Toggle Functionality
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

    // 4. Highlight current page
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active-page');
        }
    });
});

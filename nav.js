document.addEventListener("DOMContentLoaded", function () {
    // 1. Create the styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Footer Nav Styles */
        #nav-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 0;
            margin-top: 20px;
            border-top: 1px solid rgba(51, 65, 85, 0.3);
            font-family: 'Inter', sans-serif;
            background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.5));
            position: relative;
            z-index: 1000;
        }

        #nav-toggle {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border: 1px solid #38bdf8;
            padding: 12px 30px;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            font-weight: 700;
            gap: 10px;
            font-family: 'Cairo', sans-serif;
        }

        #nav-toggle:hover {
            background: #38bdf8;
            color: #0f172a;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(56, 189, 248, 0.3);
        }

        #nav-menu {
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) scale(0.9);
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(15px);
            border: 1px solid #334155;
            border-radius: 20px;
            padding: 15px;
            width: 300px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            flex-direction: column;
            gap: 8px;
            opacity: 0;
            pointer-events: none;
        }

        #nav-menu.visible {
            opacity: 1;
            transform: translateX(-50%) scale(1);
            pointer-events: auto;
        }

        .nav-header {
            color: #facc15;
            font-weight: 900;
            padding: 5px 10px 10px 10px;
            border-bottom: 1px solid #334155;
            margin-bottom: 5px;
            font-size: 1.1rem;
            text-align: center;
            font-family: 'Satisfy', cursive;
        }

        .nav-link {
            color: #f1f5f9;
            text-decoration: none;
            padding: 12px 18px;
            border-radius: 12px;
            transition: all 0.2s;
            font-size: 0.9rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid transparent;
        }

        .nav-link:hover {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border-color: rgba(56, 189, 248, 0.2);
            transform: translateX(5px);
        }

        @media screen and (max-width: 768px) {
            #nav-menu {
                width: 90%;
                max-width: 320px;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Create the Footer Nav
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
            
            <a href="index-print.html" class="nav-link">📂 00. Intro & Definitions</a>
            <a href="text-retrieval-print.html" class="nav-link">📚 01. Text Retrieval Basics</a>
            <a href="boolean-retrieval-print.html" class="nav-link">🔍 02. Boolean Retrieval</a>
            <a href="text-operations-print.html" class="nav-link">📝 03. Text Operations</a>
            <a href="phrase_queries_print.html" class="nav-link">💬 04. Phrase Queries</a>
            <a href="skiplist-print.html" class="nav-link">⏭️ 05. Skip Lists</a>
            <a href="vector_space_model.html" class="nav-link">🚀 06. Vector Space Model</a>
            <a href="Probabilistic_Model.html" class="nav-link">🎲 07. Probabilistic Model</a>
            <div style="height: 1px; background: #334155; margin: 5px 10px;"></div>
            <a href="exams.html" class="nav-link" style="color: #fb7185; border-color: rgba(251, 113, 133, 0.2); background: rgba(251, 113, 133, 0.05);">
                🎯 Previous Exams Bank
            </a>
        </div>
    `;

    document.body.appendChild(navContainer);

    // 3. Add Functionality
    const toggleBtn = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const icon = toggleBtn.querySelector('.icon');

    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('visible');
        icon.textContent = menu.classList.contains('visible') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navContainer.contains(event.target) && menu.classList.contains('visible')) {
            menu.classList.remove('visible');
            icon.textContent = '☰';
        }
    });

    // 4. Highlight current page
    const currentPage = window.location.pathname.split("/").pop();
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.background = 'rgba(56, 189, 248, 0.2)';
            link.style.color = '#38bdf8';
            link.style.borderColor = '#38bdf8';
        }
    });
});

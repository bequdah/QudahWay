document.addEventListener("DOMContentLoaded", function () {
    // 1. Create the styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Floating Nav Styles */
        #nav-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999; /* High z-index to be on top of everything */
            font-family: 'Inter', sans-serif;
            direction: ltr; /* Ensure menu is LTR */
        }

        #nav-toggle {
            background: #38bdf8; /* var(--primary) */
            color: #0f172a;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
            transition: transform 0.3s, background 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        #nav-toggle:hover {
            transform: scale(1.1);
            background: #fff;
        }

        #nav-menu {
            position: absolute;
            bottom: 80px;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 10px;
            width: 260px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            transform-origin: bottom right;
            transition: opacity 0.3s, transform 0.3s;
            display: flex;
            flex-direction: column;
            gap: 5px;
            opacity: 0;
            transform: scale(0.8);
            pointer-events: none;
        }

        #nav-menu.visible {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
        }

        .nav-header {
            color: #facc15; /* var(--accent) */
            font-weight: 900;
            padding: 5px 10px 10px 10px;
            border-bottom: 1px solid #334155;
            margin-bottom: 5px;
            font-size: 1.1rem;
            text-align: center;
        }

        .nav-link {
            color: #f1f5f9;
            text-decoration: none;
            padding: 10px 15px;
            border-radius: 8px;
            transition: background 0.2s, color 0.2s;
            font-size: 0.95rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .nav-link:hover {
            background: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            transform: translateX(5px);
        }
        
        @media print {
            #nav-container {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Create the HTML Elements
    const navContainer = document.createElement('div');
    navContainer.id = 'nav-container';

    navContainer.innerHTML = `
        <button id="nav-toggle" aria-label="Toggle Menu">
            <span class="icon">☰</span>
        </button>
        <div id="nav-menu">
            <div class="nav-header">QudahWay IR Map</div>
            <a href="index.html" class="nav-link">🏠 Home</a>
            <div style="height: 1px; background: #334155; margin: 5px 10px;"></div>
            <a href="index-print.html" class="nav-link">📂 00. Intro & Definitions</a>
            <a href="text-retrieval-print.html" class="nav-link">📚 01. Text Retrieval</a>
            <a href="boolean-retrieval-print.html" class="nav-link">🔍 02. Boolean Retrieval</a>
            <a href="text-operations-print.html" class="nav-link">📝 03. Text Operations</a>
            <a href="phrase_queries_print.html" class="nav-link">💬 04. Phrase Queries</a>
            <a href="skiplist-print.html" class="nav-link">⏭️ 05. Skip Lists</a>
            <a href="vector_space_model.html" class="nav-link">🚀 06. Vector Space Model</a>
            <a href="Probabilistic_Model.html" class="nav-link">🎲 07. Probabilistic Model</a>
        </div>
    `;

    document.body.appendChild(navContainer);

    // 3. Add Functionality
    const toggleBtn = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const icon = toggleBtn.querySelector('.icon');

    toggleBtn.addEventListener('click', function () {
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
});

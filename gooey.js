(function () {
    // 1. Inject SVG Filter
    if (!document.getElementById('goo-filter-svg')) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = 'goo-filter-svg';
        svg.style.cssText = "visibility: hidden; position: absolute; width: 0; height: 0;";
        svg.innerHTML = `
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>`;
        document.body.appendChild(svg);
    }

    // 2. Setup Cards
    function setupGooeyCards() {
        document.querySelectorAll('.link-card').forEach(card => {
            if (card.querySelector('.gooey-layer')) return;

            const gooeyLayer = document.createElement('div');
            gooeyLayer.className = 'gooey-layer';
            card.prepend(gooeyLayer);

            card.addEventListener('click', function (e) {
                // Determine if we should navigate
                const targetUrl = this.getAttribute('href');
                if (!targetUrl || targetUrl.startsWith('#')) return;

                e.preventDefault();

                // Add loading state
                this.classList.add('loading');
                gooeyLayer.classList.add('exploding');

                // Clear existing drops
                gooeyLayer.innerHTML = '';

                // Get click coordinates
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Create liquid drops
                const dropCount = 12;
                for (let i = 0; i < dropCount; i++) {
                    const drop = document.createElement('div');
                    drop.className = 'liquid-drop';

                    const angle = Math.random() * Math.PI * 2;
                    const velocity = 40 + Math.random() * 120;
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity;
                    const size = 40 + Math.random() * 50;

                    drop.style.width = size + 'px';
                    drop.style.height = size + 'px';
                    drop.style.left = x + 'px';
                    drop.style.top = y + 'px';

                    drop.style.setProperty('--tx', `${tx}px`);
                    drop.style.setProperty('--ty', `${ty}px`);
                    drop.style.setProperty('--s', `${1.2 + Math.random()}`);

                    gooeyLayer.appendChild(drop);
                }

                // Navigate after animation
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            });
        });
    }

    // Run on load and if DOM changes (optional but good for dynamic content)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupGooeyCards);
    } else {
        setupGooeyCards();
    }
})();

/** 
 * QudahBot Assistant Logic
 * Secure deployment version - talks to Cloudflare Pages Function /chat
 */

const QudahBot = {
    isOpen: false,
    chatHistory: [], // Stores conversation turns for context memory


    // UI Elements
    elements: {
        container: null,
        toggle: null,
        messages: null,
        input: null,
        sendBtn: null
    },

    init() {
        // Create the UI structure if it doesn't exist
        this.render();
        this.addEventListeners();
    },

    render() {
        // Create Toggle Button
        const toggle = document.createElement('div');
        toggle.id = 'qudahbot-toggle';
        toggle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" /></svg>`;
        document.body.appendChild(toggle);
        this.elements.toggle = toggle;

        // Create Chat Container
        const container = document.createElement('div');
        container.id = 'qudahbot-container';
        container.innerHTML = `
            <div class="bot-header">
                <div class="bot-info">
                    <div class="bot-avatar"><img src="http://localhost:8080/QudahWay.png" style="width: 100%; height: 100%; object-fit: cover;"></div>
                    <div class="bot-title">
                        <span class="bot-name"><span style="color:#38bdf8;">Qudah</span><span style="color:#facc15;">Bot</span></span>
                    </div>
                </div>
                <button id="qudahbot-close" style="background:none; border:none; color:white; cursor:pointer; font-size:1.5rem;">&times;</button>
            </div>
            <div id="qudahbot-messages">
                <div class="q-message q-bot">أهلاً فيك! أنا QudahBot من منصة QudahWay. بساعدك بـ 4 مواد: DS, IR, CV, و Smart Systems. حابب تسأل عن شي أو محتاج مساعدة؟</div>
            </div>
            <div class="bot-footer">
                <input type="text" id="qudahbot-input" placeholder="اكتب سؤالك هون...">
                <button id="qudahbot-send">إرسال</button>
            </div>
        `;
        document.body.appendChild(container);
        this.elements.container = container;
        this.elements.messages = document.getElementById('qudahbot-messages');
        this.elements.input = document.getElementById('qudahbot-input');
        this.elements.sendBtn = document.getElementById('qudahbot-send');
    },

    addEventListeners() {
        this.elements.toggle.onclick = () => this.toggle();
        document.getElementById('qudahbot-close').onclick = () => this.toggle();

        this.elements.sendBtn.onclick = () => this.sendMessage();
        this.elements.input.onkeypress = (e) => {
            if (e.key === 'Enter') this.sendMessage();
        };
    },

    toggle() {
        this.isOpen = !this.isOpen;
        this.elements.container.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) this.elements.input.focus();
    },

    addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `q-message q-${sender}`;

        // Basic Markdown-ish formatting
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #facc15;">$1</strong>')
            .replace(/\n/g, '<br>');

        div.innerHTML = formatted;
        this.elements.messages.appendChild(div);
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    },

    async sendMessage() {
        const text = this.elements.input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.elements.input.value = '';

        // Add loading state
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'q-message q-bot';
        loadingDiv.innerText = 'قاعد بفكر...';
        this.elements.messages.appendChild(loadingDiv);
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;

        try {
            // Production: uses Cloudflare Pages Function at /chat
            // Local dev: uses localhost:8080/chat (python server)
            const endpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:8080/chat'
                : '/chat';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: text, history: this.chatHistory })
            });

            const data = await response.json();
            const answerText = data.answer || 'ما جاء جواب، جرب مرة ثانية.';

            // Save to chat history for context memory
            this.chatHistory.push({ role: 'user', text: text });
            this.chatHistory.push({ role: 'model', text: answerText });
            if (this.chatHistory.length > 20) this.chatHistory = this.chatHistory.slice(-20);

            loadingDiv.innerHTML = answerText
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #facc15;">$1</strong>')
                .replace(/QudahBot/g, '<span style="color:#38bdf8; font-weight:800;">Qudah</span><span style="color:#facc15; font-weight:800;">Bot</span>')
                .replace(/QudahWay/g, '<span style="color:#38bdf8; font-weight:800;">Qudah</span><span style="color:#facc15; font-weight:800;">Way</span>')
                .replace(/\n/g, '<br>');
        } catch (e) {
            loadingDiv.innerText = 'علقنا شوي يا خالي، جرب كمان مرة! ❌';
        }
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }
};

// Start the bot ONLY if 'cb' parameter is in URL
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('cb')) {
        QudahBot.init();
    }
});

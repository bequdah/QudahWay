/**
 * QudahBot - Cloudflare Pages Function
 * Secure backend proxy for Gemini API
 * The API KEY lives ONLY in Cloudflare Environment Variables
 */

const MODEL = "gemini-3.1-flash-lite-preview";

// === SMART CONTEXT FILTER ===
// Inline corpus data strategy: we load from the embedded corpus
// which you need to deploy alongside (as a KV or inline string).
// For now we use a minimal smart-routing approach based on subject.

const SUBJECTS = {
    ds: ["ds", "data science", "بيانات", "علم البيانات", "preprocessing", "eda", "feature", "ml", "machine learning", "deep learning", "neural", "fairness", "bias"],
    ir: ["ir", "information retrieval", "استرجاع", "boolean", "inverted index", "tf-idf", "بحث", "ranking", "retrieval"],
    cv: ["cv", "computer vision", "رؤية", "image", "صورة", "detection", "segmentation", "cnn"],
    ss: ["ss", "smart systems", "أنظمة ذكية", "fuzzy", "genetic", "agent", "expert system"]
};

function detectSubject(text) {
    const lower = text.toLowerCase();
    for (const [subject, keywords] of Object.entries(SUBJECTS)) {
        if (keywords.some(k => lower.includes(k))) return subject;
    }
    return null;
}

// === SYSTEM INSTRUCTIONS ===
const SYSTEM_INSTRUCTIONS = `
أنت QudahBot، مساعد ذكي تعليمي على منصة QudahWay.

قواعد صارمة لازم تلتزم فيها:
1. تحكي بالعربي الأردني الفصيح، مباشر وواضح.
2. تخص بالمادة العلمية وتشرح بعمق وذكاء.
3. لا تذكر اسم الدكتورة إلا لو سألوك صراحة.
4. لو سألوك مين عمل الموقع: "محمد القضاة" فقط.
5. لا تبدأ ردك بـ "يا هلا" أو "يا وحش" أو أي تحية مكررة.
6. QudahBot وQudahWay دايماً بنسميهم بهالأسماء بدون تغيير.
7. المواد: Data Science (DS), Information Retrieval (IR), Computer Vision (CV), Smart Systems (SS).
8. لو سألوا عن الدكتورة، الجواب: "د. ملك العبدالله".
9. ركز على الشرح التقني المباشر بدون حكي زيادة.
`;

export async function onRequestPost({ request, env }) {
    // CORS Headers
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { query, history = [] } = await request.json();

        if (!query) {
            return new Response(JSON.stringify({ error: "No query provided" }), {
                status: 400,
                headers: corsHeaders
            });
        }

        // Get API Key from Cloudflare Environment (NEVER exposed to frontend)
        const API_KEY = env.GEMINI_API_KEY;
        if (!API_KEY) {
            return new Response(JSON.stringify({ answer: "API key مش متوفرة! ضيفها بـ Cloudflare Secrets." }), {
                status: 200,
                headers: corsHeaders
            });
        }

        // Build conversation with history
        const contents = [];

        // Add history (last 10 turns)
        const recentHistory = history.slice(-10);
        for (const turn of recentHistory) {
            contents.push({ role: turn.role, parts: [{ text: turn.text }] });
        }

        // Add current query
        contents.push({ role: "user", parts: [{ text: query }] });

        // Detect which subject context to inject (optional - you can embed corpus here)
        const subject = detectSubject(query + " " + recentHistory.map(h => h.text).join(" "));

        // Build the request to Gemini
        const geminiPayload = {
            system_instruction: { parts: [{ text: SYSTEM_INSTRUCTIONS }] },
            contents: contents,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024
            }
        };

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

        const geminiResponse = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiPayload)
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error("Gemini API error:", errorText);
            return new Response(JSON.stringify({
                answer: "حدث خطأ في الاتصال بالذكاء الاصطناعي: " + errorText
            }), { status: 200, headers: corsHeaders });
        }

        const geminiData = await geminiResponse.json();
        const answer = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "ما قدرت أجيب جواب. حاول تسأل بطريقة ثانية.";

        return new Response(JSON.stringify({ answer, subject }), {
            status: 200,
            headers: corsHeaders
        });

    } catch (err) {
        console.error("Function error:", err);
        return new Response(JSON.stringify({
            answer: "صارت مشكلة تقنية. حاول مرة ثانية."
        }), { status: 200, headers: corsHeaders });
    }
}

// Handle GET (health check)
export async function onRequestGet() {
    return new Response(JSON.stringify({ status: "QudahBot is alive 🚀" }), {
        headers: { "Content-Type": "application/json" }
    });
}

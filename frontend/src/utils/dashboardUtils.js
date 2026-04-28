export const calculateDashboardStats = (questions, responses) => {
    const stressQuestions = questions.filter(q => q.category === 'stress');
    const copingQuestions = questions.filter(q => q.category === 'coping');
    const stressIds = stressQuestions.map(q => q._id);
    const copingIds = copingQuestions.map(q => q._id);

    // Male count
    const maleCount = responses.filter(r => (r.answers?.gender || r.gender) === 'male').length;

    // Highest Stress
    const stressAnswerCounts = {};
    responses.forEach(r => {
        stressIds.forEach(qid => {
            const ans = r.answers?.[qid];
            if (ans) {
                if (Array.isArray(ans)) {
                    ans.forEach(a => {
                        stressAnswerCounts[a] = (stressAnswerCounts[a] || 0) + 1;
                    });
                } else {
                    stressAnswerCounts[ans] = (stressAnswerCounts[ans] || 0) + 1;
                }
            }
        });
    });

    // Coping
    const copingAnswerCounts = {};
    responses.forEach(r => {
        copingIds.forEach(qid => {
            const ans = r.answers?.[qid];
            if (ans) {
                if (Array.isArray(ans)) {
                    ans.forEach(a => {
                        copingAnswerCounts[a] = (copingAnswerCounts[a] || 0) + 1;
                    });
                } else {
                    copingAnswerCounts[ans] = (copingAnswerCounts[ans] || 0) + 1;
                }
            }
        });
    });

    const topCoping = Object.entries(copingAnswerCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";

    // Question 8 analysis
    const q8Matcher = (q) => {
        if (q.order === 8) return true;
        const text = (q.questionText || "").toLowerCase();
        return text.includes("have you ever experienced a mental illness")
            || text.includes("which one mostly");
    };
    const q8 = questions.find(q8Matcher);
    
    let q8Counts = {};
    let q8TopAnswer = "N/A";

    if (q8) {
        responses.forEach(r => {
            const byId = r.answers?.[q8._id];
            const byField = q8.fieldKey ? (r.answers?.[q8.fieldKey] ?? r[q8.fieldKey]) : undefined;
            const ans = byId ?? byField;
            if (!ans || (Array.isArray(ans) && ans.length === 0)) return;
            if (Array.isArray(ans)) {
                ans.forEach(a => {
                    const key = String(a).trim();
                    if (!key) return;
                    q8Counts[key] = (q8Counts[key] || 0) + 1;
                });
            } else {
                const key = String(ans).trim();
                if (!key) return;
                q8Counts[key] = (q8Counts[key] || 0) + 1;
            }
        });
        q8TopAnswer = Object.entries(q8Counts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";
    }

    return {
        maleCount,
        topCoping,
        q8TopAnswer,
        q8Counts
    };
};

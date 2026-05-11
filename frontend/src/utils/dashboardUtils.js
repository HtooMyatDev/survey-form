export const calculateDashboardStats = (questions, responses) => {
    const stats = {
        totalResponses: responses.length,
        questionStats: {}, // Stores counts for each categorical question
        categoryCounts: {}, // Stores response counts per category
        demographics: {
            male: 0,
            female: 0,
            other: 0
        }
    };

    // Initialize questionStats for categorical questions
    questions.forEach(q => {
        if (q.questionType === 'radio' || q.questionType === 'checkbox') {
            stats.questionStats[q._id] = {
                questionText: q.questionText,
                options: {},
                type: q.questionType
            };
            // Pre-initialize options from question model if they exist
            q.options?.forEach(opt => {
                stats.questionStats[q._id].options[opt.text] = 0;
            });
        }
    });

    responses.forEach(r => {
        // Track demographics specifically if they exist in answers or virtuals
        const gender = (r.answers?.gender || r.gender || "").toLowerCase();
        if (gender.includes('male')) stats.demographics.male++;
        else if (gender.includes('female')) stats.demographics.female++;
        else stats.demographics.other++;

        // Process all answers
        Object.entries(r.answers || {}).forEach(([qid, ans]) => {
            if (stats.questionStats[qid]) {
                const qStat = stats.questionStats[qid];
                if (Array.isArray(ans)) {
                    ans.forEach(a => {
                        qStat.options[a] = (qStat.options[a] || 0) + 1;
                    });
                } else if (ans) {
                    qStat.options[ans] = (qStat.options[ans] || 0) + 1;
                }
            }
        });
    });

    // Determine "Top" metrics for stat boxes
    const topMetrics = [];
    
    // Get top answer for each category or specific questions
    const categories = ['stress', 'coping', 'general'];
    categories.forEach(cat => {
        const catQuestions = questions.filter(q => q.category === cat && stats.questionStats[q._id]);
        if (catQuestions.length > 0) {
            // Find most frequent answer in this category
            let topAnswer = "N/A";
            let maxCount = -1;
            
            catQuestions.forEach(q => {
                Object.entries(stats.questionStats[q._id].options).forEach(([opt, count]) => {
                    if (count > maxCount) {
                        maxCount = count;
                        topAnswer = opt;
                    }
                });
            });
            
            topMetrics.push({
                label: `Top ${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
                value: topAnswer
            });
        }
    });

    return {
        ...stats,
        topMetrics,
        // Keep these for backward compatibility if needed in Dashboard.jsx for now
        maleCount: stats.demographics.male,
        countResponses: responses.length
    };
};

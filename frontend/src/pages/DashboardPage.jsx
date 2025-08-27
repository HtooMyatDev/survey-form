import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import api from "../lib/axios"
const DashboardPage = () => {
    const [countResponses, setCountResponses] = useState(null);
    const [maleCount, setMaleCount] = useState(0);
    // const [topStress, setTopStress] = useState("");
    const [topCoping, setTopCoping] = useState("");
    const [q8TopAnswer, setQ8TopAnswer] = useState("");
    const [q8Counts, setQ8Counts] = useState({});
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all questions
                const qRes = await api.get('/questions');
                const questions = qRes.data;
                const stressQuestions = questions.filter(q => q.category === 'stress');
                const copingQuestions = questions.filter(q => q.category === 'coping');
                const stressIds = stressQuestions.map(q => q._id);
                const copingIds = copingQuestions.map(q => q._id);

                // Fetch all responses
                const res = await api.get('/responses?limit=1000');
                const responses = res.data.responses;
                setCountResponses(res.data.pagination.totalItems);

                // Male count
                const maleCount = responses.filter(r => (r.answers?.gender || r.gender) === 'male').length;
                setMaleCount(maleCount);

                // Highest Stress (most common answer across all stress questions)
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
                // const topStress = Object.entries(stressAnswerCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";
                // setTopStress(topStress);

                // Coping (most common answer across all coping questions)
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
                setTopCoping(topCoping);

                // Question 8 analysis: "Have you ever experienced a mental illness? If so, which one mostly?"
                const q8Matcher = (q) => {
                    if (q.order === 8) return true;
                    const text = (q.questionText || "").toLowerCase();
                    return text.includes("have you ever experienced a mental illness")
                        || text.includes("which one mostly");
                };
                const q8 = questions.find(q8Matcher);
                if (q8) {
                    const counts = {};
                    responses.forEach(r => {
                        // Prefer answers by question id, then by fieldKey
                        const byId = r.answers?.[q8._id];
                        const byField = q8.fieldKey ? (r.answers?.[q8.fieldKey] ?? r[q8.fieldKey]) : undefined;
                        const ans = byId ?? byField;
                        if (!ans || (Array.isArray(ans) && ans.length === 0)) return;
                        if (Array.isArray(ans)) {
                            ans.forEach(a => {
                                const key = String(a).trim();
                                if (!key) return;
                                counts[key] = (counts[key] || 0) + 1;
                            });
                        } else {
                            const key = String(ans).trim();
                            if (!key) return;
                            counts[key] = (counts[key] || 0) + 1;
                        }
                    });
                    setQ8Counts(counts);
                    const top = Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A";
                    setQ8TopAnswer(top);
                } else {
                    setQ8Counts({});
                    setQ8TopAnswer("N/A");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchStats();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">

            <Topbar />
            {/* Sidebar + Main */}
            <div className="flex">
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <section className="bg-white rounded-3xl border border-pink-200 p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-4">Welcome Back, Cutie Admin! 💕</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Here’s your dashboard filled with sparkly data and sweet summaries.
                        </p>

                        {/* Key stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Total Responses</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">{countResponses}</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Male Participants</h3>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{maleCount}</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Highest Stress</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">{q8TopAnswer}</p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-2xl shadow-sm border border-pink-200">
                                <h3 className="text-lg font-semibold">Coping</h3>
                                <p className="text-3xl font-bold text-pink-600 mt-2">{topCoping}</p>
                            </div>
                        </div>
                        {/* Q8 breakdown */}
                        <section className="mt-6 bg-white rounded-3xl border border-pink-200 p-6 shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Question 8 Breakdown</h3>
                            {Object.keys(q8Counts).length === 0 ? (
                                <p className="text-sm text-gray-600">No data available.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Object.entries(q8Counts)
                                        .sort((a, b) => b[1] - a[1])
                                        .map(([label, count]) => (
                                            <div key={label} className="flex items-center justify-between bg-pink-50 border border-pink-200 rounded-xl px-4 py-2">
                                                <span className="text-sm text-gray-700 truncate pr-2" title={label}>{label}</span>
                                                <span className="text-sm font-semibold text-pink-700">{count}</span>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </section>
                    </section>

                    {/* Footer */}
                    {/* <footer className="mt-10 text-center text-sm text-pink-400">
                        <p>Made with 💖 and bubble tea by Hello Kitty's team</p>
                    </footer> */}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;

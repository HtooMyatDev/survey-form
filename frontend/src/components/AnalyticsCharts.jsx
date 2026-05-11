import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
} from 'chart.js';
import { Bar, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

const AnalyticsCharts = ({ stats }) => {
    const questionEntries = Object.entries(stats.questionStats || {});

    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { family: "'Outfit', sans-serif" },
                    color: '#db2777' // pink-600
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#db2777' },
                grid: { color: 'rgba(219, 39, 119, 0.1)' }
            },
            x: {
                ticks: { color: '#db2777' },
                grid: { display: false }
            }
        }
    };

    // Color palette for charts
    const colors = [
        'rgba(236, 72, 153, 0.6)', // pink-500
        'rgba(59, 130, 246, 0.6)', // blue-500
        'rgba(16, 185, 129, 0.6)', // emerald-500
        'rgba(245, 158, 11, 0.6)', // amber-500
        'rgba(139, 92, 246, 0.6)', // violet-500
    ];

    const borderColors = [
        'rgba(236, 72, 153, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(139, 92, 246, 1)',
    ];

    return (
        <div className="mt-8 space-y-8">
            {/* Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-4 text-pink-700 w-full">Gender Distribution</h3>
                    <div className="w-full max-w-[300px]">
                        <Pie 
                            data={{
                                labels: ['Male', 'Female', 'Other'],
                                datasets: [{
                                    data: [stats.demographics.male, stats.demographics.female, stats.demographics.other],
                                    backgroundColor: colors.slice(0, 3),
                                    borderColor: borderColors.slice(0, 3),
                                    borderWidth: 1
                                }]
                            }} 
                            options={commonOptions} 
                        />
                    </div>
                </div>

                {/* Top Metrics Summary */}
                <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-pink-700">Quick Insights</h3>
                    <div className="space-y-4">
                        {stats.topMetrics?.map((m, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-pink-50 rounded-xl border border-pink-100">
                                <span className="text-pink-600 font-medium">{m.label}</span>
                                <span className="text-pink-800 font-bold">{m.value}</span>
                            </div>
                        ))}
                        {stats.topMetrics?.length === 0 && <p className="text-gray-400 italic">No category data yet...</p>}
                    </div>
                </div>
            </div>

            {/* Dynamic Question Charts */}
            <h2 className="text-2xl font-bold text-pink-800 mt-12 mb-6">Question Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {questionEntries.map(([qid, qData], index) => {
                    const labels = Object.keys(qData.options);
                    const values = Object.values(qData.options);

                    // Skip questions with no answers to keep dashboard clean
                    if (values.every(v => v === 0)) return null;

                    const data = {
                        labels,
                        datasets: [{
                            label: 'Responses',
                            data: values,
                            backgroundColor: colors[index % colors.length],
                            borderColor: borderColors[index % borderColors.length],
                            borderWidth: 1,
                            borderRadius: 8
                        }]
                    };

                    return (
                        <div key={qid} className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm">
                            <h3 className="text-md font-bold mb-4 text-pink-700 line-clamp-2" title={qData.questionText}>
                                {qData.questionText}
                            </h3>
                            <div className="h-[300px] flex items-center justify-center">
                                {qData.type === 'checkbox' ? (
                                    <Bar data={data} options={{ ...commonOptions, indexAxis: 'y' }} />
                                ) : (
                                    <Bar data={data} options={commonOptions} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnalyticsCharts;

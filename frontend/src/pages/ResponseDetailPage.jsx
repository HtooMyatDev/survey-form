import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import api from "../lib/axios"

const ResponseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const res = await api.get(`/responses/${id}`);
                setResponse(res.data);
            } catch {
                setError('Failed to fetch response.');
            } finally {
                setLoading(false);
            }
        };
        fetchResponse();
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white text-pink-700">
            <Topbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-2 sm:p-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-4 px-4 py-2 rounded-full bg-pink-200 text-pink-700 font-semibold hover:bg-pink-300 transition"
                    >
                        ← Back
                    </button>
                    <section className="bg-white rounded-3xl border border-pink-200 p-4 sm:p-6 shadow-md w-full">
                        {loading && (
                            <div className="flex justify-center items-center min-h-40 text-lg">Loading response...</div>
                        )}
                        {error && (
                            <div className="text-red-500 text-center">{error}</div>
                        )}
                        {response && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Survey Response Details</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <DetailRow label="Age" value={response.age} />
                                    <DetailRow label="Gender" value={response.gender} />
                                    <DetailRow label="Occupation" value={response.occupation} />
                                    <DetailRow label="Mental Illness Causes" value={response.mental_illness_causes?.join(', ')} />
                                    <DetailRow label="Mental Illness Treatable" value={response.mental_illness_treatable} />
                                    <DetailRow label="Know Where to Seek Help" value={response.know_where_to_seek_help} />
                                    <DetailRow label="Perceive Mentally Ill as Dangerous" value={response.perceive_mentally_ill_as_dangerous} />
                                    <DetailRow label="Spoken with Professional" value={response.spoken_with_professional} />
                                    <DetailRow label="Barrier to Mental Health Support" value={response.barrier_to_mental_health_support} />
                                    <DetailRow label="Mental Serious as Physical" value={response.mental_serious_as_physical} />
                                    <DetailRow label="Live Normal" value={response.live_normal} />
                                    <DetailRow label="Believe Spiritual Helps" value={response.believe_spiritual_helps} />
                                    <DetailRow label="Think About Mental" value={response.think_about_mental} />
                                    <DetailRow label="Do When Feel Stressed" value={response.do_when_feel_stressed} />
                                    <DetailRow label="Describe in One Word" value={response.describe_in_one_word} />
                                    <DetailRow label="Rate Mental Health" value={response.rate_mental_health} />
                                    <DetailRow label="Mental Health Day" value={response.mental_health_day} />
                                    <DetailRow label="Easier to Open Up" value={response.easier_to_open_up?.join(', ')} />
                                    <DetailRow label="Future Connection" value={response.future_connection} />
                                    <DetailRow label="Submitted At" value={new Date(response.createdAt).toLocaleString()} />
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center border-b border-pink-100 py-2">
        <span className="font-semibold w-56">{label}:</span>
        <span className="ml-2 break-all">{value}</span>
    </div>
)

export default ResponseDetailPage

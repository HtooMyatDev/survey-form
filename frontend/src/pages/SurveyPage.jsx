import React, { useState } from 'react';
import { Heart, Star, Sparkles, Send, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from "../lib/axios.js"
import { useNavigate } from "react-router"
const HelloKittySurvey = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState({
        // Demographics
        age: '',
        gender: '',
        occupation: '',

        // Survey questions
        close_someone_with_mental_illness: '',
        mental_illness_causes: [],
        mental_illness_treatable: '',
        know_where_to_seek_help: '',
        perceive_mentally_ill_as_dangerous: '',
        spoken_with_professional: '',
        barrier_to_mental_health_support: '',

        // Additional questions
        mental_serious_as_physical: '',
        live_normal: '',
        believe_spiritual_helps: '',
        think_about_mental: '',
        do_when_feel_stressed: '',
        do_when_feel_stressed_other: '',
        describe_in_one_word: '',
        rate_mental_health: '',
        mental_health_day: '',
        easier_to_open_up: [],
        easier_to_open_up_other: '',
        future_connection: ''
    });
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate(); ``

    const sections = [
        {
            title: "About You 🌸",
            subtitle: "Tell us a little about yourself"
        },
        {
            title: "Mental Health Awareness 💕",
            subtitle: "Your thoughts on mental health"
        },
        {
            title: "Additional Questions 🎀",
            subtitle: "Help us learn more about your experiences"
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const handleNextSection = () => {
        // Validate current section before proceeding
        if (currentSection === 0) {
            // Validate demographics section
            if (!formData.age || !formData.gender || !formData.occupation) {
                toast.error('Please fill in all required fields to continue to next page! ', {
                    duration: 4000,
                    style: {
                        background: '#FFE4E1',
                        color: '#DC143C',
                        border: '2px solid #FF69B4',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                    }
                });
                return;
            }
        } else if (currentSection === 1) {
            // Validate mental health section
            if (!formData.close_someone_with_mental_illness ||
                formData.mental_illness_causes.length === 0 ||
                !formData.mental_illness_treatable ||
                !formData.know_where_to_seek_help ||
                !formData.perceive_mentally_ill_as_dangerous ||
                !formData.spoken_with_professional ||
                !formData.barrier_to_mental_health_support) {
                toast.error('Please answer all questions before continuing!', {
                    duration: 4000,
                    style: {
                        background: '#FFE4E1',
                        color: '#DC143C',
                        border: '2px solid #FF69B4',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                    }
                });
                return;
            }
        }

        setCurrentSection(currentSection + 1);
    };

    const handleSubmit = async () => {
        // Validate final section before submitting
        if (!formData.mental_serious_as_physical ||
            !formData.live_normal ||
            !formData.believe_spiritual_helps ||
            formData.think_about_mental.length === 0 ||
            !formData.do_when_feel_stressed ||
            (formData.do_when_feel_stressed.includes('other') && !formData.do_when_feel_stressed_other) ||
            formData.describe_in_one_word.length === 0 ||
            !formData.rate_mental_health ||
            !formData.mental_health_day ||
            !formData.easier_to_open_up ||
            (formData.easier_to_open_up.includes("others") && !formData.easier_to_open_up_other) ||
            !formData.future_connection) {
            toast.error('Please complete all questions before submitting!', {
                duration: 4000,
                style: {
                    background: '#FFE4E1',
                    color: '#DC143C',
                    border: '2px solid #FF69B4',
                    borderRadius: '20px',
                    fontWeight: 'bold'
                }
            });
            return;
        }

        let finalOpenUpAnswers = [...formData.easier_to_open_up];
        if (
            finalOpenUpAnswers.includes("others") &&
            formData.easier_to_open_up_other.trim()
        ) {
            finalOpenUpAnswers = finalOpenUpAnswers.map((val) =>
                val === "others" ? formData.easier_to_open_up_other.trim() : val
            );
        }

        let doWhenStressed = formData.do_when_feel_stressed === "other"
            ? formData.do_when_feel_stressed_other.trim()
            : formData.do_when_feel_stressed;

        const payload = {
            ...formData,
            do_when_feel_stressed: doWhenStressed,
            easier_to_open_up: finalOpenUpAnswers,
        };

        // send survey to backend
        try {
            await api.post("/responses", payload);
            toast.success('Thank you for sharing, cutie! Your responses help us understand mental health better! 💕', {
                duration: 5000,
                style: {
                    background: '#FFB6C1',
                    color: '#FF1493',
                    border: '2px solid #FF69B4',
                    borderRadius: '20px',
                    fontWeight: 'bold'
                }
            });
            navigate("/success");
        } catch (error) {
            if (error.response.status === 429) {
                toast.error("Slow down, you are submitting surveys way too fast", {
                    duration: 4000,
                    icon: "👀",
                });
            } else {
                toast.error("Failed to submit survey");
            }
        } finally {
            setLoading(false);
        }

    };

    const FloatingElement = ({ children, className, delay = "0s" }) => (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: delay
            }}
        >
            {children}
        </div>
    );

    const RadioGroup = ({ name, options, value, onChange, required = false }) => (
        <div className="space-y-3">
            {options.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="radio radio-primary radio-sm"
                        required={required}

                    />
                    <span className="text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );

    const CheckboxGroup = ({ options, values, onChange }) => (
        <div className="space-y-3">
            {options.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors">
                    <input
                        type="checkbox"
                        checked={values.includes(option.value)}
                        onChange={() => onChange(option.value)}
                        className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-white relative overflow-hidden">
            <Toaster position="top-center" />

            {/* Floating decorative elements */}
            <FloatingElement className="top-10 left-10 text-pink-300" delay="0s">
                <Heart size={24} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="top-20 right-20 text-pink-400" delay="1s">
                <Star size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="top-40 left-1/4 text-pink-200" delay="2s">
                <Sparkles size={18} />
            </FloatingElement>
            <FloatingElement className="bottom-20 right-10 text-pink-300" delay="0.5s">
                <Heart size={20} fill="currentColor" />
            </FloatingElement>
            <FloatingElement className="bottom-40 left-20 text-pink-400" delay="1.5s">
                <Star size={22} fill="currentColor" />
            </FloatingElement>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block relative">
                        <div className="w-20 h-20 bg-white rounded-full border-4 border-pink-300 mx-auto mb-4 flex items-center justify-center shadow-lg">
                            <div className="relative">
                                <div className="w-14 h-10 bg-pink-100 rounded-full relative">
                                    <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-pink-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-pink-600 mb-2">Mental Health Survey</h1>
                        <p className="text-pink-400 text-sm">Help us understand mental health awareness 🎀</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-pink-600 font-medium">Progress</span>
                        <span className="text-sm text-pink-600 font-medium">{currentSection + 1} of {sections.length}</span>
                    </div>
                    <div className="w-full bg-pink-100 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Survey Content */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-pink-600 mb-2">{sections[currentSection].title}</h2>
                            <p className="text-pink-400">{sections[currentSection].subtitle}</p>
                        </div>

                        {/* Section 0: Demographics */}
                        {currentSection === 0 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-pink-600 font-semibold mb-2">1. Age *</label>
                                    <input
                                        type="number"
                                        value={formData.age}
                                        onChange={(e) => handleInputChange('age', e.target.value)}
                                        placeholder="Enter your age"
                                        className="input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 rounded-2xl text-gray-800 placeholder-pink-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">2. Gender *</label>
                                    <RadioGroup
                                        name="gender"
                                        value={formData.gender}
                                        onChange={(value) => handleInputChange('gender', value)}
                                        required
                                        options={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' },
                                            { value: 'non binary', label: 'Non-binary' },
                                            { value: 'prefer not to say', label: 'Prefer not to say' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-2">3. Occupation *</label>
                                    <input
                                        type="text"
                                        value={formData.occupation}
                                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                                        placeholder="Enter your occupation"
                                        className="input input-bordered w-full bg-pink-50 border-pink-200 focus:border-pink-400 rounded-2xl text-gray-800 placeholder-pink-400"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Section 1: Mental Health Questions */}
                        {currentSection === 1 && (
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        4. Have you or someone close to you ever experienced a mental illness?
                                    </label>
                                    <RadioGroup
                                        name="close_someone_with_mental_illness"
                                        value={formData.close_someone_with_mental_illness}
                                        onChange={(value) => handleInputChange('close_someone_with_mental_illness', value)}
                                        options={[
                                            { value: 'yes', label: 'Yes' },
                                            { value: 'no', label: 'No' },
                                            { value: 'prefer not to say', label: 'Prefer not to say' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        5. Do you believe mental illness is caused by: (Select all that apply)
                                    </label>
                                    <CheckboxGroup
                                        values={formData.mental_illness_causes}
                                        onChange={(value) => handleCheckboxChange('mental_illness_causes', value)}
                                        options={[
                                            { value: 'genetic', label: 'Genetic factors' },
                                            { value: 'lifestyle', label: 'Poor lifestyle choices' },
                                            { value: 'personality', label: 'Weak personality' },
                                            { value: 'trauma', label: 'Traumatic life experiences' },
                                            { value: 'chemical', label: 'Brain chemical imbalances' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        6. Mental illness is treatable.
                                    </label>
                                    <RadioGroup
                                        name="treatable"
                                        value={formData.mental_illness_treatable}
                                        onChange={(value) => handleInputChange('mental_illness_treatable', value)}
                                        options={[
                                            { value: 'strongly agree', label: 'Strongly agree' },
                                            { value: 'agree', label: 'Agree' },
                                            { value: 'neutral', label: 'Neutral' },
                                            { value: 'disagree', label: 'Disagree' },
                                            { value: 'strongly disagree', label: 'Strongly disagree' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        7. Do you know where to seek help for mental health issues in your community?
                                    </label>
                                    <RadioGroup
                                        name="seekHelp"
                                        value={formData.know_where_to_seek_help}
                                        onChange={(value) => handleInputChange('know_where_to_seek_help', value)}
                                        options={[
                                            { value: 'yes', label: 'Yes' },
                                            { value: 'no', label: 'No' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        8. People with mental illness are dangerous.
                                    </label>
                                    <RadioGroup
                                        name="dangerous"
                                        value={formData.perceive_mentally_ill_as_dangerous}
                                        onChange={(value) => handleInputChange('perceive_mentally_ill_as_dangerous', value)}
                                        options={[
                                            { value: 'strongly agree', label: 'Strongly agree' },
                                            { value: 'agree', label: 'Agree' },
                                            { value: 'neutral', label: 'Neutral' },
                                            { value: 'disagree', label: 'Disagree' },
                                            { value: 'strongly disagree', label: 'Strongly disagree' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        9. Have you ever talked to a mental health professional (e.g., counselor, psychologist, psychiatrist)?
                                    </label>
                                    <RadioGroup
                                        name="professional"
                                        value={formData.spoken_with_professional}
                                        onChange={(value) => handleInputChange('spoken_with_professional', value)}
                                        options={[
                                            { value: 'yes', label: 'Yes' },
                                            { value: 'no', label: 'No' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        10. What do you think is the biggest barrier to getting mental health support?
                                    </label>
                                    <RadioGroup
                                        name="barrier"
                                        value={formData.barrier_to_mental_health_support}
                                        onChange={(value) => handleInputChange('barrier_to_mental_health_support', value)}
                                        options={[
                                            { value: 'cost', label: 'Cost' },
                                            { value: 'stigma', label: 'Stigma/shame' },
                                            { value: 'lack services', label: 'Lack of services' },
                                            { value: 'not knowing', label: 'Not knowing where to go' },
                                            { value: 'others opinions', label: "Others' opinions" }
                                        ]}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Section 2: Additional Questions */}
                        {currentSection === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        11. Mental illness is just as serious as physical illness.
                                    </label>
                                    <RadioGroup
                                        name="mentalSeriousAsPhysical"
                                        value={formData.mental_serious_as_physical}
                                        onChange={(value) => handleInputChange('mental_serious_as_physical', value)}
                                        options={[
                                            { value: 'strongly agree', label: 'Strongly agree' },
                                            { value: 'agree', label: 'Agree' },
                                            { value: 'neutral', label: 'Neutral' },
                                            { value: 'disagree', label: 'Disagree' },
                                            { value: 'strongly disagree', label: 'Strongly disagree' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        12. People with mental illness can live normal and successful lives.
                                    </label>
                                    <RadioGroup
                                        name="liveNormal"
                                        value={formData.live_normal}
                                        onChange={(value) => handleInputChange('live_normal', value)}
                                        options={[
                                            { value: 'strongly agree', label: 'Strongly agree' },
                                            { value: 'agree', label: 'Agree' },
                                            { value: 'neutral', label: 'Neutral' },
                                            { value: 'disagree', label: 'Disagree' },
                                            { value: 'strongly disagree', label: 'Strongly disagree' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        13. Do you believe spiritual practices (e.g., prayer, meditation) can help mental health?
                                    </label>
                                    <RadioGroup
                                        name="spiritualHelpsMental"
                                        value={formData.believe_spiritual_helps}
                                        onChange={(value) => handleInputChange('believe_spiritual_helps', value)}
                                        options={[
                                            { value: 'yes', label: 'Yes' },
                                            { value: 'no', label: 'No' },
                                            { value: 'not sure', label: 'Not sure' }
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        14. How often do you think about your own mental health?
                                    </label>
                                    <RadioGroup
                                        name="thinkAboutYourOwnMental"
                                        value={formData.think_about_mental}
                                        onChange={(value) => handleInputChange('think_about_mental', value)}
                                        options={[
                                            { value: 'daily', label: 'Daily' },
                                            { value: 'weekly', label: 'Weekly' },
                                            { value: 'sometimes', label: 'Sometimes' },
                                            { value: 'rarely', label: 'Rarely' },
                                            { value: 'never', label: 'Never' },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        15. When you feel stressed or overwhelmed, what do you usually do?
                                    </label>
                                    <RadioGroup
                                        name="doWhenStressed"
                                        value={formData.do_when_feel_stressed}
                                        onChange={(value) => handleInputChange('do_when_feel_stressed', value)}
                                        options={[
                                            { value: 'talk to someone', label: 'Talk to someone' },
                                            { value: 'keep it to myself', label: 'Keep it to myself' },
                                            { value: 'exercise', label: 'Exercise' },
                                            { value: 'use social media', label: 'Use social media' },
                                            { value: 'sleep', label: 'Sleep' },
                                            { value: 'other', label: 'Other' }
                                        ]}
                                    />
                                    {formData.do_when_feel_stressed === "other" && (
                                        <input
                                            type="text"
                                            value={formData.do_when_feel_stressed_other}
                                            onChange={(e) =>
                                                handleInputChange("do_when_feel_stressed_other", e.target.value)
                                            }
                                            placeholder="Please specify..."
                                            className="mt-2 w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-500"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        16. How would you describe your life in one word?
                                    </label>
                                    <RadioGroup
                                        name="describeInOneWord"
                                        value={formData.describe_in_one_word}
                                        onChange={(value) => handleInputChange('describe_in_one_word', value)}
                                        options={[
                                            { value: 'excellent', label: 'Excellent' },
                                            { value: 'good', label: 'Good' },
                                            { value: 'fair', label: 'Fair' },
                                            { value: 'poor', label: 'Poor' },
                                            { value: 'very poor', label: 'Very poor' },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        17.How would you rate your current mental health?
                                    </label>
                                    <RadioGroup
                                        name="rateMentalHealth"
                                        value={formData.rate_mental_health}
                                        onChange={(value) => handleInputChange('rate_mental_health', value)}
                                        options={[
                                            { value: 'excellent', label: 'Excellent' },
                                            { value: 'good', label: 'Good' },
                                            { value: 'fair', label: 'Fair' },
                                            { value: 'poor', label: 'Poor' },
                                            { value: 'very poor', label: 'Very poor' },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        18. Have you ever taken a break (e.g., mental health day) to care for your well-being?
                                    </label>
                                    <RadioGroup
                                        name="mentalHealthDay"
                                        value={formData.mental_health_day}
                                        onChange={(value) => handleInputChange('mental_health_day', value)}
                                        options={[
                                            { value: 'yes', label: 'Yes' },
                                            { value: 'no', label: 'No' },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-pink-600 font-semibold mb-3">
                                        19. What would make it easier for people to open up about mental health? (Choose all that apply)
                                    </label>
                                    <CheckboxGroup
                                        values={formData.easier_to_open_up}
                                        onChange={(value) => handleCheckboxChange('easier_to_open_up', value)}
                                        options={[
                                            { value: 'less stigma', label: 'Less stigma' },
                                            { value: 'more awareness/education', label: 'More awareness/education' },
                                            { value: 'supportive friends/family', label: 'Supportive friends/family' },
                                            { value: 'free counseling', label: 'Free counseling' },
                                            { value: 'media representaion', label: 'Media representaion' },
                                            { value: 'others', label: 'Others' },
                                        ]}
                                    />
                                    {formData.easier_to_open_up.includes('others') && (
                                        <input
                                            type="text"
                                            value={formData.easier_to_open_up_other}
                                            onChange={(e) =>
                                                handleInputChange("easier_to_open_up_other", e.target.value)
                                            }
                                            placeholder="Please specify..."
                                            className="mt-2 w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-500"
                                        />
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-pink-700 font-semibold mb-2">
                                        20. Do you feel more connected to your past or your future? Why?
                                    </label>
                                    <textarea
                                        name="futureConnection"
                                        value={formData.future_connect}
                                        onChange={(e) => handleInputChange("future_connection", e.target.value)}
                                        className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-500"
                                        rows={4}
                                        placeholder="Write your thoughts here..."
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-pink-200">
                            {currentSection > 0 && (
                                <button
                                    onClick={() => setCurrentSection(currentSection - 1)}
                                    className="btn btn-outline border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-2xl"
                                >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Previous
                                </button>
                            )}

                            <div className="ml-auto">
                                {currentSection < sections.length - 1 ? (
                                    <button
                                        onClick={handleNextSection}
                                        className="btn bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 border-none text-white font-bold rounded-2xl"
                                    >
                                        Next
                                        <Heart size={16} className="ml-2" fill="currentColor" />
                                    </button>
                                ) : (
                                    <button
                                        disabled={isLoading}
                                        onClick={handleSubmit}
                                        className="btn bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 border-none text-white font-bold rounded-2xl"
                                    >

                                        {isLoading ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            <>
                                                Submit Survey
                                                <Send size={16} className="ml-2" />
                                            </>
                                        )}

                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    );
};

export default HelloKittySurvey;

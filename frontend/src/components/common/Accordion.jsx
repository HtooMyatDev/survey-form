import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index} className="border border-pink-200 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between bg-pink-50 hover:bg-pink-100 px-4 py-3 transition-colors"
                    >
                        <span className="font-semibold text-gray-800">{item.title}</span>
                        {openIndex === index ? (
                            <ChevronUp size={20} className="text-pink-600" />
                        ) : (
                            <ChevronDown size={20} className="text-pink-600" />
                        )}
                    </button>
                    {openIndex === index && (
                        <div className="bg-white px-4 py-3 border-t border-pink-200">
                            {typeof item.content === 'string' ? (
                                <p className="text-gray-700">{item.content}</p>
                            ) : (
                                item.content
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;

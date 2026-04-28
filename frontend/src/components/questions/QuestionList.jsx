import React from 'react';
import QuestionTable from './QuestionTable';
import QuestionCard from './QuestionCard';

const QuestionList = ({ questions, onEdit, onDelete }) => {
    return (
        <>
            {/* Desktop Table - hidden on mobile */}
            <QuestionTable 
                questions={questions} 
                onEdit={onEdit} 
                onDelete={onDelete} 
            />

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {questions.map((question) => (
                    <QuestionCard 
                        key={question._id} 
                        question={question} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    />
                ))}
            </div>
        </>
    );
};

export default QuestionList;

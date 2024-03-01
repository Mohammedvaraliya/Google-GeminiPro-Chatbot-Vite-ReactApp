import React, { useState } from 'react';
import StarRating from './StarRating';

interface FeedbackFormProps {
    onSubmit: (rating: number, feedback: string) => void;
    responseReceived: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, responseReceived }) => {
    const [userFeedback, setUserFeedback] = useState<string>('');
    const [userRating, setUserRating] = useState<number>(0);

    const handleRatingChange = (newRating: number) => {
        setUserRating(newRating);
    };

    const handleSubmit = () => {
        console.log("Submitting feedback:", userRating, userFeedback);
        onSubmit(userRating, userFeedback);
        setUserRating(0);
        setUserFeedback("");
    };

    return (
        <>
            <div className='h-12 gap-x-1.5  border-none flex ml-2 px-4 rounded-md mb-2'>
                <StarRating value={userRating} onChange={handleRatingChange} />
            </div>
            <input
                type="text"
                value={userFeedback}
                onChange={(e) => setUserFeedback(e.target.value)}
                className="h-11 gap-x-1.5 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 flex ml-2 px-4 rounded-md mb-2"
                placeholder="Provide feedback"
                disabled={responseReceived}
            />
            <button
                onClick={handleSubmit}
                className="h-11 ml-2 gap-x-1.5 bg-gray-800 hover:bg-slate-500 text-light-1 align-middle px-8 rounded-md"
            >
                Submit Feedback
            </button>
        </>
    );
};

export default FeedbackForm;

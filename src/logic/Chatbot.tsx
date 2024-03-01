import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
// @ts-ignore
import initializeAppwriteService from '../appwrite/appwriteService.js';
// @ts-ignore
import conf from "../conf/conf";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import FeedbackForm from '../components/FeedbackForm.js';

interface ChatMessage {
    role: 'user' | 'model';
    parts: [{ text: string }];
}

const Chatbot: React.FC = () => {

    const appwriteService = initializeAppwriteService();

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [userInput, setUserInput] = useState<string>('');
    const [userMessages, setUserMessages] = useState<string[]>([]);
    const [modelResponses, setModelResponses] = useState<string[]>([]);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const [responseReceived, setResponseReceived] = useState<boolean>(false);

    const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(true);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

    const MODEL_NAME = 'gemini-pro';
    const VITE_API_KEY = conf.geminiproApiKey;
    const API_KEY = VITE_API_KEY || '';


    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.5,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];


    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: messages,
    });

    const handleSendMessage = async () => {

        try {
            // Add the user's message to messages immediately
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "user", parts: [{ text: userInput }] },
            ]);

            setUserMessages([...userMessages, userInput]);
            setUserInput('');

            setResponseReceived(true);

            const result = await chat.sendMessage(userInput);
            const response = result.response;
            // console.log(response)

            // Update the messages with the model's response
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "model", parts: [{ text: response.text() }] },
            ]);

            setModelResponses([...modelResponses, response.text()]);

            setResponseReceived(false);
            // Hide the feedback form after submission
            setShowFeedbackForm(true);
            setFeedbackSubmitted(false);
        } catch (error) {
            console.error('Error generating the response:', error);
        }


    };

    const handleSubmit = async (rating: number, feedback: string) => {
        console.log("Submitting feedback:", rating, feedback);
        // Save to Appwrite Database
        try {
            console.log("Saving data to Appwrite...");

            const latestUserInput = userMessages[userMessages.length - 1];
            const latestModelResponse = modelResponses[modelResponses.length - 1];

            await appwriteService.saveData({
                query: latestUserInput,
                response: latestModelResponse,
                user_rating: rating,
                user_feedback: feedback
            });

            console.log("Data saved successfully!");

            // Log the list of documents after saving
            const documentList = await appwriteService.listData();
            console.log("List of documents:", documentList);

            // Hide the feedback form after submission
            setShowFeedbackForm(false);
            setFeedbackSubmitted(true);
        } catch (error) {
            console.error('Error saving or listing data to Appwrite:', error);
        }
    };

    // Load predefined chat history from JSON file
    useEffect(() => {

        const loadChatHistory = async () => {
            try {
                const response = await fetch('/assets/data/dataset_2.json');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error loading chat history:', error);
            }
        };

        loadChatHistory();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className="max-xs:h-full max-xs:m-0 max-xs:p-0 xs:h-full xs:m-0 xs:p-0 sm:h-full sm:m-0 sm:p-0 md:h-full md:p-0 md:m-0 xl:h-auto xl:mt-10 xl:pt-10 max-xl:h-auto max-xl:mt-10 max-xl:pt-10 absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-dark-2 rounded-lg p-8 shadow-lg w-lvw max-w-screen-lg flex flex-col h-full">
                {/* Chatbot Header Div */}
                <div className="border-b-2 px-2 py-4 min-w-4xl">
                    <div className="inline-flex items-center">
                        <img src="/assets/college_logo.jpg" alt="logo" className="w-8" />
                        <span className="ml-8">MVLU College ChatBot</span>
                    </div>
                </div>

                {/* Chatbot Body Div */}
                <div ref={chatContainerRef} className="flex-1 overflow-auto mb-4 mt-4 custom-scrollbar">
                    {/* Display only the ongoing conversation starting from the 6th element */}
                    {messages.slice(18).map((message, index) => (
                        <div key={index} className={`mb-2 flex`}>
                            {message.role === 'user' ? (
                                <div className={`flex justify-end text-light-1 w-full mr-2 xl:ml-96 xs:ml-11`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="bg-cyan-900 p-2 inline-block rounded-b-xl rounded-tl-xl mb-2 mt-2">{message.parts[0].text}</ReactMarkdown>
                                    {/* {console.log(message.parts[0].text)} */}
                                </div>
                            ) : (
                                <div className={`flex flex-col justify-start text-light-1 w-full xl:mr-96 xs:mr-11`}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="bg-slate-900 p-2 text-white rounded-b-xl rounded-tr-xl mb-2 mt-2">{message.parts[0].text}</ReactMarkdown>

                                    {/* Conditionally render the feedback form based on the state */}
                                    {showFeedbackForm && !feedbackSubmitted && message.parts[0].text === modelResponses[modelResponses.length - 1] ? (
                                        <FeedbackForm onSubmit={handleSubmit} responseReceived={responseReceived} />
                                    ) : (
                                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                            <span className="font-medium">Thank you!</span> Your Feedback has been submitted.
                                        </div>
                                    )}

                                </div>

                            )}
                        </div>
                    ))}
                </div>

                {/* Chatbot Footer Div */}
                <div className="border-t-2 flex items-center py-4 px-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && userInput.length > 1) {
                                handleSendMessage();
                            }
                        }}
                        className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 flex-1 px-4 rounded-md mr-2"
                        placeholder="Type your query here..."
                        disabled={responseReceived}
                    />
                    <button
                        onClick={() => {
                            handleSendMessage();
                        }}
                        className="h-12 bg-amber-500 hover:bg-amber-300 text-light-1 px-4 rounded-md"
                        disabled={responseReceived || userInput.length <= 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 24" fill="none">
                            <path
                                d="M23.4846 11.1056L1.48455 0.105612C1.31212 0.0193786 1.11844 -0.0151732 0.926831 0.00611689C0.735219 0.027407 0.553847 0.103631 0.404552 0.225612C0.261977 0.345104 0.155559 0.501998 0.0972618 0.678656C0.0389648 0.855313 0.0311003 1.04473 0.0745524 1.22561L2.72455 10.9956H14.0346V12.9956H2.72455L0.0345524 22.7356C-0.00622112 22.8867 -0.0109806 23.0452 0.0206567 23.1984C0.052294 23.3516 0.119446 23.4953 0.216711 23.6179C0.313977 23.7404 0.438643 23.8384 0.580686 23.904C0.722729 23.9697 0.878184 24.001 1.03455 23.9956C1.19109 23.9947 1.34523 23.957 1.48455 23.8856L23.4846 12.8856C23.6484 12.8017 23.7858 12.6742 23.8818 12.5172C23.9778 12.3601 24.0286 12.1797 24.0286 11.9956C24.0286 11.8116 23.9778 11.6311 23.8818 11.4741C23.7858 11.317 23.6484 11.1895 23.4846 11.1056Z"
                                fill="black" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Chatbot;

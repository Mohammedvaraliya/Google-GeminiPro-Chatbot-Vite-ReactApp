import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface ChatMessage {
    role: 'user' | 'model';
    parts: [{ text: string }];
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [userInput, setUserInput] = useState<string>('');
    const [userMessages, setUserMessages] = useState<string[]>([]);
    const [modelResponses, setModelResponses] = useState<string[]>([]);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const MODEL_NAME = 'gemini-pro';
    const VITE_API_KEY = process.env.VITE_GEMINI_PRO_API_KEY;
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

        // Add the user's message to messages immediately
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", parts: [{ text: userInput }] },
        ]);

        setUserMessages([...userMessages, userInput]);
        setUserInput('');

        const result = await chat.sendMessage(userInput);
        const response = result.response;

        // Update the messages with the model's response
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "model", parts: [{ text: response.text() }] },
        ]);

        setModelResponses([...modelResponses, response.text()]);

    };

    // Load predefined chat history from JSON file
    useEffect(() => {

        const loadChatHistory = async () => {
            try {
                const response = await fetch('/assets/data/dataset.json');
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
    }, [messages]);

    return (
        <div className="xs:h-full xs:m-0 xs:p-0 xl:m-10 xl:p-10 md:p-0 md:m-0 absolute inset-0 flex flex-col items-center justify-center">
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
                    {messages.slice(6).map((message, index) => (
                        <div key={index} className={`mb-2 flex`}>
                            {message.role === 'user' ? (
                                <div className={`flex justify-end text-light-1 w-full mr-2 ml-96 sm:ml-36`}>
                                    <p className="bg-blue-500 p-2 inline-block rounded-b-xl rounded-tl-xl mb-2 mt-2">{message.parts[0].text}</p>
                                </div>
                            ) : (
                                <div className={`flex justify-start text-light-1 w-full mr-96 sm:mr-36`}>
                                    <p className="bg-gray-500 p-2 inline-block text-white rounded-b-xl rounded-tr-xl mb-2 mt-2">{message.parts[0].text}</p>
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
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 flex-1 px-4 rounded-md mr-2"
                        placeholder="Type your query here..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="h-12 bg-primary-500 hover:bg-primary-600 text-light-1 px-4 rounded-md"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Chatbot;

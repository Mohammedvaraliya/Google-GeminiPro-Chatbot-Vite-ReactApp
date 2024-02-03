const ChatbotUI = () => {
    return (
        <div className="w-full m-10 p-10">

            {/* Chatbot Div */}
            <div className="bg-white shadow-lg rounded-lg max-w-md">

                {/* Chatbot Header Div */}
                <div className="border-b-2 px-2 py-4">
                    <div className="inline-flex items-center">
                        <img src="" alt="logo" className="w-8" />
                        <span className="ml-8">Header</span>
                    </div>
                </div>

                {/* Chatbot Body Div */}
                <div className="h-80 flex flex-col space-y-4 max-w-md px-2 mb-2 mt-2">

                    {/* Chatbot model Text */}
                    <div className="flex flex-col items-start">
                        <span className="bg-blue-500 px-2 py-4 rounded-b-xl rounded-tl-xl mb-2 mt-2">How can i help you?</span>
                    </div>
                    {/* Chatbot User Text */}
                    <div className="flex flex-col items-end">
                        <span className="bg-slate-950 px-2 py-4 rounded-b-xl rounded-tr-xl mb-2 mt-2">Good place for coffe</span>
                    </div>
                </div>
                
                {/* Chatbot Footer Div */}
                <div className="border-t-2 flex items-center py-4 px-2">
                    <input
                        type="text"
                        // value={userInput}
                        // onChange={(e) => setUserInput(e.target.value)}
                        // onKeyPress={(e) => {
                        //     if (e.key === 'Enter') {
                        //         handleSendMessage();
                        //     }
                        // }}
                        className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 flex-1 px-4 rounded-md mr-2"
                        placeholder="Type your query here..."
                    />
                    <button
                        // onClick={handleSendMessage}
                        className="h-12 bg-primary-500 hover:bg-primary-600 text-light-1 px-4 rounded-md"
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ChatbotUI
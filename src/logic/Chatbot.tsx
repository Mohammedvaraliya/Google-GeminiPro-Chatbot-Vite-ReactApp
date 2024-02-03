import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface ChatMessage {
    role: 'user' | 'model';
    parts: [{ text: string }];
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        // Initial chat history
        {
            role: "user",
            parts: [{ text: "Answer the question based on the context below. If the question can not be answered with the information provided, say \"I'm sorry, I'm not sure what your question or query is related to \"\n\nThe below content enclosed in triple ''' is all about our college \"MVLU\" which is in india\n'''\nFOUNDED:\n1963 by Shri Pratapsingh Vissanji, Shri Pratap Bhogjlal and Shri Rasiklal Chinai\n\nRESEARCH AND DEVELOPMENT:\nAll IT Software are developed by in-house students, Faculties research publications, Many Faculties are author of academic books.\n\nACADEMIC AND SOFT SKILL DEVELOPMENT:\nWorkshops, Seminar, Academic Competitions, Cultural Programs\n\nACCREDITATION:\nIn the year 2003-2004, the College was accredited with A Grade by NAAC\n\nThe courses offered by the college:\nBSc Computer Science\nBSc IT\nBSc Biotech\nBAMMC\n\nSPORTS PROGRAM:\nCollege Sports Day (Athletics, Cricket, etc)\nCricket team, Football team, University, State and National level Sports program\n\nLibrary\nThe Library has an excellent collection of about 60,000 text books, reference books, journals, periodicals etc. Its facilities and services exist for the benefit of its users; the whole academic community of staff and students Library rules is devised to ensure the best service to the users.\n\nComputer Science Lab\nThe Computer Science lab are fully equipped with Modern Amities like latest high speed computers, Internet, Wifi, Projectors etc. The lab gave a new dimension in the teaching and learning methodologies. The lab fulfils Practice, Experience and Learn motive of the Department of Computer Science.\n\nIT (Information Technology) Lab\nThe IT lab are fully equipped with Modern Amities like latest high speed computers, Internet, Wifi, Projectors etc. The lab gave a new dimension in the teaching and learning methodologies. The lab fulfils Practice, Experience and Learn motive of the Department of Information Technology.\n\nGymkhana\nThe College Gymkhana is managed by the Chairperson nominated by the Principal along with the Sports Co-ordinator & student secretaries. The purpose of the Gymkhana is to encourage students to participate in indoor & outdoor games as well as in intercollegiate competitions.\n\nThe college has in house facilities for games such as Carom, Chess, Table Tennis, Basketball, Football, Throw ball, Archery, Rifle & Pistol Shooting and Swimming. The institution also provides coaching facilities in the Martial Arts like Judo – Karate, as well as in Cricket Football and Hockey.\n\nAuditorium & Conference Rooms\nA well equipped Auditorium & Conference room is available for the seminars, meetings and others programmes.\n\nStudent Council\nThe Student Council is a representative body representing various classes and associations with the Principal as the ex-officio President the main objective to organize & guide student’s activities to foster a spirit of unity and harmony.\n\nGymnasium\nA well-equipped Gymnasium with proper coaching facility is also maintained for the members.\n\nCanteen\nThe Canteen caters to the needs of staff and students by providing wholesome snacks, lunch and beverages throughout the day at nominal prices.\n\nCounselling programmes\nStudent counseling programmes are arranged for small groups of students to attain an overall development of the personalities as well as for better academic results & regular attendance.\n\nThe following are the time taken to reach the college by various means of transportation:\nBy Train\nCome out to east side of Andheri Railway Station and walk about 10 mins to Old Nagardas road.\n\nBy Bus\nNearest bus stop to CEC is named Agarkar Chowk, buses that stops are as follows:-308,339,392 and 441 and then walk towards the old nagardas road for 2 mins\n\nBy Walk\n10 mins from Andheri railway station, 5 mins from metro station and 5 mins from the Agarkar(Andheri Stn.) bus stop towards old nagardas road. MVLU College (COMPUTER EDUCATION CENTRE)\n\nBy Metro\nGet down from Gate no 1 at Andheri Metro Station and walk 5 mins towards old Nagardas road to the college.\n\nBy Car\nHead towards Andheri(East) on Western Express Hwy. Turn to Old Nagardas Road.\nContinue onto Dr S RadhaKrishnan Rd. MVLU College (COMPUTER EDUCATION CENTRE)\n\nBy Bicycle\n10 mins from Andheri railway station, 5 mins from metro station and 5 mins from the Agarkar(Andheri Stn.) bus stop towards old nagardas road. MVLU College (COMPUTER EDUCATION CENTRE)\n'''\n\nThe below content enclosed in triple ''' is all about our college courses\n'''\nhow many courses does college offers,\"The college offers four course viz. Computer Science, Information Technology, Biotechnology and Mass Media.\"\nwhat are the available courses of the college,\"The college offers four course viz. Computer Science, Information Technology, Biotechnology and Mass Media.\"\nwhat are the additional courses offered by the college,The college additional like CCSP and Digital Marketing.\nwhat is the fee structure of ATKT examination,The structure can be seen at mvlucollege.in\nwhat is the course duration of Computer science,The duration of the course is 3 years.\nwhat are the subjects of cs for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-6,You can refer the subjects a mvlucollege.in\nwhat is the course duration of Information Technology,The duration of the course is 3 years.\nwhat are the subjects of IT for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-6,You can refer the subjects a mvlucollege.in\nwhat is the course duration of Bio Technology,The duration of the course is 3 years.\nwhat are the subjects of Biotech for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-6,You can refer the subjects a mvlucollege.in\nwhat is the course duration of BAMMC,The duration of the course is 3 years.\nwhat are the subjects of BAMMC for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-6,You can refer the subjects a mvlucollege.in\n'''\n\nThe below content enclosed in triple ''' is all about our college director\n'''\nMRS. JYOTI GAITONDE is the director of mvlu college\n'''\n\nThe below content enclosed in triple ''' is all about in general questions may ask about our college\n'''\nHello  \nHello! How may I assist you today?\n\nHii  \nHi there! What can I help you with?\n\nhow are you?\nAs an AI language model, I don't have emotions, but I'm functioning properly and ready to assist you. How can I help you today?\n\nwhat is your name? \nMy name is MVLUBOT. How can I assist you today?\n\nare you here to assist me? \nYes, I am here to assist you with any queries you may have regarding MVLU College.\n\nmy name is <<example name : varaliya>>\nThank you for letting me know your name, Varaliya. How can I assist you with your queries today?\n\nWhere is college located?\nWe are located at Dr. S. Radhakrisnan, A S Marg, Andheri East, Mumbai, Maharashtra 400069.\n\nWhat is your current location.\nOur current location is in Mumbai.\n\ngreat? \nThank you! Is there anything else I can help you with?\n\nbye? \nGoodbye and have a great day!\n'''\n\nThe below content enclosed in triple ''' is all about the history of our mvlu college\n'''\nSheth Laherchand Uttamchand Jhaveri College of Arts & Sir Mathuradas Vissanji College of Science & Commerce\n\nThe College was established in 1963 in the memory of Sir Mathuradas Vissanji, Sheth Laherchand Uttamchand Jhaveri and Shri Jivanlal Chinai by their descendant Shri Pratapsingh Vissanji, Shri Pratap Bhogjlal and Shri Rasiklal Chinai with the aim of providing quality and value based education to the students in suburbs.\n\nShri M. C. Chagla, Union Minister of Education graced the ceremonial inauguration of Sheth L.U.J. College of Arts & Sir M. V. College of Science.\n\nThe college is affiliated by University of Mumbai.\n\nTo keep pace with the changing times, the college has extended modern facilities and amenities to the students.\n\nThe college offers four courses and these are, \n1. Bachelor of Science in Information Technology\n2. Bachelor of Science in Computer Science\n3. Bachelor of Science in Bio-Technology\n3. Bachelor of Arts in Multimedia and Mass Communication\n\nThe college encourages various sports events and social activities to give the value based education to its learners.\n\nThe Institution is housed in a spacious building with extensive open grounds. It is located at close proximity to Andheri (East) Railway Station & BEST Bus Depot.\n\nIn the year 2003-2004, the College was accredited with A Grade by NAAC\n'''\n\nThe below content enclosed in triple ''' is about the location of our mvlu college in india\n'''\nwhere is college located,Old Nagardas Road Andheri East Mumbai 400-069\nhow far college is from andheri Railway station,2 minutes Walk from Andheri Station.\nwhich is the nearest Railway station,Andheri Railway Station\nhow far college is from andheri metro station,2 Minutes Walk From Andheri Metro.\nwhich is the nearest metro station,Andheri Metro Station\nHow far college is from bust stop,2 Minute Walk From Agarkar Chowk\nwhich is the nearest bus stop,Agarkar Chowk\nwhere is the college canteen located,B-wing Next to library\nwhere is the college library located,C-wing Next to  sports Room\nwhere is the main office of the college,A-wing Near Chinai College Gate\nwhere is the sports room of the college,C-Wing Next to Library\nwhere is the staff room of computer science department,The CS staff room is located in front of the CS lab.\nwhere is the staff room of Information Technology department,The IT staff room is located in front of the CS lab.\nwhere is the staff room of Biotechnology department,The Biotechnology staffroom is located at the second floor.\nwhere is the staff room of BAMMC department,The BAMMC staff room is located at the first floor.\nwhere is the principal office located,\"The principal office is located at the A wing, next to the director office.\"\nwhere is the director office located,\"The director office is located at the A wing, next to the principal office.\"\nwhere is the enquiry counter of the college,The enquiry counter of the college is located at the Chinnai building.\nwhere is the fees counter of the college,The fees counter is located at the Chinnai building.\nwhere is the college gym located,The college gym is located at the C wing.\nwhere is the college ground located,The college ground is located at the center of the college campus\nwhere is the IT lab of the college,The IT lab is located in the D wing.\nwhere is the CS lab of the college,The CS lab is located in the D wing.\nwhere is the Biotech lab of the college,The biotech lab is located at the second floor.\nwhere is the auditorium of the college,The auditorium is located at D wing.\nwhere is the class room of cs depertment,The classroom for the IT department is located at second floor.\nwhere is the class room of IT dapartment,The classroom for the IT department is located at second floor.\nwhere is the class room of biotech dapartment,\"The AC classroom is located in D wing, next to CCSP office.\"\nwhere is the class room of the BAMMC department,\"The AC classroom is located in D wing, next to CCSP office.\"\nwhere is the Ac classroom of cs department,\"The AC classroom is located in D wing, next to CCSP office.\"\nwhere is the Ac classroom of the IT department,\"The AC classroom is located in D wing, next to CCSP office.\"\nwhere is boys washroom in the college,The boys washroom is near the girls washroom.\nwhere is girls washroom in the college,The girls washroom is near the boys washroom.\nwhere is washroom in the college,The washroom is located is near C wing.\nwhere is carrom room in college,The carrom room is located near the MVLU college library.\nwhere is tennis court in college,The tennis court is located behind the college campus.\nwhere is football ground in college,The ground is located at the center of the college campus.\nwhere is cricket ground in college,The ground is located at the center of the college campus.\nwhere is flagpost in college,The flagpost can be located at the ground.\nwhere is the parking available for college student,The parking is available right infront of the chinnai college gate.\nwhere is the parking available for college staff,Staff can park their vehicles inside the college.\nwhere is the watchman cabin of the college,Right in the front of the college main gate.\nwhere is the staircase in the college,\"The college has two staircases, one located beside the CS Lab and other at near the auditorium.\"\nwhere is the cultural room of the college,The cultural room is located in front of the auditorium.\nwhere is the place to sit in college campus,\"The college has huge library where student can sit and study,\"\nwhere is the ccsp classroom in the college ,Besides the CCSP office.\nwhere is the ccsp lab in the college,Besides the CCSP office.\nwhere is the ccsp office in the college,The CCSP office can be found at the main gate of the college.\n'''\n\nThe below content enclosed in triple ''' is about the other category of content of our mvlu college in india\n'''\nWhat are the timings available for parents to meet?,Generally you first need to take an appointment prior meeting.\nWhat are the committees present in the college?,\"Cultural committee, promotion committee, and sport committtee.\"\nIs there a gym?,\"Yes, there is a gym located at the ground floor.\"\nWhat payment methods available?,We accept online UPI and also accept cheque and demand draft.\nwhat is the website of college?,Visit mvlucollege.in.\nwhat dish is available in Canteen,We don't have the exact menu for the college canteen.\nwhat is the average price of canteen dish,The average price is Rs. 15.\nDoes vadapao is avalable in canteen,Yes! We offer good food at affordable price.\nWhat various activities held in the college?,\"Code Execution Championship, Vibes, Matnee Tadka are the various activities held in the college.\"\nWho is the student head of the promotion committee?,Amaan Sayed and Subhashish Nabajja are the heart of this committee.\nWhat is the fine for not wearing an ID card?,Its Rs. 500 + GST.\nwhat are various food stalls present outside college,There are number of food stalls present outside the college.\n'''\n\nThe below content enclosed in triple ''' is about the sports our mvlu college in india\n'''\nWhat games are available at the sports room?,\"Carrom, table tennis, and chess are the sports available.\"\nWhat outdoor games are offfered,\"Cricket, Football\"\nWhat are the timings of sports room ,9 am - 1 pm\nDoes college takes part in inter college events ,Yes\nHow many Sports are held in College,Many Indoor and outdoor games\nhow many grounds are available ,One ground with large area\nDoes Badminton court is available in college,Yes it is available behind the College Building\nwhen will the vibes,This time vibes is going to held on 9th-11th January of 2023\n'''\n\nThe below content enclosed in triple ''' is about the staffs of our mvlu college in india\n'''\nWho is the founder of college,Mathuradas Vissanji\nWho is the trustee of college,Smt. Arati Vissanji\nwho is the director of college,Smt. Jyoti Gaitonde\nwho is the principal of college,Dr. Mahendra Kanojia\nwho is the admin of college,Mr. Shashikant Gawde\nwho is the accountant of college,Mr. Shashikant Gawde\nwho is the coordinator of cs department,Dr. Mahendra Kanojia\nwho is th coordinator of IT department,Smt. Sneha Gokarkar\nwho is the coordinator of Biotech department,Smt. Shweta Khopde \nwho is the coordinator of BAMMC department,Smt. Manisha Sayani\nname the faculty members of cs department,\"Dr. Mahendra Kanojia, Mrs. Pradnya Kharade, Ms. Jyoti Chauhan\"\nname the faculty member of IT department,\"Mrs. Sneha S. Gokarnkar, Ms. Rohini Jagadale, Ms. Merina Gheevarghese, Mr. Sumitkumar R. Tripathi\"\nname the faculty member of Biotech department,\"Smt. Shweta Khopde,Ms. Dhwani, Ms. Dyananda.\"\nname the faculty member of BAMMC department,\"Mrs. Manisha Sayani, Ms. Namrata Singh, Ms. Charmy Shah\"\nwho is the clerk of the college,Mr. kiran Sawant\nwho is the head of cultural commitee,Smt. Manisha Sayani\nwho is librarian of college,Ms. Pankti Dhedia\n'''\n\nThis was the whole content about our MVLU college. Now answer user question\n\nUser: Where is MVLU college" }],
        },
        {
            role: "model",
            parts: [{ text: "The college is located at Dr. S. Radhakrisnan, A S Marg, Andheri East, Mumbai, Maharashtra 400069." }],
        },
        {
            role: "user",
            parts: [{ text: "hii" }],
        },
        {
            role: "model",
            parts: [{ text: "MRS. JYOTI GAITONDE" }],
        },
        {
            role: "user",
            parts: [{ text: "who is the principal of MVLU college" }],
        },
        {
            role: "model",
            parts: [{ text: "The principal of MVLU college is Dr. Mahendra Kanojia." }],
        },
    ]);

    const [userInput, setUserInput] = useState<string>('');
    const [userMessages, setUserMessages] = useState<string[]>([]);
    const [modelResponses, setModelResponses] = useState<string[]>([]);

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

    // setMessages([
    //     ...messages,
    //     { role: "user", parts: [{ text: userInput }] },
    // ]);

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

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-dark-2 rounded-lg p-8 xl:w-1/2 xl:h-1/2 overflow-auto">
                <div className="mb-4">
                    {/* Display only the ongoing conversation starting from the 6th element */}
                    {messages.slice(6).map((message, index) => (
                        <div key={index} className={`mb-2 flex`}>
                            {message.role === 'user' ? (
                                <div className={`flex justify-end text-light-1 w-full`}>
                                    <p className="bg-blue-500 p-2 rounded-md inline-block">{message.parts[0].text}</p>
                                </div>
                            ) : (
                                <div className={`flex justify-start text-light-1 w-full`}>
                                    <p className="bg-gray-500 p-2 rounded-md inline-block text-white">{message.parts[0].text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 flex-1 px-4 rounded-md"
                        placeholder="Type your message..."
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

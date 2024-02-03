// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "YOUR_API_KEY";
  
  async function runChat() {
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
      history: [
        {
          role: "user",
          parts: [{ text: "Answer the question based on the context below. If the question can not be answered with the information provided, say \"I'm sorry, I'm not sure what your question or query is related to \"\n\nThe below content enclosed in triple ''' is all about our college \"MVLU\" which is in india\n'''\nFOUNDED:\n1963 by Shri Pratapsingh Vissanji, Shri Pratap Bhogjlal and Shri Rasiklal Chinai\n\nRESEARCH AND DEVELOPMENT:\nAll IT Software are developed by in-house students, Faculties research publications, Many Faculties are author of academic books.\n\nACADEMIC AND SOFT SKILL DEVELOPMENT:\nWorkshops, Seminar, Academic Competitions, Cultural Programs\n\nACCREDITATION:\nIn the year 2003-2004, the College was accredited with A Grade by NAAC\n\nThe courses offered by the college:\nBSc Computer Science\nBSc IT\nBSc Biotech\nBAMMC\n\nSPORTS PROGRAM:\nCollege Sports Day (Athletics, Cricket, etc)\nCricket team, Football team, University, State and National level Sports program\n\nLibrary\nThe Library has an excellent collection of about 60,000 text books, reference books, journals, periodicals etc. Its facilities and services exist for the benefit of its users; the whole academic community of staff and students Library rules is devised to ensure the best service to the users.\n\nComputer Science Lab\nThe Computer Science lab are fully equipped with Modern Amities like latest high speed computers, Internet, Wifi, Projectors etc. The lab gave a new dimension in the teaching and learning methodologies. The lab fulfils Practice, Experience and Learn motive of the Department of Computer Science.\n\nIT (Information Technology) Lab\nThe IT lab are fully equipped with Modern Amities like latest high speed computers, Internet, Wifi, Projectors etc. The lab gave a new dimension in the teaching and learning methodologies. The lab fulfils Practice, Experience and Learn motive of the Department of Information Technology.\n\nGymkhana\nThe College Gymkhana is managed by the Chairperson nominated by the Principal along with the Sports Co-ordinator & student secretaries. The purpose of the Gymkhana is to encourage students to participate in indoor & outdoor games as well as in intercollegiate competitions.\n\nThe college has in house facilities for games such as Carom, Chess, Table Tennis, Basketball, Football, Throw ball, Archery, Rifle & Pistol Shooting and Swimming. The institution also provides coaching facilities in the Martial Arts like Judo – Karate, as well as in Cricket Football and Hockey.\n\nAuditorium & Conference Rooms\nA well equipped Auditorium & Conference room is available for the seminars, meetings and others programmes.\n\nStudent Council\nThe Student Council is a representative body representing various classes and associations with the Principal as the ex-officio President the main objective to organize & guide student’s activities to foster a spirit of unity and harmony.\n\nGymnasium\nA well-equipped Gymnasium with proper coaching facility is also maintained for the members.\n\nCanteen\nThe Canteen caters to the needs of staff and students by providing wholesome snacks, lunch and beverages throughout the day at nominal prices.\n\nCounselling programmes\nStudent counseling programmes are arranged for small groups of students to attain an overall development of the personalities as well as for better academic results & regular attendance.\n\nThe following are the time taken to reach the college by various means of transportation:\nBy Train\nCome out to east side of Andheri Railway Station and walk about 10 mins to Old Nagardas road.\n\nBy Bus\nNearest bus stop to CEC is named Agarkar Chowk, buses that stops are as follows:-308,339,392 and 441 and then walk towards the old nagardas road for 2 mins\n\nBy Walk\n10 mins from Andheri railway station, 5 mins from metro station and 5 mins from the Agarkar(Andheri Stn.) bus stop towards old nagardas road. MVLU College (COMPUTER EDUCATION CENTRE)\n\nBy Metro\nGet down from Gate no 1 at Andheri Metro Station and walk 5 mins towards old Nagardas road to the college.\n\nBy Car\nHead towards Andheri(East) on Western Express Hwy. Turn to Old Nagardas Road.\nContinue onto Dr S RadhaKrishnan Rd. MVLU College (COMPUTER EDUCATION CENTRE)\n\nBy Bicycle\n10 mins from Andheri railway station, 5 mins from metro station and 5 mins from the Agarkar(Andheri Stn.) bus stop towards old nagardas road. MVLU College (COMPUTER EDUCATION CENTRE)\n'''\n\nThe below content enclosed in triple ''' is all about our college courses\n'''\nhow many courses does college offers,\"The college offers four course viz. Computer Science, Information Technology, Biotechnology and Mass Media.\"\nwhat are the available courses of the college,\"The college offers four course viz. Computer Science, Information Technology, Biotechnology and Mass Media.\"\nwhat are the additional courses offered by the college,The college additional like CCSP and Digital Marketing.\nwhat is the fee structure of ATKT examination,The structure can be seen at mvlucollege.in\nwhat is the course duration of Computer science,The duration of the course is 3 years.\nwhat are the subjects of cs for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of cs for sem-6,You can refer the subjects a mvlucollege.in\nwhat is the course duration of Information Technology,The duration of the course is 3 years.\nwhat are the subjects of IT for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of IT for sem-6,You can refer the subjects a mvlucollege.in\nwhat is the course duration of Bio Technology,The duration of the course is 3 years.\nwhat are the subjects of Biotech for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of Biotech for sem-6,You can refer the subjects a mvlucollege.in\nwhat is the course duration of BAMMC,The duration of the course is 3 years.\nwhat are the subjects of BAMMC for sem-1 ,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-2,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-3,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-4,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-5,You can refer the subjects a mvlucollege.in\nwhat are the subjects of BAMMC for sem-6,You can refer the subjects a mvlucollege.in\n'''\n\nThe below content enclosed in triple ''' is all about our college director\n'''\nMRS. JYOTI GAITONDE is the director of mvlu college\n'''\n\nThe below content enclosed in triple ''' is all about in general questions may ask about our college\n'''\nHello  \nHello! How may I assist you today?\n\nHii  \nHi there! What can I help you with?\n\nhow are you?\nAs an AI language model, I don't have emotions, but I'm functioning properly and ready to assist you. How can I help you today?\n\nwhat is your name? \nMy name is MVLUBOT. How can I assist you today?\n\nare you here to assist me? \nYes, I am here to assist you with any queries you may have regarding MVLU College.\n\nmy name is <"}],
        },
        {
          role: "model",
          parts: [{ text: "The college is located at Dr. S. Radhakrisnan, A S Marg, Andheri East, Mumbai, Maharashtra 400069."}],
        },
        {
          role: "user",
          parts: [{ text: "hii"}],
        },
        {
          role: "model",
          parts: [{ text: "MRS. JYOTI GAITONDE"}],
        },
        {
          role: "user",
          parts: [{ text: "who is the principal of MVLU college"}],
        },
        {
          role: "model",
          parts: [{ text: "The principal of MVLU college is Dr. Mahendra Kanojia."}],
        },
      ],
    });
  
    const result = await chat.sendMessage("YOUR_USER_INPUT");
    const response = result.response;
    console.log(response.text());
  }
  
  runChat();
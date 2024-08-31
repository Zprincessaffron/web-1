import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { FaRobot } from "react-icons/fa6";
import BotProductList from "./BotProductList";
import SalesExecutive from "../../assets/gif/Animation - 1723113918679.gif";
import Client from "../../assets/gif/Animation - 1723117354452.gif"

const useCaseQuestions = {
  recommendation: {
    question:
      "Type your use case: 1. Culinary Uses, 2. Cosmetic Uses, 3. Medicinal Uses, 4. Pregnant Woman Uses. You can select multiple by typing their numbers separated by commas (e.g., 1,2).",
    type: "text",
    name: "useCases",
  },
  culinary: [
    {
      type: "text",
      question: "What type of cuisine do you usually cook?",
      name: "cuisine",
      options: ["Indian", "Mexican", "Chinese", "others"],
    },
    {
      type: "select",
      question: "What types of dishes do you like to cook with saffron?",
      name: "dishes",
      options: ["Desserts", "Main Courses", "Appetizers", "Beverages", "Other"],
    },
    {
      type: "text",
      question: "Do you prefer mild or strong flavors in your dishes?",
      name: "flavor",
      options: ["Mild", "Strong", "Other"],
    },
    {
      type: "select",
      question: "Are you looking for recipes with specific health benefits?",
      name: "healthBenefits",
      options: [
        "Antioxidant-rich",
        "Anti-inflammatory",
        "Digestive health",
        "Other",
      ],
    },
    {
      type: "select",
      question:
        "Do you have any specific health conditions that influence your diet?",
      name: "healthConditions",
      options: ["Diabetes", "High blood pressure", "Heart conditions", "Other"],
    },
    {
      type: "text",
      question:
        "Would you like to learn new cooking techniques involving saffron?",
      name: "learnTechniques",
      options: ["Yes", "No"],
    },
  ],
  medicinal: [
    {
      type: "text",
      question: "Are you currently taking any medications or supplements?",
      name: "medications",
      options: ["Yes", "No"],
    },
    {
      type: "select",
      question:
        "What primary benefits are you seeking from using saffron medicinally?",
      name: "benefits",
      options: [
        "Improved mood",
        "Better sleep",
        "Pain relief",
        "Enhanced digestion",
        "Reduced inflammation",
        "Other (please specify)",
      ],
    },
    {
      type: "select",
      question:
        "Have you consulted your healthcare provider about using saffron for medicinal purposes?",
      name: "consultedProvider",
      options: ["Yes", "No"],
    },
    {
      type: "text",
      question:
        "Do you have any concerns or questions about using saffron for medicinal purposes?",
      name: "concerns",
      options: ["Yes", "No"],
    },
  ],
  cosmetic: [
    {
      type: "text",
      question: "What is your skin type? (e.g., oily, dry, sensitive)",
      name: "skinType",
      options: ["oily", "dry", "sensitive", "other"],
    },
    {
      type: "select",
      question: "What are your primary skin concerns?",
      name: "skinConcerns",
      options: [
        "Acne",
        "Wrinkles",
        "Dark spots",
        "Dryness",
        "Redness",
        "Uneven skin tone",
        "Other",
      ],
    },
    {
      type: "text",
      question: "How often do you apply skincare products?",
      name: "applicationFrequency",
      options: ["Daily", "Weekly Once", "Occasionally", "Never"],
    },
    {
      type: "select",
      question: "Have you used saffron-based skincare products before?",
      name: "usedSaffron",
      options: ["Yes", "No"],
    },
  ],
  pregnantwomen: [
    {
      type: "text",
      question: "What stage of pregnancy are you in?",
      name: "pregnancyStage",
      options: [
        "first trimester",
        "second trimester",
        "third trimester",
        "postpartum",
        "other",
      ],
    },
    {
      type: "text",
      question: "Have you used saffron before your pregnancy?",
      name: "usedBeforePregnancy",
      options: ["Yes", "No"],
    },
    {
      type: "text",
      question: "Are you currently using saffron during your pregnancy?",
      name: "usingDuringPregnancy",
      options: ["Yes", "No"],
    },
    {
      type: "text",
      question: "Do you have any known allergies? Please specify",
      name: "knownAllergies",
    },
  ],
};

const initialMessages = [
  { text: "Welcome! How can I assist you today?", type: "bot" },
  { text: "Please say something to continue.", type: "bot" },
];

const Chatbot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(-1);
  const [useCases, setUseCases] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [data, setData] = useState({});
  const [recognitionActive, setRecognitionActive] = useState(false);
  const messageEndRef = useRef(null);
  const [suggestion, setSuggestion] = useState();
  const navigate = useNavigate();

  let recognition;

  // Initialize speech recognition
  if (!("webkitSpeechRecognition" in window)) {
    console.error("Speech recognition not supported in this browser.");
  } else {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setRecognitionActive(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setRecognitionActive(false);
    };

    recognition.onend = () => {
      setRecognitionActive(false);
    };
  }

  // Function to handle text-to-speech
  const speak = (text, callback) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.onend = callback;
    window.speechSynthesis.speak(utterance);
  };

  const speakInitialMessages = () => {
    let index = 0;
    const speakNextMessage = () => {
      if (index < initialMessages.length) {
        const message = initialMessages[index];
        speak(message.text, () => {
          index += 1;
          speakNextMessage();
        });
      }
    };
    speakNextMessage();
  };

  useEffect(() => {
    speakInitialMessages(); // Speak initial messages
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleMicrophoneClick = () => {
    if (recognitionActive) {
      recognition.stop();
      setRecognitionActive(false);
    } else {
      recognition.start();
      setRecognitionActive(true);
    }
  };

  const handleOptionClick = (option) => {
    setInput(option);
    handleSubmit(option);
  };

  const handleSubmit = async (inputValue = input) => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { text: inputValue, type: "user" }];
    setMessages(newMessages);
    setInput("");

    // Speak the user's response
    speak(inputValue);

    if (step === -1) {
      setMessages([
        ...newMessages,
        { text: useCaseQuestions.recommendation.question, type: "bot" },
      ]);
      speak(useCaseQuestions.recommendation.question); 
      setStep(0);
      return;
    }

    if (step === 0) {
      const selectedUseCases = inputValue
        .split(",")
        .map((caseNum) => caseNum.trim().toLowerCase());
      const validUseCases = ["1", "2", "3", "4"];
      const useCaseMapping = {
        1: "culinary",
        2: "cosmetic",
        3: "medicinal",
        4: "pregnantwomen",
      };
      const selectedValidUseCases = selectedUseCases
        .filter((caseNum) => validUseCases.includes(caseNum))
        .map((caseNum) => useCaseMapping[caseNum]);

      if (selectedValidUseCases.length > 0) {
        setUseCases(selectedValidUseCases);
        setData({
          ...data,
          recommendation: { useCases: selectedValidUseCases },
        });
        const questions = selectedValidUseCases.flatMap(
          (useCase) => useCaseQuestions[useCase]
        );
        setCurrentQuestions(questions);
        setStep(1);
        setMessages([
          ...newMessages,
          { text: questions[0].question, type: "bot" },
        ]);
        speak(questions[0].question); // Read aloud
      } else {
        setMessages([
          ...newMessages,
          {
            text: "Invalid use cases selected. Please try again.",
            type: "bot",
          },
        ]);
        speak("Invalid use cases selected. Please try again."); 
      }
      return;
    }

    if (step >= 1) {
      const currentQuestion = currentQuestions[step - 1];
      const newData = { ...data };
      if (currentQuestion.type === "text") {
        newData[currentQuestion.name] = inputValue;
      } else if (currentQuestion.type === "select") {
        newData[currentQuestion.name] = inputValue;
      }
      setData(newData);

      if (step < currentQuestions.length) {
        const nextQuestion = currentQuestions[step];
        setMessages([
          ...newMessages,
          { text: nextQuestion.question, type: "bot" },
        ]);
        speak(nextQuestion.question); 
        setStep(step + 1);
      } else {
        setMessages([
          ...newMessages,
          {
            text: "Thank you for your input! We will process your data now.",
            type: "bot",
          },
        ]);
        speak("Thank you for your input! We will process your data now.");

        // Send data to backend
        try {
          const response = await axios.post("/analyzeData", data);
          const suggestionText = response.data.suggestion;
          setSuggestion(suggestionText);

          setMessages([
            ...messages,
            {
              text: "Thank you for your responses. We have submitted your data.",
              type: "bot",
            },
            { text: suggestionText, type: "suggestion" },
          ]);

          speak(
            "Thank you for your responses. We have submitted your data.",
            () => {
              speak(suggestionText); 
            }
          );
        } catch (error) {
          console.error("Error submitting data:", error);
          setMessages([
            ...messages,
            {
              text: "There was an error submitting your data. Please try again.",
              type: "bot",
            },
          ]);
          speak("There was an error submitting your data. Please try again."); 
        }
      }
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return ( 
    <div className="chat-container">
      <div className="chat-header">
        <button
          onClick={() => navigate("/")}
          className="chat-back-button"
        >
          <MdArrowBack className="chat-back-icon" />
        </button>
        <h1 className="chat-title">Chatbot</h1>
        <div className="chat-spacer"></div>
      </div>

      <div className="chat-message-area">
        <div className="chat-message-list">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`chat-message ${
                message.type === "bot"
                  ? "chat-bot-message"
                  : message.type === "suggestion"
                  ? "chat-suggestion-message"
                  : "chat-user-message"
              } ${message.type === "user" ? "chat-user-flex" : "chat-bot-flex"}`}
            >
              {message.type === "user" && (
                <img src={Client} width={70} alt="" className="chat-user-avatar" />
              )}
              {message.type !== "user" && (
                <img src={SalesExecutive} width={100} alt="" className="chat-bot-avatar" />
              )}
              <span className="chat-message-text">{message.text}</span>
            </motion.div>
          ))}
          {suggestion && <BotProductList />}
        </div>
        <div ref={messageEndRef} />
      </div>

      <div className="chat-input-area">
        <button
          onClick={handleMicrophoneClick}
          className="chat-microphone-button"
        >
          <FaMicrophoneAlt className="chat-microphone-icon" />
        </button>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="chat-input"
        />
        <button
          onClick={() => handleSubmit()}
          className="chat-send-button"
        >
          <IoSend className="chat-send-icon" />
        </button>
      </div>

      {currentQuestions.length > 0 && step > 0 && (
        <div className="chat-question-area">
          {currentQuestions[step - 1].options && (
            <div className="chat-option-list">
              {currentQuestions[step - 1].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="chat-option-button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MedicinalUses from "../components/UserExtrainfo/MedicinalUses";
import CulinaryUses from "../components/UserExtrainfo/CulinaryUses";
import CosmeticUses from "../components/UserExtrainfo/CosmeticUses";
import PregnantWomenUses from "../components/UserExtrainfo/PregnantWomanUses";

const Register = () => {
  const navigate = useNavigate();
  const speechInstanceRef = useRef(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
    // recommendations: [],
    // cuisine: "",
    // saffronDishes: [],
    // saffronDishesOther: "",
    // flavorPreference: "",
    // healthBenefits: [],
    // healthBenefitsOther: "",
    // healthConditions: [],
    // healthConditionsOther: "",
    // learning: "",
    // currentMedications: "",
    // primaryBenefits: [],
    // otherPrimaryBenefit: "",
    // consultation: "",
    // concerns: "",
    // skinType: '',
    // primarySkinConcerns: [],
    // otherSkinConcern: '',
    // skincareFrequency: '',
    // usedSaffronProducts: '',
    // satisfactionLevel: '',
    // pregnancyStage: '',
    // previousSaffronUse: '',
    // saffronUsageDuringPregnancy: '',
    // allergies: ''
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedRecommendations = [...data.recommendations];
    if (checked) {
      updatedRecommendations.push(value);
    } else {
      updatedRecommendations = updatedRecommendations.filter(
        (recommendation) => recommendation !== value
      );
    }
    setData({ ...data, recommendations: updatedRecommendations });
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox changes
  const handleCulinaryCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setData((prevData) => {
      const updatedList = checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value);
      return { ...prevData, [name]: updatedList };
    });
  };

  // Handle "Other" input change
  const handleOtherChange = (e, field) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      phone,
      // recommendations,
      // cuisine,
      // saffronDishes,
      // saffronDishesOther,
      // flavorPreference,
      // healthBenefits,
      // healthBenefitsOther,
      // healthConditions,
      // healthConditionsOther,
      // learning,
      // currentMedications,
      // primaryBenefits,
      // otherPrimaryBenefit,
      // consultation,
      // concerns,
      // skinType,
      // primarySkinConcerns,
      // otherSkinConcern,
      // skincareFrequency,
      // usedSaffronProducts,
      // satisfactionLevel,
      // pregnancyStage,
      // previousSaffronUse,
      // saffronUsageDuringPregnancy,
      // allergies
    } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        phone
        // recommendations,
        // cuisine,
        // saffronDishes,
        // saffronDishesOther,
        // flavorPreference,
        // healthBenefits,
        // healthBenefitsOther,
        // healthConditions,
        // healthConditionsOther,
        // learning,
        // currentMedications,
        // primaryBenefits,
        // otherPrimaryBenefit,
        // consultation,
        // concerns,
        // skinType,
        // primarySkinConcerns,
        // otherSkinConcern,
        // skincareFrequency,
        // usedSaffronProducts,
        // satisfactionLevel,
        // pregnancyStage,
        // previousSaffronUse,
        // saffronUsageDuringPregnancy,
        // allergies
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
          phone: ""
          // recommendations: [],
          // cuisine: "",
          // saffronDishes: [],
          // saffronDishesOther: "",
          // flavorPreference: "",
          // healthBenefits: [],
          // healthBenefitsOther: "",
          // healthConditions: [],
          // healthConditionsOther: "",
          // learning: "",
          // currentMedications: "",
          // primaryBenefits: [],
          // otherPrimaryBenefit: "",
          // consultation: "",
          // concerns: "",
          // skinType: '',
          // primarySkinConcerns: [],
          // otherSkinConcern: '',
          // skincareFrequency: '',
          // usedSaffronProducts: '',
          // satisfactionLevel: '',
          // pregnancyStage: '',
          // previousSaffronUse: '',
          // saffronUsageDuringPregnancy: '',
          // allergies: ''
        });
        toast.success("User Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [infoVisible, setInfoVisible] = useState(null);
  const toggleInfo = (category) => {
    if (infoVisible === category) {
      setInfoVisible(null);
    } else {
      setInfoVisible(category);
    }
  };

  // text to speech
  const handleTextToSpeech = (text) => {
    if (speechInstanceRef.current) {
      window.speechSynthesis.cancel();
    }
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speechInstanceRef.current = speech;
    window.speechSynthesis.speak(speech);
  };

  const stopTextToSpeech = () => {
    if (speechInstanceRef.current) {
      window.speechSynthesis.cancel();
      speechInstanceRef.current = null;
    }
  };

  // speech to text
  const commands = [
    {
      command: "reset",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setData({ ...data, cuisine: "" });
      },
    },
    {
      command: "*",
      callback: (transcript) => setData({ ...data, cuisine: transcript }),
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleReset = () => {
    resetTranscript();
    setData({ ...data, cuisine: "" });
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name=""
          placeholder="Type your name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />
        <label htmlFor="">Email</label>
        <input
          type="email"
          name=""
          placeholder="Type your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name=""
          placeholder="Type your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />

        <label htmlFor="">Phone</label>
        <input
          type="text"
          name=""
          placeholder="Type your mobile number"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <br />

        {/* useCases */}

        {/* <div className="useCases">
          <label>Pick Your UseCases :</label>
          <div>
            <input
              type="checkbox"
              value="Culinary Uses"
              checked={data.recommendations.includes("Culinary Uses")}
              onChange={handleCheckboxChange}
            />
            <label>
              Culinary Uses{" "}
              {infoVisible === "Culinary Uses" ? (
                <IoCloseCircleSharp
                  size={"20"}
                  onClick={() => {
                    toggleInfo("Culinary Uses");
                    {
                      stopTextToSpeech();
                    }
                  }}
                />
              ) : (
                <FaInfoCircle onClick={() => toggleInfo("Culinary Uses")} />
              )}
            </label>
            {infoVisible === "Culinary Uses" && (
              <div style={{ position: "relative" }}>
                <button
                  style={{ display: "none" }}
                  onClick={handleTextToSpeech(
                    "Flavoring and Coloring: Saffron is widely used in cooking to impart a rich golden-yellow color and a distinct flavor to dishes. It's a key ingredient in many traditional dishes such as paella, risotto, biryani, and various Persian and Indian sweets. Infusions and Beverages: Saffron is used to make tea and other beverages, providing a unique taste and aroma."
                  )}
                ></button>
                <p style={{ margin: 0 }}>
                  Flavoring and Coloring: Saffron is widely used in cooking to
                  impart a rich golden-yellow color and a distinct flavor to
                  dishes.
                  <br /> It's a key ingredient in many traditional dishes such
                  as paella, risotto, biryani, and various Persian and Indian
                  sweets.
                  <br /> Infusions and Beverages: Saffron is used to make tea
                  and other beverages, providing a unique taste and aroma.
                </p>
              </div>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              value="Medicinal Uses"
              checked={data.recommendations.includes("Medicinal Uses")}
              onChange={handleCheckboxChange}
            />
            <label>
              Medicinal Uses{" "}
              {infoVisible === "Medicinal Uses" ? (
                <IoCloseCircleSharp
                  size={"20"}
                  onClick={() => {
                    toggleInfo("Medicinal Uses");
                    {
                      stopTextToSpeech();
                    }
                  }}
                />
              ) : (
                <FaInfoCircle onClick={() => toggleInfo("Medicinal Uses")} />
              )}
            </label>
            {infoVisible === "Medicinal Uses" && (
              <div style={{ position: "relative" }}>
                <button
                  style={{ display: "none" }}
                  onClick={handleTextToSpeech(
                    "Antioxidant Properties: Saffron contains bioactive compounds like crocin, crocetin, and safranal that have antioxidant effects, helping to neutralize harmful free radicals in the body. Improving Cognitive Function: Some studies suggest that saffron may help in improving memory and cognitive function, potentially benefiting conditions like Alzheimer's disease. Anti-inflammatory and Pain Relief: Saffron has anti-inflammatory properties and has been used traditionally to alleviate pain."
                  )}
                ></button>
                <p style={{ margin: 0 }}>
                  Antioxidant Properties: Saffron contains bioactive compounds
                  like crocin, crocetin, and safranal that have antioxidant
                  effects, helping to neutralize harmful free radicals in the
                  body.
                  <br /> Improving Cognitive Function: Some studies suggest that
                  saffron may help in improving memory and cognitive function,
                  potentially benefiting conditions like Alzheimer's disease.
                  <br /> Anti-inflammatory and Pain Relief: Saffron has
                  anti-inflammatory properties and has been used traditionally
                  to alleviate pain.
                </p>
              </div>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              value="Cosmetic Uses"
              checked={data.recommendations.includes("Cosmetic Uses")}
              onChange={handleCheckboxChange}
            />
            <label>
              Cosmetic Uses{" "}
              {infoVisible === "Cosmetic Uses" ? (
                <IoCloseCircleSharp
                  size={"20"}
                  onClick={() => {
                    toggleInfo("Cosmetic Uses");
                    {
                      stopTextToSpeech();
                    }
                  }}
                />
              ) : (
                <FaInfoCircle onClick={() => toggleInfo("Cosmetic Uses")} />
              )}
            </label>
            {infoVisible === "Cosmetic Uses" && (
              <div style={{ position: "relative" }}>
                <button
                  style={{ display: "none" }}
                  onClick={handleTextToSpeech(
                    "Skin Care: Saffron is used in various skincare products for its potential to improve complexion, reduce acne, and provide a natural glow to the skin. Hair Care: It's also included in some hair care products for its nourishing properties and potential to promote hair growth."
                  )}
                ></button>
                <p style={{ margin: 0 }}>
                  Skin Care: Saffron is used in various skincare products for
                  its potential to improve complexion, reduce acne, and provide
                  a natural glow to the skin.
                  <br /> Hair Care: It's also included in some hair care
                  products for its nourishing properties and potential to
                  promote hair growth.
                </p>
              </div>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              id="Pregnant Woman"
              value="Pregnant Woman Uses"
              checked={data.recommendations.includes("Pregnant Woman Uses")}
              onChange={handleCheckboxChange}
            />
            <label>
              Pregnant Woman Uses{" "}
              {infoVisible === "Pregnant Woman Uses" ? (
                <IoCloseCircleSharp
                  size={"20"}
                  onClick={() => {
                    toggleInfo("Pregnant Woman Uses");
                    {
                      stopTextToSpeech();
                    }
                  }}
                />
              ) : (
                <FaInfoCircle
                  onClick={() => toggleInfo("Pregnant Woman Uses")}
                />
              )}
            </label>
            {infoVisible === "Pregnant Woman Uses" && (
              <div style={{ position: "relative" }}>
                <button
                  style={{ display: "none" }}
                  onClick={handleTextToSpeech(
                    "Mood Enhancement and Stress Reduction: Saffron is known for its potential antidepressant properties. It can help in reducing mood swings, anxiety, and stress, which are common during pregnancy. Improve Digestion and Relief from Morning Sickness: Saffron can aid in digestion and help alleviate common pregnancy-related digestive issues such as nausea, vomiting, and bloating. Enhanced Sleep Quality: Saffron can promote better sleep quality, which is crucial for pregnant women who may experience insomnia or disrupted sleep patterns."
                  )}
                ></button>
                <p style={{ margin: 0 }}>
                  Mood Enhancement and Stress Reduction: Saffron is known for
                  its potential antidepressant properties. It can help in
                  reducing mood swings, anxiety, and stress, which are common
                  during pregnancy.
                  <br /> Improve Digestion and Relief from Morning Sickness:
                  Saffron can aid in digestion and help alleviate common
                  pregnancy-related digestive issues such as nausea, vomiting,
                  and bloating.
                  <br /> Enhanced Sleep Quality: Saffron can promote better
                  sleep quality, which is crucial for pregnant women who may
                  experience insomnia or disrupted sleep patterns.
                </p>
              </div>
            )}
          </div>
        </div> */}
        
        <br />

        {/* <CulinaryUses 
          data={data}
          setData={setData}
          handleCulinaryCheckboxChange={handleCulinaryCheckboxChange}
          handleInputChange={handleInputChange}
          handleOtherChange={handleOtherChange}
          handleStartListening={handleStartListening}
          handleReset={handleReset}
        /> */}

        {/* <MedicinalUses
          data={data}
          setData={setData}
          handleCulinaryCheckboxChange={handleCulinaryCheckboxChange}
          handleInputChange={handleInputChange}
        /> */}

        {/* <CosmeticUses
          data={data}
          setData={setData}
          handleCulinaryCheckboxChange={handleCulinaryCheckboxChange}
          handleInputChange={handleInputChange}
          handleOtherChange={handleOtherChange}
        /> */}

        {/* <PregnantWomenUses
          data={data}
          setData={setData}
          handleCulinaryCheckboxChange={handleCulinaryCheckboxChange}
          handleInputChange={handleInputChange}
        /> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

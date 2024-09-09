import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles/UserDashboard.css'

const Settings = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    email: "", // Added email to the initial state
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user profile data from the backend
    const fetchProfile = async () => {
      try { 
        const response = await axios.get("/profile", {
          withCredentials: true, // To include cookies in the request
        });
        if (response.data) {
          setPersonalInfo(response.data);
        } else {
          console.error("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => {
      const updatedInfo = {
        ...prevInfo,
        [name]: value,
      };
      console.log("Updated personal info:", updatedInfo);
      return updatedInfo;
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("/profile", personalInfo, {
        withCredentials: true, // Include cookies for authentication
      });

      if (response.status === 200) {
        setIsEditing(false); // Exit edit mode after saving
      } 
    } catch (error) {
      console.error("Error saving profile data:", error);
      // Optionally show an error message
    }
  };

  const handleCancel = () => {
    // Reload the profile data to reset any unsaved changes
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          withCredentials: true, // To include cookies in the request
        });
        if (response.data) {
          setPersonalInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
    setIsEditing(false); // Exit edit mode
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      // Redirect to login page
      navigate("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="set-container">

      <div className="set-card">
        <div>
          <h3 className="set-subtitle">SETTINGS</h3>
          <div className="set-form">
            <div className="set-field">
              <label className="set-label">Name</label>
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`set-input ${isEditing ? "set-input-edit" : "set-input-view"}`}
              />
            </div>
            <div className="set-field">
              <label className="set-label">Email</label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleInputChange}
                disabled
                className="set-input set-input-view"
              />
            </div>
            <div className="set-field">
              <label className="set-label">Phone</label>
              <input
                type="text"
                name="phone"
                value={personalInfo.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`set-input ${isEditing ? "set-input-edit" : "set-input-view"}`}
              />
            </div>
          </div>
        </div>

        <div className="set-actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="set-button set-button-save"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="set-button set-button-cancel"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="set-button set-button-edit"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleLogout}
            className="set-button set-button-logout"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom CSS file for additional styling

function App() {
  const [mood, setMood] = useState('');
  const [activity, setActivity] = useState('');
  const [suggestedActivity, setSuggestedActivity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging line
    try {
      await addDoc(collection(db, "checkins"), {
        mood: mood,
        activity: activity,
        timestamp: new Date(),
      });
      setMood('');
      setActivity('');
      setSubmitted(true);
      suggestActivity(mood);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const suggestActivity = (mood) => {
    console.log("Mood received:", mood); // Debugging line
    const activities = {
      happy: [
        "Go for a walk in nature.",
        "Celebrate with your favorite treat.",
        "Share your happiness with a friend."
      ],
      sad: [
        "Watch a comforting movie.",
        "Try a relaxing meditation.",
        "Write in a journal about your feelings."
      ],
      stressed: [
        "Practice deep breathing exercises.",
        "Listen to calming music.",
        "Do a quick workout to release tension."
      ],
      angry: [
        "Take a few minutes to calm down with a breathing exercise.",
        "Engage in a physical activity like running or hitting a punching bag.",
        "Try to identify and talk about what's causing the anger."
      ],
      neutral: [
        "Read a book you've been interested in.",
        "Organize a small area of your space.",
        "Try a new hobby or skill."
      ]
    };

    const moodKey = mood.toLowerCase();
    const suggested = activities[moodKey] || ["Take a moment to relax and reflect."];
    console.log("Suggested activities:", suggested); // Debugging line
    const randomActivity = suggested[Math.floor(Math.random() * suggested.length)];
    setSuggestedActivity(randomActivity);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Mental Health Check-in</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="form-group mb-3">
          <label htmlFor="moodInput">Your Mood</label>
          <input
            id="moodInput"
            type="text"
            className="form-control"
            placeholder="How are you feeling?"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="activityInput">Today's Activity</label>
          <input
            id="activityInput"
            type="text"
            className="form-control"
            placeholder="What did you do today?"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
      </form>
      {submitted && (
        <div className="mt-4 alert alert-info">
          <h4 className="alert-heading">Here's a suggestion to lift your mood:</h4>
          <p>{suggestedActivity}</p>
        </div>
      )}
    </div>
  );
}

export default App;

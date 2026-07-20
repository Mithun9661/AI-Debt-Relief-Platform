import { useState } from "react";
import API from "../api/api";

function NegotiationLetter() {
  const [userId, setUserId] = useState(1);
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLetter = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/ai/negotiation-letter?user_id=${userId}`
      );

      setLetter(response.data.letter);
    } catch (error) {
      console.log(error);
      alert("Failed to generate AI letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        color: "white"
      }}
    >
      <h1>AI Negotiation Letter Generator</h1>

      <input
        type="number"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginTop: "20px"
        }}
      />

      <br />
      <br />

      <button
        onClick={generateLetter}
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {loading
          ? "Generating..."
          : "Generate AI Negotiation Letter"}
      </button>

      {letter && (
        <div
          style={{
            marginTop: "40px",
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "25px",
            border: "1px solid gray",
            borderRadius: "12px",
            textAlign: "left",
            whiteSpace: "pre-wrap"
          }}
        >
          <h2>Generated Letter</h2>

          <p>{letter}</p>
        </div>
      )}
    </div>
  );
}

export default NegotiationLetter;
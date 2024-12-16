import React, { useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    // setImageUrl(""); 
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image.");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error(error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 mb-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Image Generator</h1>
      <div className="w-full max-w-lg space-y-4">
        <textarea
          className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="4"
          placeholder="Enter a creative prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>
      </div>
      <div className="mt-6">
      {isLoading && (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        )}
        {imageUrl && (
          <div className="space-y-4">
            <p className="text-center text-gray-700">Generated Image:</p>
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full max-w-md rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import { useState } from "react";

const DogImage = () => {
    const [dogUrl, setDogUrl] = useState("");

    const fetchDog = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/dog"); // backend route
            const data = await res.json();
            setDogUrl(data.url);
        } catch (err) {
            console.error("Error fetching dog image:", err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
            {/* Button to fetch dog image */}
            <button
                onClick={fetchDog}
                style={{
                    padding: "0.8rem 1.5rem",
                    background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontSize: "1rem",
                }}
            >
                Show a Cute Dog 🐶
            </button>

            {/* Show image only after button is clicked */}
            {dogUrl && (
                <img
                    src={dogUrl}
                    alt="Dog"
                    style={{
                        maxWidth: "300px",
                        marginTop: "1rem",
                        borderRadius: "12px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                />
            )}
        </div>
    );
};

export default DogImage;

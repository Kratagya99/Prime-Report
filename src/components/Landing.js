import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const countries = [
    { code: "in", name: "India", flag: "https://flagcdn.com/w320/in.png" },
    { code: "us", name: "USA", flag: "https://flagcdn.com/w320/us.png" },
    { code: "gb", name: "UK", flag: "https://flagcdn.com/w320/gb.png" },
    { code: "au", name: "Australia", flag: "https://flagcdn.com/w320/au.png" }
  ];

  const categories = [
    { key: "business", label: "Business", icon: "💼" },
    { key: "sports", label: "Sports", icon: "⚽" },
    { key: "technology", label: "Technology", icon: "💻" },
    { key: "health", label: "Health", icon: "🩺" }
  ];

  // Use useEffect to navigate when both selections are made
  useEffect(() => {
    if (selectedCountry && selectedCategory) {
      navigate(`/news/${selectedCountry}/${selectedCategory}`);
    }
  }, [selectedCountry, selectedCategory, navigate]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        {selectedCountry ? "Select News Category" : "Choose a Country"}
      </h2>
      
      {/* The rest of your JSX remains exactly the same... */}
      <div className="row g-4 justify-content-center">
        {!selectedCountry &&
          countries.map((c) => (
            <div key={c.code} className="col-md-2 col-sm-4">
              <div
                className="card shadow-sm border-0 h-100 country-card"
                role="button"
                onClick={() => setSelectedCountry(c.code)}
              >
                <div style={{ padding: "10px" }}>
                  <img
                    src={c.flag}
                    alt={c.name}
                    className="card-img-top"
                    style={{
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{c.name}</h5>
                </div>
              </div>
            </div>
          ))}

        {selectedCountry &&
          categories.map((cat) => (
            <div key={cat.key} className="col-md-2 col-sm-4">
              <div
                className="card text-center shadow-sm border-0 h-100 country-card"
                role="button"
                onClick={() => setSelectedCategory(cat.key)}
              >
                <div style={{ padding: "10px" }}>
                  <div
                    style={{
                      height: "120px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      background: "rgba(240,240,240,0.7)"
                    }}
                  >
                    {cat.icon}
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{cat.label}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>

      <style>{`
        .country-card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .country-card:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
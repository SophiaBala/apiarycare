import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Harvest.css";
import backarrow from "../assets/back-arrow.png";



export default function AddHarvest() {
    const navigate = useNavigate();

    const [honey, setHoney] = useState("");
    const [wax, setWax] = useState("");
    const [note, setNote] = useState("");

    const saveRecord = () => {
        const newRecord = {
            id: Date.now(),
            honey,
            wax,
            note,
            date: new Date().toLocaleDateString("uk-UA"),
        };

        const saved = JSON.parse(localStorage.getItem("harvest")) || [];
        const updated = [newRecord, ...saved];

        localStorage.setItem("harvest", JSON.stringify(updated));
        navigate("/harvest");
    };

    return (
        <div className="harvest-page">
            <header className="top-bar-harvest">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <img src={backarrow} className="button-img" />
                </button>
                <p className="harvest-title">Додати запис</p>
                
                <button className="edit-btn">
                </button>
            </header>

            <div className="form">
                <label>
                    Мед (кг)
                    <input
                        type="number"
                        value={honey}
                        onChange={(e) => setHoney(e.target.value)}
                    />
                </label>

                <label>
                    Віск (кг)
                    <input
                        type="number"
                        value={wax}
                        onChange={(e) => setWax(e.target.value)}
                    />
                </label>

                <button className = "saveBtn" onClick={saveRecord}>Зберегти</button>
            </div>
        </div>
    );
}

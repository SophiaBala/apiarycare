import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Harvest.css";
import backarrow from "../assets/back-arrow.png";

export default function Harvest() {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("harvest")) || [];
        setRecords(saved);
    }, []);

    const totalHoney = records.reduce((sum, r) => sum + Number(r.honey), 0);
    const totalWax = records.reduce((sum, r) => sum + Number(r.wax), 0);

    return (
        <div className="harvest-page">
        <header className="top-bar-harvest">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <img src={backarrow} className="button-img" />
            </button>
            <p className="harvest-title">Зібраний врожай</p>
            
            <button className="edit-btn">
                {/* <img src={edit} className="button-img" /> */}
            </button>
        </header>

            <div className="harvest-header">
                {/* <h1>Зібраний врожай</h1> */}
                <label className="add-harvest" onClick={() => navigate("/harvest/add")}>
                    +
                </label>
            </div>
            <div className="harvest-sec">

                            
                <div className="harvest-summary">
                    <div>Мед: <strong>{totalHoney} кг</strong></div>
                    <div>Віск: <strong>{totalWax} кг</strong></div>
                </div>

                {records.length > 0 ? (
                    <div className="harvest-list">
                        {records.map((r) => (
                            <div key={r.id} className="harvest-card">
                                <div className="harvest-date">{r.date}</div>
                                <div className="harvest-mark">Мед: {r.honey} кг</div>
                                <div className="harvest-mark">Віск: {r.wax} кг</div>
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-text">Поки що немає записів</p>
                )}
                </div>
            </div>
    );
}

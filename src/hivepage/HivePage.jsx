import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HivePage.css";
import backarrow from "../assets/back-arrow.png";
import hiveImg from "../assets/hive.png";

export default function HivePage() {
    const { apiaryId, hiveId } = useParams();
    const navigate = useNavigate();
    const [hive, setHive] = useState(null);

    useEffect(() => {
        const hives =
        JSON.parse(localStorage.getItem(`hives_${apiaryId}`)) || [];
        const currentHive = hives.find(h => h.id === Number(hiveId));
        setHive(currentHive);
    }, [apiaryId, hiveId]);

    if (!hive) return <p className="not-found">Вулик не знайдено</p>;

    return (
        <div className="hive-page">
        {/* Header */}
        <header className="top-bar">
            <button onClick={() => navigate(-1)} className="back-btn">
            <img src={backarrow} alt="Назад" />
            </button>
            <h1>{hive.hiveName}</h1>
        </header>

        {/* Hero */}
        <section className="hive-hero">
            <img src={hive.photo || hiveImg} alt="Вулик" />
            <div className="hero-info">
            <span>{hive.breed}</span>
            <span>{hive.hiveType}</span>
            </div>
        </section>

        {/* GRID */}
        <section className="info-grid">

            <div className="info-card">
            <b>Зібраний мед</b>
            <p className="honey">🍯 {hive.honeyCollected || 0} кг</p>
            </div>

            <div className="info-card">
            <b>Королева</b>
            <p className="muted">{hive.queen || "Немає даних"}</p>
            </div>

            <div className="info-card">
            <b>Годування</b>
            <p className="muted">{hive.feeding || "Не проводилось"}</p>
            </div>

            <div className="info-card">
            <b>Здоровʼя</b>
            <p className="muted">{hive.health || "Без зауважень"}</p>
            </div>

            <div className="info-card wide soft">
            <b>Інспекції</b>
            <p className="muted">Поки що немає інспекцій</p>
            </div>
        </section>
        </div>
    );
}

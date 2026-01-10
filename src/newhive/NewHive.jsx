import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewHive.css";
import edit from "../assets/edit.png";
import backarrow from "../assets/back-arrow.png";
import { useParams } from "react-router-dom";


const beeBreeds = [
    "Карпатська",
    "Карніка",
    "Українська степова",
    "Бакфаст",
    "Італійська",
];

const hiveTypes = [
    "Дадан",
    "Лежак",
    "Рута",
    "Альпійський",
    "Кенійський",
];

export default function NewHive() {
    const navigate = useNavigate();
    const { apiaryId } = useParams();

    const [hiveName, setHiveName] = useState("");
    const [breed, setBreed] = useState(beeBreeds[0]);
    const [hiveType, setHiveType] = useState(hiveTypes[0]);
    const [orientation, setOrientation] = useState("Горизонтальний");
    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setPhoto(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newHive = {
            id: Date.now(),
            hiveName,
            breed,
            hiveType,
            orientation,
            photo,
        };

        const key = `hives_${apiaryId}`;
        const existingHives = JSON.parse(localStorage.getItem(key)) || [];

        localStorage.setItem(
            key,
            JSON.stringify([newHive, ...existingHives])
        );

        navigate(-1);
    };


    return (
        <div className="add-hive-page">
            <header className="top-bar">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <img src={backarrow} className="button-img" />
                </button>
                <p className="apiary-title">Новий вулик</p>
                <button className="edit-btn"></button>
            </header>

            <form className="form" onSubmit={handleSubmit}>
                <div className="photo-block">
                    {photo ? (
                        <img src={photo} className="photo-preview" />
                    ) : (
                        <div className="photo-placeholder">Фото</div>
                    )}

                    <label className="photo-btn">
                        +
                        <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
                    </label>
                </div>

                <label>
                    Назва вулика
                    <input
                        value={hiveName}
                        onChange={(e) => setHiveName(e.target.value)}
                        placeholder="Напр. Вулик №5"
                        required
                    />
                </label>

                <label>
                    Порода бджіл
                    <select value={breed} onChange={(e) => setBreed(e.target.value)}>
                        {beeBreeds.map(b => <option key={b}>{b}</option>)}
                    </select>
                </label>

                <label>
                    Тип вулика
                    <select value={hiveType} onChange={(e) => setHiveType(e.target.value)}>
                        {hiveTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                </label>

                <div className="orientation">
                    <p>Орієнтація</p>
                    <div className="orientation-buttons">
                        <button
                            type="button"
                            className={orientation === "Горизонтальний" ? "active" : ""}
                            onClick={() => setOrientation("Горизонтальний")}
                        >
                            Горизонтальний
                        </button>
                        <button
                            type="button"
                            className={orientation === "Вертикальний" ? "active" : ""}
                            onClick={() => setOrientation("Вертикальний")}
                        >
                            Вертикальний
                        </button>
                    </div>
                </div>

                <button className="save-btn" type="submit">
                    Зберегти вулик
                </button>
            </form>
        </div>
    );
}

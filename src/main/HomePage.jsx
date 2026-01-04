import React, { useState } from "react";
import "./HomePage.css";

//////////// ДОДАНІ ВУЛИКИ
const initialHives = [
    { name: "Hive Alpha", status: "Excellent", presence: "Present", honey: 12, date: "Jan 2", statusColor: "bg-green-500" },
    { name: "Hive Beta", status: "Good", presence: "Present", honey: 8, date: "Dec 28", statusColor: "bg-green-400" },
    { name: "Hive Gamma", status: "Fair", presence: "Unknown", honey: 3, date: "Dec 20", statusColor: "bg-yellow-400" },
];

export default function HomePage() {
    const [search, setSearch] = useState("");
    const [hives, setHives] = useState(initialHives);

    const addHive = () => {
        const newHive = {
        name: `Hive ${hives.length + 1}`,
        status: "New",
        presence: "Unknown",
        honey: 0,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        statusColor: "bg-gray-400",
        };
        setHives([newHive, ...hives]);
    };

    const filteredHives = hives.filter(hive =>
        hive.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="homepage">
            <div className="search-add">
                <input
                type="text"
                placeholder="Search hives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={addHive}>+</button>
            </div>

            <div className="hive-grid">
                {filteredHives.map((hive, idx) => (
                <div
                    key={idx}
                    className="hive-card"
                    onClick={() => alert(`Navigate to ${hive.name} page`)}
                >
                    <h2>{hive.name}</h2>
                    <span className={`hive-status ${hive.statusColor}`}>{hive.status}</span>
                    <div className="hive-info">
                    <span>👑 {hive.presence}</span>
                    <span>🍯 {hive.honey} kg</span>
                    <span>📅 {hive.date}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

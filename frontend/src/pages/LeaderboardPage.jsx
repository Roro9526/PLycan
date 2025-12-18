import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaderboardPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const serverUrl = import.meta.env.VITE_SERVER_URL || `${window.location.protocol}//${window.location.hostname}:3001`;
            try {
                const res = await fetch(`${serverUrl}/leaderboard`);
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Erreur leaderboard:', error);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="home-container">
            <h1>🏆 Classement 🏆</h1>
            <div className="card">
                <table style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Rang</th>
                            <th>Joueur</th>
                            <th>Score</th>
                            <th>Parties</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.score} pts</td>
                                <td>{user.gamesPlayed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p>Aucun score enregistré pour le moment.</p>}
            </div>
            <button className="btn secondary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
                Retour
            </button>
        </div>
    );
}

export default LeaderboardPage;

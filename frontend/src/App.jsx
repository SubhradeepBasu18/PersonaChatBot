import "./App.css";
import PersonaCard from "./components/PersonaCard.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { chatApi } from "./services/api";

function App() {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const data = await chatApi.getPersonas();
                setPersonas(data);
            } catch (err) {
                console.error('Error fetching personas:', err);
                setError('Failed to load personas. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPersonas();
    }, []);

    const handlePersonaClick = (persona) => {
        navigate('/chat', { 
            state: { 
                personaName: persona.name,
                personaAvatar: persona.avatar,
                personaDescription: persona.description,
                socialLinks: [
                    { platform: 'youtube', url: 'https://youtube.com/@chaiaurcode' },
                    { platform: 'twitter', url: persona.name.includes('Hitesh') ? 'https://x.com/Hiteshdotcom' : 'https://x.com/piyushgarg_dev' },
                    { platform: 'github', url: persona.name.includes('Hitesh') ? 'https://github.com/hiteshchoudhary' : 'https://github.com/piyushgarg-dev' }
                ]
            } 
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen w-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading personas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-screen bg-zinc-900 flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-zinc-900 flex flex-col justify-center items-center p-4">
            <h1 className="text-3xl font-bold text-white mb-12">Choose a Persona to Chat With</h1>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {personas.map((persona, index) => (
                    <PersonaCard
                        key={persona.id}
                        name={persona.name}
                        description={persona.description}
                        avatar={persona.avatar}
                        gradient={index % 2 === 0 ? 'from-purple-600 via-pink-600 to-blue-500' : 'from-blue-500 via-green-500 to-yellow-500'}
                        onClick={() => handlePersonaClick(persona)}
                        socialLinks={[
                            { platform: 'youtube', url: 'https://youtube.com/@chaiaurcode' },
                            { platform: 'twitter', url: persona.name.includes('Hitesh') ? 'https://x.com/Hiteshdotcom' : 'https://x.com/piyushgarg_dev' },
                            { platform: 'github', url: persona.name.includes('Hitesh') ? 'https://github.com/hiteshchoudhary' : 'https://github.com/piyushgarg-dev' }
                        ]}
                    />
                ))}
            </div>
        </div>
    )
}

export default App;
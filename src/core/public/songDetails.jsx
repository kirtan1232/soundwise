import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar.jsx";
import { useTheme } from "../../components/ThemeContext";
import Footer from "../../components/footer.jsx";

const SongDetails = () => {
    const { theme } = useTheme();
    const { songId } = useParams();
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(16);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(5);
    const lyricsRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    // Dummy profile
    const DUMMY_PROFILE = {
        name: "Demo User",
        profilePicture: "/profile.png"
    };

    // Mock song data
    const mockSongs = [
        {
            _id: "1",
            songName: "Wonderwall",
            selectedInstrument: "Guitar",
            chordDiagrams: ["chord1.png", "chord2.png"],
            lyrics: [
                { section: "Verse 1", parsedDocxFile: ["[G]Today is gonna be the day", "That they're [D]gonna throw it back to [Am]you"] },
                { section: "Chorus", parsedDocxFile: ["And [C]all the roads we [D]have to walk are [Am]winding"] }
            ]
        },
        {
            _id: "2",
            songName: "Let It Be",
            selectedInstrument: "Piano",
            chordDiagrams: ["chord3.png"],
            lyrics: [
                { section: "Verse 1", parsedDocxFile: ["[C]When I find myself in [G]times of trouble", "[Am]Mother Mary [F]comes to me"] },
                { section: "Chorus", parsedDocxFile: ["[C]Let it [G]be, let it [Am]be, let it [F]be"] }
            ]
        },
        {
            _id: "3",
            songName: "Somewhere Over the Rainbow",
            selectedInstrument: "Ukulele",
            chordDiagrams: ["chord4.png", "chord5.png"],
            lyrics: [
                { section: "Verse 1", parsedDocxFile: ["[C]Somewhere [Em]over the rainbow", "[F]Way up [C]high"] },
                { section: "Bridge", parsedDocxFile: ["[F]Someday I'll [C]wish upon a star"] }
            ]
        },
        {
            _id: "4",
            songName: "Hallelujah",
            selectedInstrument: "Guitar",
            chordDiagrams: ["chord6.png"],
            lyrics: [
                { section: "Verse 1", parsedDocxFile: ["[C]I heard there was a [Am]secret chord", "[C]That David played and it [Am]pleased the Lord"] }
            ]
        },
        {
            _id: "5",
            songName: "Clair de Lune",
            selectedInstrument: "Piano",
            chordDiagrams: [],
            lyrics: []
        },
        {
            _id: "6",
            songName: "Aloha Oe",
            selectedInstrument: "Ukulele",
            chordDiagrams: ["chord7.png"],
            lyrics: [
                { section: "Verse 1", parsedDocxFile: ["[C]Aloha [G7]oe, aloha [C]oe"] }
            ]
        }
    ];

    const song = mockSongs.find(s => s._id === songId);

    // Function to get chord diagram image using Lorem Picsum
    const getSongImage = (fileName) => {
        const fileHash = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const imageId = (fileHash % 1000) + 1;
        return `https://picsum.photos/200/150?random=${imageId}`;
    };

    useEffect(() => {
        let scrollInterval;
        if (autoScroll && lyricsRef.current) {
            scrollInterval = setInterval(() => {
                if (lyricsRef.current.scrollTop + lyricsRef.current.clientHeight < lyricsRef.current.scrollHeight) {
                    lyricsRef.current.scrollTop += scrollSpeed;
                } else {
                    setAutoScroll(false);
                }
            }, 100);
        }
        return () => clearInterval(scrollInterval);
    }, [autoScroll, scrollSpeed]);

    useEffect(() => {
        const handleScroll = () => {
            if (lyricsRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = lyricsRef.current;
                const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
                setScrollProgress(progress);
            }
        };
        if (lyricsRef.current) {
            lyricsRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (lyricsRef.current) {
                lyricsRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    if (!song) return <div className="text-gray-600 dark:text-gray-400">Song not found.</div>;

    const renderLyrics = (lines) => (
        <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: `${fontSize}px`, color: theme === 'light' ? '#1F2937' : '#E5E7EB' }}>
            {Array.isArray(lines) ? lines.join('\n') : lines}
        </pre>
    );

    return (
        <div className={`bg-gradient-to-br min-h-screen flex flex-col ${theme === 'light' ? 'from-purple-100 to-blue-100' : 'from-gray-900 to-gray-800'}`}>
            <div className="relative flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 flex justify-center items-start mt-4">
                    <div className="bg-white bg-opacity-60 backdrop-blur-lg dark:bg-gray-800 dark:bg-opacity-80 rounded-3xl shadow-lg p-8 w-full max-w-7xl h-[85vh] flex flex-col relative overflow-y-auto">
                        <header className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider text-center">
                                Song - {song.songName}
                            </h1>
                        </header>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4"><strong>Instrument:</strong> {song.selectedInstrument}</p>
                        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">Chord Diagrams:</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {song.chordDiagrams && song.chordDiagrams.length > 0 ? (
                                song.chordDiagrams.map((chord, index) => (
                                    <img
                                        key={index}
                                        src={getSongImage(chord)}
                                        alt={`Chord Diagram ${index + 1}`}
                                        className={`rounded shadow-md ${
                                            song.chordDiagrams.length === 1
                                                ? 'w-full max-w-md h-auto'
                                                : 'w-24 h-auto'
                                        }`}
                                        onError={(e) => {
                                            e.target.src = `data:image/svg+xml,${encodeURIComponent(
                                                `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
                                                    <rect width="200" height="150" fill="#e5e7eb"/>
                                                    <text x="100" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">Chord Diagram</text>
                                                </svg>`
                                            )}`;
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">No chord diagrams available.</p>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">Lyrics:</h2>
                        <div ref={lyricsRef} className="flex-1 overflow-y-auto p-2 bg-gray-100 dark:bg-gray-700 rounded-lg custom-scrollbar">
                            {song.lyrics && song.lyrics.length > 0 ? (
                                song.lyrics.map((lyric, index) => (
                                    <div key={index} className="mt-2">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{lyric.section || "Unknown Section"}</h3>
                                        <div>
                                            {lyric.parsedDocxFile && lyric.parsedDocxFile.length > 0 ? (
                                                <div className="mt-1 bg-gray-200 dark:bg-gray-600 p-4 rounded-lg">
                                                    {renderLyrics(lyric.parsedDocxFile)}
                                                </div>
                                            ) : (
                                                <p className="text-gray-600 dark:text-gray-400">{lyric.lyrics || "No lyrics available."}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">No lyrics available.</p>
                            )}
                        </div>
                        <div className="flex justify-between items-center mt-3 bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-md w-full animate-fadeInUp animation-delay-300">
                            <div className="flex items-center space-x-4 flex-1 justify-center">
                                <button 
                                    onClick={() => setFontSize(fontSize - 1)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-md font-medium shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    - Font
                                </button>
                                <span className="text-gray-700 dark:text-gray-300 font-bold min-w-[60px] text-center bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg">
                                    {fontSize}px
                                </span>
                                <button 
                                    onClick={() => setFontSize(fontSize + 1)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-md font-medium shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200"
                                >
                                    + Font
                                </button>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <button
                                    onClick={() => setAutoScroll(!autoScroll)}
                                    className={`px-4 py-2 rounded-md font-medium transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 ${
                                        autoScroll 
                                            ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white" 
                                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                    }`}
                                >
                                    {autoScroll ? (
                                        <span className="flex items-center">
                                            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                                            Stop Scroll
                                        </span>
                                    ) : (
                                        "Auto Scroll"
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center space-x-3 flex-1 justify-center">
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Speed:</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={scrollSpeed}
                                    onChange={(e) => setScrollSpeed(Number(e.target.value))}
                                    className="cursor-pointer w-24 h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none slider"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 font-bold min-w-[20px] text-center bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded">
                                    {scrollSpeed}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
                <div className="absolute top-4 right-4 bg-white bg-opacity-60 backdrop-blur-lg dark:bg-gray-800 dark:bg-opacity-80 rounded-full p-2">
                    <img
                        src={DUMMY_PROFILE.profilePicture}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer"
                        onClick={() => navigate("/profile")}
                    />
                </div>
            </div>
            <Footer />

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #8B5CF6, #EC4899);
                    border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #7C3AED, #DB2777);
                }

                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    background: linear-gradient(to right, #8B5CF6, #EC4899);
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }

                .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }

                .slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    background: linear-gradient(to right, #8B5CF6, #EC4899);
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
};

export default SongDetails;
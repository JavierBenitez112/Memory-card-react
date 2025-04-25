import React, { useState, useEffect } from 'react';
import Rcard from './components/Rcard';
import img1 from './assets/rengoku.jpg';
import img2 from './assets/zenitsu.jpg';
import img3 from './assets/inosuke.jpg';
import img4 from './assets/tanjiro.jpg';
import img5 from './assets/tengen.jpg';
import img6 from './assets/tomioka.jpg';
import img7 from './assets/nezuko.jpg';
import img8 from './assets/obanai.jpg';

import './game.css';

const Game = () => {
    const [flippedCards, setFlippedCards] = useState({});
    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStart, setGameStart] = useState(true);

    const initialCards = [
        { id: '1', image: img1, title: 'Rengoku', matched: false },
        { id: '2', image: img2, title: 'Zenitsu', matched: false },
        { id: '3', image: img3, title: 'Inosuke', matched: false },
        { id: '4', image: img4, title: 'Tanjiro', matched: false },
        { id: '5', image: img5, title: 'Tengen', matched: false },
        { id: '6', image: img6, title: 'Tomioka', matched: false },
        { id: '7', image: img7, title: 'Nezuko', matched: false },
        { id: '8', image: img8, title: 'Obanai', matched: false },
    ];

    useEffect(() => {
        // Duplicate the cards array to create pairs
        const duplicatedCards = [...initialCards, ...initialCards].map((card, index) => ({
            ...card,
            id: String(index + 1), // Assign unique IDs to all cards
        }));

        // Shuffle the cards
        const shuffledCards = shuffleArray(duplicatedCards);
        setCards(shuffledCards);

        // Initially flip all cards and then flip back after 5 seconds
        setFlippedCards(shuffledCards.reduce((acc, card) => {
            acc[card.id] = true;
            return acc;
        }, {}));

        setTimeout(() => {
            setFlippedCards({});
            setGameStart(false);
        }, 5000);
    }, []);

    // Function to shuffle array (Fisher-Yates shuffle)
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const handleClick = (card) => {
        if (gameStart) return; // Disable clicks during the initial phase

        if (firstCard === null) {
            setFirstCard(card);
            setFlippedCards((prev) => ({
                ...prev,
                [card.id]: true,
            }));
        } else if (secondCard === null) {
            setSecondCard(card);
            setFlippedCards((prev) => ({
                ...prev,
                [card.id]: true,
            }));
            setMoves(moves + 1);
        }
    };

    useEffect(() => {
        if (firstCard && secondCard) {
            if (firstCard.title === secondCard.title) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.title === firstCard.title) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                setFirstCard(null);
                setSecondCard(null);
            } else {
                setTimeout(() => {
                    setFlippedCards(prev => ({
                        ...prev,
                        [firstCard.id]: false,
                        [secondCard.id]: false,
                    }));
                    setFirstCard(null);
                    setSecondCard(null);
                }, 1000);
            }
        }
    }, [firstCard, secondCard]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setGameOver(true);
        }
    }, [cards]);

    const resetGame = () => {
        // Duplicate the cards array to create pairs
        const duplicatedCards = [...initialCards, ...initialCards].map((card, index) => ({
            ...card,
            id: String(index + 1), // Assign unique IDs to all cards
        }));

        // Shuffle the cards
        const shuffledCards = shuffleArray(duplicatedCards);
        setCards(shuffledCards);
        setFlippedCards({});
        setFirstCard(null);
        setSecondCard(null);
        setMoves(0);
        setGameOver(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="text-lg font-bold text-white mb-6 bg-gray-800 px-6 py-3 rounded-full shadow-lg">
                Movimientos: {moves}
            </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => !flippedCards[card.id] && !card.matched ? handleClick(card) : null}
                            className={`relative card text-white p-4 rounded ${flippedCards[card.id] || card.matched ? 'cardFlip' : ''}`}
                        >
                            <div className="front p-4 rounded top-0 rounded-t-lg w-64 h-64 object-cover lg:w-48 lg:h-48 md:w-40 md:h-40">
                                <Rcard image="https://wallpapersok.com/images/hd/textured-blue-backgrounds-udpla9k5opifb3bk.jpg" title="" />
                            </div>
                            <div className="absolute back top-0 text-white p-4 rounded back">
                                <Rcard image={card.image} title={card.title} />
                            </div>
                        </div>
                    ))}
            </div>
            {gameOver && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center transform animate-fadeIn">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            ¡Felicitaciones! Ganaste en {moves} movimientos
                        </h2>
                        <button 
                            onClick={resetGame}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                        >
                            ¿Jugar de nuevo?
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;

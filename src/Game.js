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

    useEffect(() => {
        // Duplicate the cards array to create pairs
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
        const duplicatedCards = [...initialCards, ...initialCards].map((card, index) => ({
            ...card,
            id: String(index + 1), // Assign unique IDs to all cards
        }));

        // Shuffle the cards
        const shuffledCards = shuffleArray(duplicatedCards);
        setCards(shuffledCards);
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
        <div className="h-screen centered">
            <div className="moves">Moves: {moves}</div>
            <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => !flippedCards[card.id] && !card.matched ? handleClick(card) : null}
                        className={`relative card bg-blue-500 text-white p-4 rounded ${flippedCards[card.id] || card.matched ? 'cardFlip' : ''}`}
                    >
                        <div className="front">
                            <Rcard image={card.image} title={card.title} />
                        </div>
                        <div className="absolute top-0 back">
                            <Rcard image="https://opengameart.org/sites/default/files/card%20back%20red.png" title="Back" />
                        </div>
                    </div>
                ))}
            </div>
            {gameOver && (
                <div className="game-over">
                    <h2>Game Over! You won in {moves} moves.</h2>
                    <button onClick={resetGame}>Play Again</button>
                </div>
            )}
        </div>
    );
};

export default Game;

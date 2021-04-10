import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { MemoizedCard } from './Card';

const Deck = () => {
  const [drawnCards, setDrawnCards] = useState([]);
  const [deckId, setDeckId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);

  const BASE_URL = "https://deckofcardsapi.com/api/deck"

  /** Get deck of cards when page loads */
  useEffect(() => {
    const getDeck = async () => {
      let deckResp = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(deckResp.data.deck_id);
      setIsShuffling(false);
    } 
    getDeck();
  }, []);

  const handleDraw = async () => {
    setIsDrawing(true);
    try {
      let resp = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
      const {success, cards} = resp.data;
      if(success) {
        setDrawnCards(c => [...c, cards[0]]);
      } else {
        alert('No cards remaining!');
      }
    } catch (e) {
      console.log(e);
    }
    setIsDrawing(false);
  }

  const handleShuffle = async () => {
    setIsShuffling(true);
    try {
      await axios.get(`${BASE_URL}/${deckId}/shuffle/`);
      setDrawnCards([]);
    } catch(e) {
      console.log(e);
    }
    setIsShuffling(false);
  }
  
  return (
    isShuffling 
      ? <p>Shuffling New Deck...</p>
      : <div>
      {isDrawing
      ? <span>Drawing...</span>
      : <button onClick={handleDraw}>Draw a Card</button>
      }
      <button onClick={handleShuffle}>Shuffle the Deck</button>
      {drawnCards.map(({code, image}) => {
        return <MemoizedCard key={code} imageUrl={image} />
      })}
    </div>
  )
}


export default Deck;
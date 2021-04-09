import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { MemoizedCard } from './Card';

const Deck = () => {
  const [drawnCards, setDrawnCards] = useState([]);
  const [deckId, setDeckId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);

  /** Get deck of cards when page loads */
  useEffect(() => {
    const getDeck = async () => {
      let deckResp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      setDeckId(deckResp.data.deck_id);
      setIsShuffling(false);
    } 
    getDeck();
  }, []);

  const handleDraw = async () => {
    setIsDrawing(true);
    try {
      let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
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
  
  return (
    isShuffling 
      ? <p>Shuffling New Deck...</p>
      : <div>
      {isDrawing
      ? <span>Drawing...</span>
      : <button onClick={handleDraw}>Draw a Card</button>
      }
      {drawnCards.map(({code, image}) => {
        return <MemoizedCard key={code} imageUrl={image} />
      })}
    </div>
  )
}


export default Deck;
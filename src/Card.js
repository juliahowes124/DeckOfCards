import React from 'react';

const Card = ({ imageUrl }) => {
  return (
    <div style={{position: "absolute"}}>
      <img src={imageUrl}/>
    </div>
  )

}
export const MemoizedCard = React.memo(Card);
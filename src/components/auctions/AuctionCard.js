import React, { useContext } from 'react'
import Countdown from 'react-countdown'
import { AuthContext } from '../../context/AuthContext';


const renderer = ({days, hours, minutes, seconds, completed, props}) => {
   if (completed) {
    return null;
   }
   return (
       <div className = "col">
           <div className = "card shadow-sm" >
                <div style ={{
                    height: '320px',
                    backgroundImage: `url(${props.item.imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }} 
                className ="w-100"/>
                <div className="card-body">
                    <p className ="lead display-6">{props.item.title}</p>
                    <div className="d-flex justify-content-between align-item-center">
                        <h5>
                            {days * 24 + hours} hr: {minutes} min: {seconds} sec
                        </h5>
                    </div>
                    <p className="card-text">{props.item.description}</p>
                    <div className="d-flex justify-content-between align-item-center">
                        <div>
                            {!props.owner ? (
                              <div className="btn btn-outline-secondary" 
                              onClick={()=> props.auctionBid()}>Bid</div>
                            ) : props.owner.email === props.item.email ? ( 
                               <div className="btn btn-outline-secondary" onClick={() => props.endAuction()}>Cancel Auction</div>
                            ) : ( 
                               <div className="btn btn-outline-secondary">Bid</div>
                            )}
                        </div>
                        <p className="display-6">${props.item.currentPrice}</p>
                    </div>
                </div>
           </div>
       </div>
   )
}

export const AuctionCard = ({item}) => {
    let expiredDate = item.duration;
    const { currentUser, auctionBid, endAuction } = useContext(AuthContext)
    return <Countdown 
    owner={currentUser} 
    date={expiredDate} 
    item={item} 
    enderer={renderer}
    auctionBid={auctionBid}
    endAuction={endAuction}
    />
}



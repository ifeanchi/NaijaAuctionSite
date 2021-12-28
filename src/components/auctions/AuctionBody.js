import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { AddAuction } from './AddAuction';
import {ProgressBar} from './ProgressBar';

export const AuctionBody = () => {
const [auction, setAuction] = useState(null)

const {currentUser} = useContext(AuthContext)
const {docs} = useFirestore('auctions')

    return (
        <div className = "py-5">
            <div className = "container">

                {auction && <ProgressBar auction={auction} setAuction={setAuction}/>}

                {currentUser && <AddAuction setAuction={setAuction}/>}

                {docs && <h1>doc exist {docs.length} </h1>}
            </div>
        </div>
    )
}

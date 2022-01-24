import { createContext, useState, useEffect } from "react";
import { authApp, firestoreApp } from "../config/firebase";


export const AuthContext = createContext()

export const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bidMsg, setBidMsg] = useState("")

    const register = (email, password) => {
        return authApp.createUserWithEmailAndPassword(email, password)
    };

    const login = (email, password) => {
        return authApp.signInWithEmailAndPassword(email, password)
    };

    const logout = () => {
        return authApp.signOut()
    }; 

    const auctionBid = (auctionId, price) => {
        if (!currentUser) {
            setBidMsg("Please login to bid")
        }
        let newPrice = math.floor((price/100) * 110)
        const db = firestoreApp.collection('auctions')
        return db.doc(auctionId).update({
            currentPrice : newPrice,
            currentwinner: currentUser.email,
        })
    }

    const endAuction = (auctionId) => {
        const db = firestoreApp.collection('auctions')
        return db.doc(auctionId).delete()
    }

    useEffect(() => {
        const subscribe = authApp.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return subscribe;
    }, [])

    useEffect(() => {
        const interval = setTimeout(() => setBidMsg(""), 5000);
        return () => clearTimeout(interval);
    }, [bidMsg])

  return <AuthContext.Provider value={{currentUser, login, register, logout, auctionBid, endAuction, bidMsg}}>
      {!loading && children}
      </AuthContext.Provider>
};
import { useState, useEffect } from 'react';
import { firestoreApp, storageApp, timestamps } from '../config/firebase';

const useStorage = (data) => {
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(null)

  useEffect(() => {
      const storageRef = storageApp.ref(data.itemImage.name);

      const collectionRef = firestoreApp.collection('auctions');

      storageRef.put(data.itemImage).on('state_change', (snap) => {
          let percentage = (snap.bytesTransferred/snap.totalBytes) * 100;
          setProgress(percentage);
      }, (error) => {
          console.log(error)
      }, async () => {
          const imageUrl = await storageRef.getDownloadURL();
          const CreatedAt = timestamps();
          delete data.itemImage;
          await collectionRef.add({...data, CreatedAt, imageUrl});
          setIsCompleted(true)
      })
  }, [data])

  return { progress, isCompleted};
}

export default useStorage;
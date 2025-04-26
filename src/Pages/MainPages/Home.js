import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../Firebase';

function Home() {

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "courses"));

            // const usersList = querySnapshot.docs.map(doc => ({
            //   id: doc.id,
            //   ...doc.data()s

            // }));
            // setUsers(usersList);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchUsers();
        
      }, []);
    

  return (
    <div>
      
    </div>
  )
}

export default Home

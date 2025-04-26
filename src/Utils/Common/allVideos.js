import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../Firebase";

const allVideos  = async (id) => {
  debugger
  try {
    const q = query(collection(db, "videos"), where("parentId", "==", id));
    const querySnapshot = await getDocs(q);
    const folders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return folders;
  } catch (err) {
    console.error("Error fetching folders:", err);
  }
};


export default allVideos;
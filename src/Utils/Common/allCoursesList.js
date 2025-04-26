import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

export const  allCoursesList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courseData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return courseData;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

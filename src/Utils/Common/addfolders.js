import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase";

const addfolders = async (file, parentId) => {
  debugger;
  if (!file ) {
    alert("Folder name cannot be empty");
    return;
  }

  console.log(parentId)

  try {
    const  docRef = await addDoc(collection(db, "folders"), {
      flname: file,
      parentId: parentId ,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Folder Created");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error creating folder. Please try again.");
  }
};

export default addfolders;

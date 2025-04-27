import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, app, storage, db } from "../../Firebase";
import { Divider } from "@mui/material";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    city: "",
    country: "",
    pincode: "",
    photoURL: "",
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    city: "",
    country: "",
    pincode: "",
    photoURL: "",
  });

  useEffect(() => {
    debugger;
    const fetchProfile = async () => {
      const email = sessionStorage.getItem("email");
      if (!email) return;

      const userRef = doc(db, "users", email);
      const docSnap = await getDoc(userRef);
      console.log(docSnap);

      if (docSnap.exists()) {
        setProfile((prev) => ({ ...prev, ...docSnap.data() }));
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const email = sessionStorage.getItem("email");
    if (!email) return;

    const userRef = doc(db, "users", email);
    await setDoc(userRef, { ...profile, email });
    setIsEditing(false);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfile((prev) => ({ ...prev, photoURL: base64 }));
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl md:w-[80%]  w-full   ">
        <div className="flex flex-col items-center mb-8">
          <img
            src={profile.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mb-4"
          />

          {(isEditing && !error.photoURL) && <span className="">{error.photoURL}</span>}

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className=" text-xs text-gray-500
            file:mr-4 file:py-2 file:px-6
            file:rounded-lg  file:border-0
            file:text-sm file:font-semibold
            file:bg-gradient-to-r file:from-blue-600 file:to-blue-400
            file:text-white hover:file:from-blue-700 hover:file:to-blue-500"
            />

          )}
          <Divider className="font-semibold my-4 w-full">
            {" "}
            <h2 className="text-3xl font-bold text-blue-700">Profile Page</h2>
          </Divider>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(profile).map(
            ([key, value]) =>
              key !== "photoURL" && (
                <div key={key} className="mb-2">
                  <label className="block font-semibold text-blue-600 capitalize mb-1">
                    {key } :-
                  </label>
                  {isEditing && key !== "email" ? (
                    <input
                      type="text"
                      name={key}
                      value={value === "N/A" ? "" : value}
                      onChange={handleChange}
                      className="w-full border border-blue-300 p-2 rounded"
                    />
                  ) : (
                    <p className="text-gray-700 break-words">
                      {value === "" ? "N/a" : value}{" "}
                    </p>
                  )}
                </div>
              )
          )}
        </div>

        <div className="flex justify-end mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

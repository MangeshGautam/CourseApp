import React, { useState } from "react";
import { TextField, Button, Typography, Divider } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase"; // assume firebase is initialized here

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    price: "",
    description: "",
    mentorName: "",
    language: "",
    introVideo: null,
    introimg:null
  });

  const handleChange = (e) => {
    debugger;
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    debugger;
    console.log(formData);
    e.preventDefault();

    for (const key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        (typeof formData[key] === "string" && formData[key].trim() === "")
      ) {
        alert(`Please fill the "${key}" field`);
        return;
      }
    }
    try {
      const storageRefimg  = ref(storage, `courses/images/${formData.introimg.name}`);
      await uploadBytes(storageRefimg, formData.introimg);
      const thumbnailurl = await getDownloadURL(storageRefimg);
 
      const storageRef = ref(storage, `courses/videos/${formData.introVideo.name}`);
      await uploadBytes(storageRef, formData.introVideo);
      const url = await getDownloadURL(storageRef);

      const courseData = {
        courseName: formData.courseName,
        price: formData.price,
        description: formData.description,
        mentorName: formData.mentorName,
        language: formData.language,
        introUrl: url,
        thumbnail:thumbnailurl
      };

      await addDoc(collection(db, "courses"), courseData);
      alert("Course added successfully!");

      setFormData({
        courseName: "",
        price: "",
        description: "",
        mentorName: "",
        language: "",
        introVideo: null,
        introimg:null
      });
    } catch (error) {
      console.error("Error uploading course:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-2>">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl">
        <div className="text-center mb-4 ">
          <Divider
            className="my-6"
            sx={{
              "&::before, &::after": {
                borderColor: "#505451", // Optional: custom divider color
              },
            }}
          >
            <Typography
              variant="h5"
              className="text-gray-600 font-bold text-center"
            >
              Add New Course
            </Typography>
          </Divider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Mentor Name"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className="mt-4">
          <TextField
            className="mt-4"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </div>
        <div className="mt-4 flex md:flex-row flex-col justify-between ">
          <div className="flex md:flex-row flex-col justify-between">
            <span className="text-base font-bold text-gray-600">
           
              Thumbnail Video{" "}
            </span>
            <input
              type="file"
              accept="video/*"
              onChange={handleChange}
              name="introVideo"
              className=" text-sm text-gray-500
             file:mr-4 file:py-2 file:px-6
             file:rounded-lg  file:border-0
             file:text-sm file:font-semibold
             file:bg-gradient-to-r file:from-blue-600 file:to-blue-400
             file:text-white hover:file:from-blue-700 hover:file:to-blue-500"
            />
          </div>

          <div className="flex md:flex-row flex-col justify-between">
            <span className="text-base font-bold text-gray-600">
              Thumbnail Images{" "}
            </span>

            <input
              type="file"
              accept="image/*"
              name="introimg"
              onChange={handleChange}
              className="text-sm text-gray-500
   file:mr-4 file:py-2 file:px-6
   file:rounded-lg  file:border-0
   file:text-sm file:font-semibold
   file:bg-gradient-to-r file:from-blue-600 file:to-blue-400
   file:text-white hover:file:from-blue-700 hover:file:to-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button
            onClick={handleSubmit}
            variant="contained"
            className='" hover:bg-blue-50 hover:text-gray-600 font-bold'
          >
            Upload Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;

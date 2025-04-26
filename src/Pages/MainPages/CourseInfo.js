import { MarginOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function CourseInfo({ Folder ,isContent,setisContent}) {
  // const location = useLocation();
  // const data = location.state.data;
  // console.log(data);
  console.log("CourseIfon", Folder);
  const navigate = useNavigate();

  const data = Folder;
  console.log(data, " DAta ");

  const handlecontent = () => {
    navigate('/courses/content', { state: { data: Folder } });
  };

  const hanldeback = () =>{

    setisContent(!isContent);

  }

  return (
    <div className="flex md:flex-row  flex-col ">
      <div className="">
        <ArrowBackIcon  className="font-bold" onClick={hanldeback}/>
      </div>
      {/* Left Content */}
      <div className="w-full md:w-[60%] p-4">
        <h1 className="text-6xl hover:text-blue-700 mt-10  font-bold text-blue-600">
          {data.courseName}
        </h1>
        <p className="mt-2">Mentor: {data.mentorName}</p>
        <p className="mt-2">Language: {data.language}</p>
        <p className="mt-4">{data.description}</p>

        <p className="mt-2 text-3xl font-medium">Price: ₹{data.price}</p>

        <div className="flex gap-[60px] mt-10">
          <Button variant="contained">Enroll</Button>
          <Button variant="outlined" onClick={handlecontent}>
            Content
          </Button>
        </div>
      </div>
      {/* Right Content */}
      <div className="w-full md:w-[40%]  justify-center items-center p-4">
        <iframe
          width="100%"
          height="315"
          src={data.introUrl}
          title="Course Intro Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded shadow-md"
        />
      </div>
    </div>
  );
}

export default CourseInfo;

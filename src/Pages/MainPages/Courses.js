import React, { useContext, useEffect, useState } from "react";
import CourseCard from "../../Components/CourseCard";
import { Box, Grid } from "@mui/material";
import { allCoursesList } from "../../Utils/Common/allCoursesList"

import { ContentContext } from "../../Context/contentContext";

function Courses({setisContent , setFolders}) {
  const [allCourses, setAllcourses] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const  {idfolder, setidfolder} = useContext(ContentContext);

  // useEffect(() => {
  //   console.log(idfolder, "Updated context value for idfolder");
  // }, [idfolder]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await allCoursesList();
      setAllcourses(courses);
      setLoading(true); // Set loading to true initially
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (data) => {
    setisContent(true);
    setidfolder(data);
    setFolders(data);
    console.log(idfolder , "Hanlde Idfolder ");
    console.log(data ,"handle Click ")
    
  };

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {allCourses.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <div onClick={() => handleCourseClick(item)}>
                <CourseCard
                  course_name={item.courseName}
                  description={item.description}
                  fees={item.price}
                  thumbnail={item.thumbnail}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Courses;

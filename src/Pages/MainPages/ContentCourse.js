import React, { useState } from "react";
import { ContentProvider } from "../../Context/contentContext";
import CourseContent from "../../Components/CourseContent";
import Courses from "./Courses";
import CourseInfo from "./CourseInfo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ContentCourse() {
  const [isContent, setisContent] = useState(false);
  const [Folder, setFolders] = useState({});
  return (
    <ContentProvider>
      <div>

       


        {!isContent ? (
          <Courses setisContent={setisContent} setFolders={setFolders} />
        ) : (
          <CourseInfo Folder={Folder} setisContent={setisContent} isContent={isContent} />
        )}
      </div>
    </ContentProvider>
  );
}

export default ContentCourse;

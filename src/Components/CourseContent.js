import React, { useContext, useEffect, useState } from "react";
import { Button, Popover, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import Folder from "./Folder";
import { ContentContext } from "../Context/contentContext";
import allfolders from "../Utils/Common/allfolders";
import addfolders from "../Utils/Common/addfolders";

function CourseContent() {
  const [Folders, setFolders] = useState([]);
  const { idfolder, setidfolder } = useContext(ContentContext);
  console.log(idfolder,"IdFolders")

  // Create file states
  const [anchorEl, setAnchorEl] = useState(null);
  const [File, setFile] = useState("");

  // Upload video states
  const [uploadAnchorEl, setUploadAnchorEl] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const open = Boolean(anchorEl);
  const uploadOpen = Boolean(uploadAnchorEl);

  useEffect(() => {
    fetchFolders();
  }, []);
  console.log(idfolder, "IDFolder ")

  const fetchFolders = async () => {
  
    const folder = await allfolders(idfolder?.id);
    console.log(folder, "folders");
    setFolders(folder);
    setidfolder(folder);
  }; 

  // Create file logic  
  const handleClick = (event) => {
    
  
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFile("");
  };


  console.log(idfolder.id)

  const addfile = async () => {
    debugger
    // Your actual add 
    const fileExists = Folders.some((item) => item.flname === File);
    if (fileExists) {
      alert("File already exists");
      return;
    }
    console.log(idfolder,"add file idfolder")
    const a = addfolders(File , idfolder.id)
    console.log(a);
    fetchFolders();;


    alert(`Creating file: ${File}`);
    handleClose();
  };

  // Upload logiclogic
  const handleUploadClick = (event) => {
    setUploadAnchorEl(event.currentTarget);
  };

  const handleUploadClose = () => {
    setUploadAnchorEl(null);
    setVideoName("");
    setSerialNo("");
    setVideoFile(null);
  };

  const uploadVideo = async () => {
    if (!videoName || !serialNo || !videoFile) {
      alert("Please fill all fields");
      return;
    }

    setUploading(true);
    setTimeout(() => {
      alert("Mock upload done!");
      setUploading(false);
      handleUploadClose();
    }, 1000);
  };

  return (
    <div>
      {/* Buttons Row */}
      <div className="flex justify-end space-x-4 mt-2 mr-2">
        {/* Create File */}
        <Button
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={handleClick}
        >
          Create a File
        </Button>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <div className="p-4 space-y-3 w-64">
            <TextField
              label="File Name"
              fullWidth
              value={File}
              onChange={(e) => setFile(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addfile}
            >
              Add File
            </Button>
          </div>
        </Popover>

        {/* Upload Video */}
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={handleUploadClick}
        >
          Upload
        </Button>

        <Popover
          open={uploadOpen}
          anchorEl={uploadAnchorEl}
          onClose={handleUploadClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <div className="p-4 space-y-3 w-72">
            <TextField
              label="Video Name"
              fullWidth
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
            />
            <TextField
              label="Serial No"
              type="number"
              fullWidth
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={uploadVideo}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </Popover>

        {/* Delete Button (not functional yet) */}
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => alert("Delete logic not implemented yet")}
        >
          Delete
        </Button>
      </div>

      {/* Folder View */}
      <div>
        <Folder folders={Folders} />
      </div>
    </div>
  );
}

export default CourseContent;

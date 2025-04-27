import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Popover, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../Firebase";
import Folder from "./Folder";
import addfolders from "../Utils/Common/addfolders";
import allfolders from "../Utils/Common/allfolders";
import { useLocation } from "react-router-dom";
import allVideos from "../Utils/Common/allVideos";
import { ArrowBack } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import CircularProgress from '@mui/material/CircularProgress';

function CourseList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploadAnchorEl, setUploadAnchorEl] = useState(null);
  const [File, setFile] = useState("");
  const [folders, setFolders] = useState([]);
  const [videoName, setVideoName] = useState("");
  const [videoduration, setvideoduration] = useState();
  const [serialNo, setSerialNo] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [videolist, setvideolist] = useState([]);

  // get data by navigation

  const location = useLocation();

  const selectedCourse = location.state.data;
  const [parentId, setparentId] = useState(selectedCourse.id);
  const [loading, setisloadig] = useState(true); // loaderr

  const open = Boolean(anchorEl);
  const uploadOpen = Boolean(uploadAnchorEl);

  const [prev, setprev] = useState([]); // For  going to preveous
  const [next, setnext] = useState([]); // For going to next

  useEffect(() => {
    debugger;
    fetchFolders();
    fetchvideos();

    setTimeout(() => {
      setisloadig(false);
    }, 700);
  }, [parentId]);

  const fetchFolders = async () => {
    const folder = await allfolders(parentId);
   
    setFolders(folder);
  };

  const fetchvideos = async () => {
    debugger;
    const videos = await allVideos(parentId);
    setvideolist(videos);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFile("");
  };

  const addfile = async () => {
    const fileExists = folders.some((item) => item.flname === File);

    if (fileExists) {
      alert("File already exists");
      return;
    }

    addfolders(File, parentId);
    fetchFolders();
    handleClose();

    setAnchorEl(false);
  };

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

    const duration = await getVideoDurationFormatted(videoFile);
    
    // videoFile videoName serialNo
    try {
      setUploading(true);
      const storage = getStorage();
      const fileRef = ref(storage, `courses/`);
      await uploadBytes(fileRef, videoFile);
      const url = await getDownloadURL(fileRef);

      await addDoc(collection(db, "videos"), {
        flname: videoName,
        serial: serialNo,
        url: url,
        type: "video",
        parentId: parentId,
        uploadedAt: new Date(),
        duration: duration,
      });

      alert("Video uploaded successfully!");
      fetchvideos();
      handleUploadClose();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handlePrev = () => {
    debugger;
    var n = prev.length;

    if (n > 0) {
      const popId = prev.pop();

      if (!next.includes(popId)) {
        setnext((prev) => [...prev, popId]);
      }

      setparentId(popId);
      setisloadig(true);
      setTimeout(() => {
        setisloadig(false);
      }, 700);
    }
  };

  const handleNext = async () => {
    debugger;
    if (next.length > 0) {
     

      const popId = next.pop();

      if (!prev.includes(popId)) {
        setprev((prev) => [...prev, popId]);
      }

      setparentId(popId);

      setisloadig(true);
      setTimeout(() => {
        setisloadig(false);
      }, 700);
    }
  };

  const handleParentId = (id) => {
    setprev((prev) => [...prev, parentId]);

    setparentId(id);
    setisloadig(true);
  };

  const getVideoDurationFormatted = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        const durationInSeconds = video.duration;

        // Convert to mm:ss
        const minutes = Math.floor(durationInSeconds / 60)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor(durationInSeconds % 60)
          .toString()
          .padStart(2, "0");
        const formattedDuration = `${minutes}:${seconds}`;

        resolve(formattedDuration);
      };

      video.onerror = function () {
        reject("Error loading video metadata.");
      };

      video.src = URL.createObjectURL(file);
    });
  };

  return (
    <div>
      <div className="flex justify-end space-x-4 mt-2 mr-2">
        {/* Create File Button */}
        <Button
          className="text-blue-500 border-blue-500 hover:bg-blue-50"
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

        {/* Upload Video Button */}

        {/* <UploadPopover folderId={selectedCourse.id} /> */}

        <Button
          className="text-blue-500 border-blue-500 hover:bg-blue-50"
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
              onChange={(e) => {
                setVideoName(e.target.value);
              }}
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
              onChange={(e) => {
             

                setVideoFile(e.target.files[0]);
              }}
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

        {/* Delete Button (Not Implemented Yet) */}
        {/* <Button
          className="text-blue-500 border-blue-500 hover:bg-blue-50"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button> */}
      </div>
      <div className="flex flex-row justify-between gap-4">
        <Button onClick={handlePrev}>
          <ArrowBack />
        </Button>

        <Button onClick={handleNext}>
          <ArrowForwardIcon />
        </Button>
      </div>
      <div className="w-full h-96 flex items-center justify-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Folder
            folders={folders}
            videolist={videolist}
            handleParentId={handleParentId}
          />
        )}
      </div>
    </div>
  );
}

export default CourseList;

import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { coursedefualt } from "../Assets/Index";
import { db } from "../Firebase"; // import your firebase config
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function CourseCard(
  handleCourseClick,
  item,
  course_name,
  description,
  fees,
  thumbnail,
  userId, // pass userId as prop
  courseId, // pass courseId as prop
) {
  const [imgSrc, setImgSrc] = React.useState(
    thumbnail && thumbnail.trim() !== "" ? thumbnail : coursedefualt
  );
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleImageError = () => {
    setImgSrc(coursedefualt);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleEnrollClick = () => {
    debugger;
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePayment = async () => {
    try {
      // 1. Create Razorpay order from Firebase Function
      const response = await fetch(
        "https://us-central1-YOUR_PROJECT.cloudfunctions.net/createOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: fees }),
        }
      );

      const orderData = await response.json();

      // 2. Open Razorpay checkout
      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: orderData.amount,
        currency: "INR",
        name: "Course Purchase",
        description: course_name,
        order_id: orderData.id,
        handler: async function (response) {
          // 3. After successful payment, update Firestore
          const userRef = doc(db, "users", userId);

          await updateDoc(userRef, {
            courses: arrayUnion(courseId), // Add purchased courseId into user's 'courses' array
          });

          alert("Payment Successful! Course Added.");
          setOpenDialog(false);
        },
        prefill: {
          name: "Your Name", // you can fetch from user profile if available
          email: "youremail@example.com",
          contact: "9999999999",
        },
        theme: { color: "#1976d2" }, // blue color theme
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Failed:", error);
      alert("Payment Failed. Please try again.");
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 350,
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
          m: 2,
        }}
      >
        <img
          src={imgSrc}
          alt={course_name}
          style={{ display: "none" }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {!isImageLoaded ? (
          <>
            <Skeleton variant="rectangular" height={180} width={350} />
            <CardContent>
              <Skeleton variant="text" height={35} width="90%" />
              <Skeleton variant="text" height={20} width="100%" />
              <Skeleton variant="text" height={20} width="90%" />
              <Skeleton variant="text" height={30} width="50%" />
            </CardContent>
            <CardActions>
              <Skeleton
                variant="rectangular"
                width={100}
                height={36}
                sx={{ borderRadius: 2, ml: 1 }}
              />
            </CardActions>
          </>
        ) : (
          <>
            <CardMedia
              component="img"
              sx={{
                height: 200,
                width: "100%",
                objectFit: "cover",
              }}
              image={imgSrc}
              alt={course_name}
            />
            <CardContent>
              <div onClick={()=> handleCourseClick(item)}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {course_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, height: 60, overflow: "hidden" }}
                >
                  {description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Fees: ₹{fees}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                sx={{ ml: 1, borderRadius: 2 }}
                color="primary"
                onClick={handleEnrollClick}
              >
                Enroll Now
              </Button>
            </CardActions>
          </>
        )}
      </Card>

      {/* Dialog for Payment */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <Typography>
            You're about to purchase: <strong>{course_name}</strong>
          </Typography>
          <Typography>Fees: ₹{fees}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Proceed to Pay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

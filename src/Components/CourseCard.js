import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { coursedefualt } from "../Assets/Index";
import { Fullscreen } from "@mui/icons-material";

export default function CourseCard({
  course_name,
  description,
  fees,
  thumbnail,
}) {
  const [imgSrc, setImgSrc] = React.useState(
    thumbnail && thumbnail.trim() !== "" ? thumbnail : coursedefualt
  );
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const handleImageError = () => {
    setImgSrc(coursedefualt);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
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
      {/* Actual Image - hidden until loaded */}
      <img
        src={imgSrc}
        alt={course_name}
        style={{ display: "none" }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Show Skeleton While Image is Loading */}
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
              height: 200, // Fixed height
              width: "100%", // 100% width of the container
              objectFit: "cover", // Image will cover the area without being stretched
            }}
            image={imgSrc} // Dynamic image source
            alt={course_name} // Alt text for the image
          />

          <CardContent>
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
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              sx={{ ml: 1, borderRadius: 2 }}
              color="primary"
            >
              Enroll Now
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}

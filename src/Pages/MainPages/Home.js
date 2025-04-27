import React from "react";
import { Card, CardContent, Button, Typography, Grid, Container } from "@mui/material";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to LearnX</h1>
        <p className="text-xl mb-8">Master new skills and get <span className="font-bold">70% cashback</span> after completing the course!</p>
        <Button variant="contained" color="secondary" size="large" className="!bg-white !text-blue-700 !font-bold">
          Browse Courses
        </Button>
      </section>

      {/* Course Content Types */}
      <Container maxWidth="lg" className="py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">What's Inside the Course?</h2>
        <Grid container spacing={6}>
          {[
            { title: "Video Lectures", description: "High-quality recorded sessions to learn at your pace." },
            { title: "PDF Notes", description: "Downloadable notes to support your learning journey." },
            { title: "Live Classes", description: "Interact with experts in live online sessions." },
            { title: "Quizzes & Assignments", description: "Test your knowledge and practice skills." },
            { title: "Certificates", description: "Earn a certificate after completing the course." },
            { title: "Community Support", description: "Join our forums and study groups." },
          ].map((content, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-2xl">
                <CardContent>
                  <Typography variant="h6" component="div" className="text-blue-700 font-bold mb-2 text-center">
                    {content.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="text-center">
                    {content.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Refund Section */}
      <section className="bg-green-100 py-16 text-center">
        <Container maxWidth="md">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Get 70% Refund on Completion!</h2>
          <p className="text-gray-700 mb-6">
            Successfully complete the course and claim back 70% of your enrollment fee. Your success is our reward!
          </p>
          <Button variant="contained" color="success" size="large">
            Enroll Now
          </Button>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">What Our Students Say</h2>
          <Grid container spacing={6}>
            {[
              { name: "Amit Sharma", feedback: "LearnX changed my career! The refund policy motivated me to finish the course on time." },
              { name: "Priya Patel", feedback: "Amazing content and supportive instructors. Highly recommend!" },
              { name: "Rahul Verma", feedback: "Live classes and assignments really helped me learn faster!" },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <Typography variant="body1" className="text-gray-700 mb-4">"{testimonial.feedback}"</Typography>
                  <Typography variant="subtitle1" className="text-blue-700 font-bold text-right">- {testimonial.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-6 mt-12">
        <div className="text-center">
          <p>&copy; 2025 LearnX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

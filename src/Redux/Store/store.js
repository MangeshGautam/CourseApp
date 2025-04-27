// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import  selectCourseReducer  from "../Slice/selectCourseSlice";
export const store = configureStore({
  reducer: {
    selectCourse: selectCourseReducer,
  },
});

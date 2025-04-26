import { createSlice } from "@reduxjs/toolkit";

const selectedCourseSlice = createSlice({
    name: 'selectedCourse',
    initialState: {},
    reducers: {
        selectCourse: (state, action) => {
            // Replace the entire state with the new course object
            return action.payload;
        }
    }
});

export const { selectCourse } = selectedCourseSlice.actions;
export default selectedCourseSlice.reducer;

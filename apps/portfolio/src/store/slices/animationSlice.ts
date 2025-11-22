import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimationState {
  mainTimeline: any | null;
}

const initialState: AnimationState = {
  mainTimeline: null,
};

const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers : {
    setMainTimeline: (state, action: PayloadAction<gsap.core.Timeline | null>) => {
      state.mainTimeline = action.payload;
    }
  }
})

export const { setMainTimeline } = animationSlice.actions;
export default animationSlice.reducer;

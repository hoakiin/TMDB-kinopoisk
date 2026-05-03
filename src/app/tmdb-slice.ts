import {
    createSlice
} from "@reduxjs/toolkit";

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem("themeMode");
  return (saved as ThemeMode) || "dark";
};

export const tmdbSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: getInitialTheme(),
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode;
        localStorage.setItem("themeMode", action.payload.themeMode);
      },
    ),
  }),
});

export const { selectThemeMode } = tmdbSlice.selectors;
export const { changeThemeModeAC } = tmdbSlice.actions;
export const tmdbReducer = tmdbSlice.reducer;

export type ThemeMode = "dark" | "light";

import { atom } from "recoil";

export const movieState = atom({
	key: "movieState",
	default: "",
});

export const modalState = atom({
	key: "modalState",
	default: false,
});

export const scrollState = atom({
	key: "scrollState",
	default: 0,
});

export const localeState = atom({
	key: "localeState",
	default: "ko-KR",
});

export const darkModeState = atom({
	key: "darkModeState",
	default: true,
});

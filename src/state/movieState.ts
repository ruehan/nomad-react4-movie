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

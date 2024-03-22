export interface Theme {
	backgroundColor: string;
	fontColor: string;
	hoverBackgroundColor: string;
	titleColor: string;
}

export const lightTheme: Theme = {
	backgroundColor: "white",
	fontColor: "black",
	hoverBackgroundColor: "#040404",
	titleColor: "purple",
};

export const darkTheme: Theme = {
	backgroundColor: "#040404",
	fontColor: "white",
	hoverBackgroundColor: "white",
	titleColor: "yellow",
};

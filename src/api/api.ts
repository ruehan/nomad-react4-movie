import axios from "axios";

const BASE_URL = "https://movies-api.nomadcoders.workers.dev";

const TMDB_URL = "https://api.themoviedb.org/3/movie";

const AUTH_KEY = import.meta.env.VITE_APP_TMDB_KEY;

// const locale = localStorage.getItem("locale");

export function getPopular() {
	return fetch(`${BASE_URL}/popular`).then((r) => r.json());
}

export function getTMDBPopular(locale: any) {
	const url = `${TMDB_URL}/popular?language=${locale}&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${AUTH_KEY}`,
		},
	};

	return axios.get(url, options).then((response) => response.data);
}

export function getNowPlaying() {
	return fetch(`${BASE_URL}/now-playing`).then((r) => r.json());
}

export function getTMDBNowPlaying(locale: any) {
	const url = `${TMDB_URL}/now_playing?language=${locale}&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${AUTH_KEY}`,
		},
	};

	return axios.get(url, options).then((response) => response.data);
}

export function getComingSoon() {
	return fetch(`${BASE_URL}/coming-soon`).then((r) => r.json());
}

export function getTMDBComingSoon(locale: any) {
	const url = `${TMDB_URL}/upcoming?language=${locale}&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${AUTH_KEY}`,
		},
	};

	return axios.get(url, options).then((response) => response.data);
}

export function getMovie(id: string) {
	return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

export function getTMDBMovie(id: string, locale: any) {
	const url = `${TMDB_URL}/${id}?language=${locale}`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${AUTH_KEY}`,
		},
	};

	return axios.get(url, options).then((response) => response.data);
}

export function makeImagePath(image: string) {
	return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image: string) {
	return `https://image.tmdb.org/t/p/original${image}`;
}

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IMovieDetail extends IMovie {
	belongs_to_collection: BelongsToCollection;
	budget: number;
	homepage: string;
	genres: Genre[];
	imdb_id: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
}

interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

interface Genre {
	id: number;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface IAPIResponse {
	page: number;
	results: IMovie[];
}

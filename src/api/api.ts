import axios from "axios";

const TMDB_URL = "https://api.themoviedb.org/3/movie";

const AUTH_KEY = import.meta.env.VITE_APP_TMDB_KEY;

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

export function getTMDBVideos(id: string, locale: any) {
	const url = `${TMDB_URL}/${id}/videos?language=${locale}`;
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

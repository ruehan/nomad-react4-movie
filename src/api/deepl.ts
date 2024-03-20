import axios from "axios";
import { useRecoilState } from "recoil";
import { translateState, translateTextState } from "../state/movieState";

const translateText = async (text: any) => {
	const [, isTranslate] = useRecoilState(translateState);
	const [, setTranslatedText] = useRecoilState(translateTextState);

	const AUTH_KEY = process.env.REACT_APP_DEEPL_AUTH_KEY;

	const url = `https://api-free.deepl.com/v2/translate?auth_key=${AUTH_KEY}&text=${text}&source_lang=EN&target_lang=KO`;

	axios.get(url).then((response) => {
		setTranslatedText(response.data.translations[0].text);
	});
};

export default translateText;

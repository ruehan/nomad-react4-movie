import axios from "axios";

const translateText = async (text: any) => {
	const AUTH_KEY = "c583fbb3-67c3-4db8-a85c-c4fc3e509134:fx";

	const url = `https://api-free.deepl.com/v2/translate?auth_key=${AUTH_KEY}&text=${text}&source_lang=EN&target_lang=KO`;

	axios
		.get(url)
		.then((response) => console.log(response.data.translations[0].text));
};

export default translateText;

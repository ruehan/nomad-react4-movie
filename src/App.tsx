import { createGlobalStyle } from "styled-components";
import PopularPage from "./pages/MoviePage";
import { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { darkTheme, lightTheme } from "./theme/themes";
import { darkModeState } from "./state/movieState";

const GlobalStyle = createGlobalStyle`
    
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  *[hidden] {
      display: none;
  }

  html{
	width: 100%;
	height: 100vh;

  }

  body {
    line-height: 1;
    background-color: ${(props) => props.theme.backgroundColor};
	  color: white;
    /* justify-content: center; */
      /* display: flex;
  flex-direction: column;
  justify-content: center; */
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
   color: ${(props) => props.theme.fontColor};
  }

  svg {
    color: ${(props) => props.theme.fontColor};
  }
`;

function App() {
	const [isdarkMode] = useRecoilState(darkModeState);
	return (
		<>
			<ThemeProvider theme={isdarkMode ? darkTheme : lightTheme}>
				<GlobalStyle />
				<PopularPage />
			</ThemeProvider>
		</>
	);
}

export default App;

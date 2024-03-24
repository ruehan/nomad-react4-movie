import styled from "styled-components";

const Main = styled.main`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	text-align: center;
	background-color: #313942;
	font-family: "Montserrat", sans-serif;
	width: 100%;
	margin-left: -8px;
	margin-top: -8px;
`;

const H1 = styled.h1`
	color: #e7ebf2;
	font-size: 12.5rem;
	letter-spacing: 0.1em;
	margin: 0.025em 0;
	text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
	white-space: nowrap;
`;

const H2 = styled.h2`
	color: #e7ebf2;
	margin-bottom: 0.4em;
`;

const P = styled.p`
	color: #ccc;
	margin-top: 0;
`;

function NotFound() {
	return (
		<>
			<Main>
				<H1>404</H1>
				<H2>Error: 404 page not found</H2>
				<P>Sorry, the page you're looking for cannot be accessed</P>
			</Main>
		</>
	);
}

export default NotFound;

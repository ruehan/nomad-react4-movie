import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { tabState } from "../../state/tabState";
import { useEffect } from "react";
import { imgState } from "../../state/imgState";

const Tabs = styled.ul`
	width: 100%;
	height: 50px;
	background-color: #040404;
	display: flex;
	justify-content: space-around;
	position: sticky;
	top: 0px;
	padding: 10px;
	z-index: 5;
`;

const Tab = styled.li`
	display: flex;
	position: relative;
	justify-content: center;
	flex-direction: column;
	font-size: 22px;
`;

const Circle = styled(motion.span)`
	position: absolute;
	width: 20px;
	height: 7px;
	background-color: #ec6b5d;
	bottom: -15px;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
`;

const NavBar: React.FC = () => {
	const [, setTab] = useRecoilState(tabState);
	const [, setIsImg] = useRecoilState(imgState);

	const popularMatch = useMatch("/");
	const comingSoonMatch = useMatch("coming-soon");
	const nowPlayingMatch = useMatch("now-playing");
	const myMatch = useMatch("my");

	useEffect(() => {
		try {
			const tab = localStorage.getItem("tab") as string;
			setTab(tab);
		} catch {
			console.log("nothing");
		}
	}, []);

	const onClick = (event: any) => {
		setTab(event.target.innerText);
		setIsImg(false);
		localStorage.setItem("tab", event.target.innerText);
	};

	return (
		<>
			<Tabs>
				<Tab>
					<Link to="/" onClick={onClick}>
						POPULAR
						{popularMatch && <Circle layoutId="circle" />}
					</Link>
				</Tab>
				<Tab>
					<Link to="/coming-soon" onClick={onClick}>
						COMING SOON
						{comingSoonMatch && <Circle layoutId="circle" />}
					</Link>
				</Tab>
				<Tab>
					<Link to="/now-playing" onClick={onClick}>
						NOW PLAYING
						{nowPlayingMatch && <Circle layoutId="circle" />}
					</Link>
				</Tab>
				<Tab>
					<Link to="/my" onClick={onClick}>
						MY
						{myMatch && <Circle layoutId="circle" />}
					</Link>
				</Tab>
			</Tabs>
		</>
	);
};

export default NavBar;

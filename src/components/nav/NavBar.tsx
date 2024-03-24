import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { tabState } from "../../state/tabState";
import { pageState } from "../../state/movieState";
import { useEffect, useState } from "react";
import {
	MdLightMode as LightMode,
	MdDarkMode as DarkMode,
} from "react-icons/md";

import { FaEarthAsia as AsiaIcon } from "react-icons/fa6";
import { darkModeState, localeState } from "../../state/movieState";
import FollowMouse from "../event/FollowMouse";

interface TabProps {
	backgroundColor: string;
}

const Tabs = styled.ul<TabProps>`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-around;
	position: sticky;
	top: 0px;
	padding-top: 30px;
	padding-bottom: 30px;
	z-index: 5;
	background-color: ${(props) => props.backgroundColor};
`;

const Tab = styled.li`
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
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
	const [locale, setLocale] = useRecoilState(localeState);
	const [clickCount, setClickCount] = useState(0);
	const [lastClickTime, setLastClickTime] = useState(new Date().getTime());
	const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);
	const [isFollow, setIsFollow] = useState(false);
	const [, setPage] = useRecoilState(pageState);

	const popularMatch = useMatch("/");
	const comingSoonMatch = useMatch("coming-soon");
	const nowPlayingMatch = useMatch("now-playing");

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
		setPage(1);
		localStorage.setItem("tab", event.target.innerText);
	};

	const TransToEn = () => {
		setLocale("en-US");
		localStorage.setItem("locale", "en-US");
	};

	const TransToKo = () => {
		setLocale("ko-KR");
		localStorage.setItem("locale", "ko-KR");
	};

	const ToggleMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	const easterEgg = () => {
		const currentTime = new Date().getTime();

		if (currentTime - lastClickTime > 500) {
			setClickCount(1);
		} else {
			setClickCount((prev) => prev + 1);
		}
		setLastClickTime(currentTime);
	};

	useEffect(() => {
		const handleEscKey = (event: any) => {
			if (event.key === "Escape" || event.keyCode === 27) {
				setIsFollow(false);
			}
		};

		window.addEventListener("keydown", handleEscKey);

		return () => {
			window.removeEventListener("keydown", handleEscKey);
		};
	}, []);

	useEffect(() => {
		if (clickCount >= 3) {
			console.log("이스터에그 발동..!");
			setIsFollow(true);
			setClickCount(0);
		}
	}, [clickCount, lastClickTime]);

	return (
		<>
			{isFollow && <FollowMouse />}
			<Tabs backgroundColor={isDarkMode ? "black" : "white"}>
				<Tab onClick={easterEgg}>
					<img
						style={{ width: "170px" }}
						src={
							"https://www.logomaker.com/api/main/images/1j+ojVNGOMkX9W2+J1iwiGOujPOCqhFNkAiIiWcqL2VE9AhtkSEtg...Bq...Q=="
						}
					></img>
				</Tab>
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
					<div>
						{locale == "ko-KR" ? (
							<AsiaIcon
								style={{ margin: "10px", fontSize: "25px" }}
								onClick={TransToEn}
							/>
						) : (
							<AsiaIcon
								style={{ margin: "10px", fontSize: "25px" }}
								onClick={TransToKo}
							/>
						)}
						{isDarkMode ? (
							<DarkMode
								style={{ margin: "10px", fontSize: "25px" }}
								onClick={ToggleMode}
							/>
						) : (
							<LightMode
								style={{ margin: "10px", fontSize: "25px" }}
								onClick={ToggleMode}
							/>
						)}
					</div>
				</Tab>
			</Tabs>
		</>
	);
};

export default NavBar;

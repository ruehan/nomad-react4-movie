import { useEffect, useState } from "react";

const FollowMouse = () => {
	const [position, setPosition] = useState({
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
	});

	const moveRandomly = () => {
		setPosition({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
		});
	};

	const clickedImg = () => {
		console.log("잡으셨군요..!");
	};

	useEffect(() => {
		const interval = setInterval(moveRandomly, 600);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			style={{
				position: "absolute",
				top: position.y,
				left: position.x,
				transform: "translate(-50%, -50%)",
				zIndex: 100,
				transition: "top 1s ease, left 1s ease",
			}}
		>
			<img
				style={{ width: "50px", height: "50px", backgroundColor: "inherit" }}
				onMouseOver={clickedImg}
				src="/bug.png"
			></img>
		</div>
	);
};

export default FollowMouse;

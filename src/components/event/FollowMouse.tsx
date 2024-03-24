import { useEffect, useState } from "react";

const FollowMouse = () => {
	const [position, setPosition] = useState({
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
	});

	const [isHovered, setIsHovered] = useState(false);

	const moveRandomly = () => {
		setPosition({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
		});
	};

	const clickedImg = () => {
		setIsHovered(true);
		console.log("잡으셨군요..!");
	};

	useEffect(() => {
		const interval = setInterval(moveRandomly, 600);

		return () => clearInterval(interval);
	}, []);

	return (
		<>
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
			<div
				style={{
					position: "fixed",
					width: "300px",
					height: "70px",
					backgroundColor: "#bfa5d7",
					borderRadius: "15px",
					top: "10%",
					left: "50%",
					transform: "translateX(-50%)",
					zIndex: "10",
					color: "black",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				<p style={{ margin: "5px" }}>ESC 눌러 빠져나가기..</p>
				{isHovered && (
					<p style={{ margin: "5px" }}>잡으셨군요..! 근데 뭐요 보상없어요,,</p>
				)}
			</div>
		</>
	);
};

export default FollowMouse;

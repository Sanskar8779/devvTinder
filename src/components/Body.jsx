import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";

const Body = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((store) => store.user);

	const fetchUserIfLoggedIn = async () => {
		if (userData) return;
		try {
			const res = await axios.get(BASE_URL + "/profile/view", {
				withCredentials: true,
			});
			dispatch(addUser(res.data));
		} catch (err) {
			if (err.status === 401) {
				return navigate("/login");
			}
			console.error(err);
		}
	};

	useEffect(() => {
		fetchUserIfLoggedIn();
	}, []);

	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Body;

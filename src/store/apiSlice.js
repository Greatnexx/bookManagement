import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://backendproject-beta.vercel.app",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		toast.error("Unauthorized");
		window.location.href = "/login";
		sessionStorage.removeItem("userInfo");
		
		sessionStorage.removeItem("expirationTime");
		setTimeout(() => {
			sessionStorage.removeItem("userInfo");
			sessionStorage.removeItem("expirationTime");
		}, 100);
	}

	return result;
};

export const apiSlice = createApi({
	reducerPath: "apiService",
	baseQuery: baseQueryWithReauth,
	tagTypes: [],
	endpoints: (builder) => ({}),
});

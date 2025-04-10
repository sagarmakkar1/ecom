import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTM0MDBjYzY4ZGVjY2ZhZmY2N2I4MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODgxNDgyNiwiZXhwIjoxNjg5MDc0MDI2fQ.T288zp3ZZe0YKdr0bTYiLy1U-qPQqo6Q_Jdj-xXF0AA";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});
export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});

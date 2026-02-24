// import "dotenv/config";

const Android = process.env.ANDROID === "true";
const NextUrl = Android ? "http://10.0.2.2:3000" : "http://localhost:3000";
export default NextUrl;

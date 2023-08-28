import Cookies from "js-cookie";

//?------------------------------------------
// TODO : Get Cookie function
//?------------------------------------------
/**
 * this function will get the cookie token
 * from the browser
 **/
const GetCookie = () => {
  const cookie_token = Cookies.get("AssesToken");
  return cookie_token;
};

export default GetCookie;

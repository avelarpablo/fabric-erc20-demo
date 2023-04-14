export const getUsername = () => {
  let jwt = localStorage.getItem("jwt");
  if (jwt) {
    let base64Url = jwt.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let decodedJwt = JSON.parse(window.atob(base64));
    return decodedJwt.username;
  } else {
    return "";
  }
}


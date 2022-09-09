
const parseJwt = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const checkToken = () => {
    let isExpired = false;
    const lsToken = localStorage.getItem("token") || '';
    if (lsToken !== "undefined") {
        const decodedToken = parseJwt(lsToken);

        if (!decodedToken) return isExpired;
        const date = new Date(0);
        date.setUTCSeconds(decodedToken.exp);
        isExpired = date.valueOf() > new Date().valueOf();

        if (!isExpired) localStorage.removeItem("token");
    }

    return isExpired;
};

export default checkToken

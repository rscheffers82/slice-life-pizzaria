const helpers = {};

helpers.saveToken = (email, token) => {
  email = typeof email === "string" && email.length > 0 ? email : false;
  token = typeof token === "string" && token.length === 22 ? token : false;

  if (!email || !token) {
    return false;
  }

  localStorage.setItem("loginDetails", JSON.stringify({ email, token }));
  return true;
};

helpers.deleteToken = () => {
  localStorage.removeItem("loginDetails");
};

helpers.getToken = email => {
  email = typeof email === "string" && email.length > 0 ? email : false;

  if (!email) {
    return false;
  }

  const jsonString = localStorage.getItem("loginDetails");
  const loginDetails = helpers.jsonStringToObject(jsonString);

  return loginDetails.email && loginDetails.token ? loginDetails : false;
};

helpers.jsonStringToObject = str => {
  if (!str || !str.length > 0) {
    return {};
  }

  try {
    const object = JSON.parse(str);
    return object;
  } catch (e) {
    return {};
  }
};

export default helpers;

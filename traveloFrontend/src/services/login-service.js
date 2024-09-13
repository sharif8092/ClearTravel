import axios from "axios";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const {
      data: { accessToken, username },
    } = await axios.post(
      "https://cleartravel.onrender.com/api/auth/login",
      {
        number: number,
        password: password,
      }
    );
    // console.log("Logged IN");
    console.log("after Login",{  accessToken, username });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
    setAlert({
      open: true,
      message: `Login Successful! ${username} `,
      type: "success",
      isSignup:false
    })
    return { accessToken, username };
  }  catch (err) {
    console.log("Error adding user to database");

    // If there's an error response from the backend, you can also show it in the alert
    const errorMessage = err.response?.data?.message || "There was an error login your account. close window &Please try again.";

    setAlert({
      open: true,
      message: errorMessage,
      type: "error",
      isSignup:false

    });
  }
};
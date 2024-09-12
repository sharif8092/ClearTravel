// import axios from "axios";

// export const signupHandler = async (username, number, email, password, setAlert) => {
//   try {
//     const data = await axios.post(
//       "https://cleartravel.onrender.com/api/auth/register",
//       {
//         username: username,
//         number: number,
//         email: email,
//         password: password,
//       }
//     );
//     console.log("Signed Up");
//     console.log(data);
//     setAlert({
//       open: true,
//       message: `Account Created:: username - ${username}`,
//       type: "success"
//     })
//   } catch (err) {
//     console.log("error adding user to database");
//   }
// };

import axios from "axios";

export const signupHandler = async (username, number, email, password, setAlert) => {
  console.log("what i send to i signup",username, number, email, password, setAlert);
  
  try {
    const response = await axios.post(
      "https://cleartravel.onrender.com/api/auth/register",
      {
        username: username,
        number: number,
        email: email,
        password: password,
      }
    ).then((res)=>{
      console.log("res after signup:", res);
      
    });
    console.log("Signed Up");
    console.log(response);

    // Assuming the backend sends a message or some data in response.data
    const backendMessage = response.data.message || `Account Created Successfully! Username: ${username}`;

    // Set alert with the backend response message
    setAlert({
      open: true,
      message: backendMessage,
      type: "success"
    });
  } catch (err) {
    console.log("Error adding user to database");

    // If there's an error response from the backend, you can also show it in the alert
    const errorMessage = err.response?.data?.message || "There was an error creating your account. Please try again.";

    setAlert({
      open: true,
      message: errorMessage,
      type: "error"
    });
  }
};

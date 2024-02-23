import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode  } from 'jwt-decode';
import swal from 'sweetalert2'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [authTokens, setAuthTokens] = useState(() =>
      localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
    );
    
    const [user, setUser] = useState(() => 
      localStorage.getItem("authTokens")
        ? jwtDecode (localStorage.getItem("authTokens"))
        : null
    );

    const loginUser = async (formData) => {
      const { email, password } = formData;

      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email, password
        })
      });

      const data = await response.json();

      if(response.status === 200){
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
        swal.fire({
          title: "Login successful",
          icon: "success",
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {    
        swal.fire({
          title: "Username or password incorrect.",
          icon: "error",
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      };
    };

    const registerUser = async (formData) => {
      const { email, username, password, password2 } = formData;

      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email, username, password, password2
        })
      });

      if(response.status === 201){
        navigate("/login")
        swal.fire({
          title: "Registration successful",
          icon: "success",
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        })
      } else {
        swal.fire({
          title: "An error has occurred " + response.status,
          icon: "error",
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      };
    };

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/login")
        swal.fire({
            title: "You have been logged out.",
            icon: "success",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens) {
          setUser(jwtDecode(authTokens.access));
        };
        setLoading(false);
    }, [authTokens, loading]);

    return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
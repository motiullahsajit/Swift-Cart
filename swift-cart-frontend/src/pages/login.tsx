import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { userExits, userNotExits } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [login] = useLoginMutation();

  const validateForm = () => {
    if (isNewUser) {
      setIsFormComplete(gender !== "" && date !== "");
    } else {
      setIsFormComplete(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [gender, date, isNewUser]);

  const demoUser = {
    uid: "vlB90O5VTagpjzkWbtkVxWfjRTC3",
    email: "sajit16-663@s.diu.edu.bd",
    displayName: "Motiullah Sajit 222-16-663",
    photoURL:
      "https://lh3.googleusercontent.com/a/ACg8ocI42IhaJoFPYvB1c-Ha6ddeD5gxeE89jSg1q-pga-bNkK5lWG4=s96-c",
  };

  const demoAdmin = {
    uid: "HHFzhOyRGubmsXWQa6pZ6K0cAPJ3",
    email: "motiullahsajt@gmail.com",
    displayName: "Motiullah Sajit",
    photoURL:
      "https://lh3.googleusercontent.com/a/ACg8ocJWLkYL_uL2gfvntnw3su22ygrdgV67WRUhMthDCEt0=s96-c",
  };

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: isNewUser ? gender : "",
        role: "user",
        dob: isNewUser ? date : "",
        _id: user.uid!,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExits(data.user));

        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExits());
      }
    } catch (error) {
      toast.error("Sign In Failed");
      console.log(error);
    }
  };

  const demoUserSignIn = async () => {
    try {
      const res = await login({
        name: demoUser.displayName!,
        email: demoUser.email!,
        photo: demoUser.photoURL!,
        gender: "male",
        role: "user",
        dob: "02/12/2017",
        _id: demoUser.uid!,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(demoUser.uid);
        dispatch(userExits(data.user));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExits());
      }
    } catch (error) {
      toast.error("Sign In Failed");
      console.log(error);
    }
  };

  const demoAdminSignIn = async () => {
    try {
      const res = await login({
        name: demoAdmin.displayName!,
        email: demoAdmin.email!,
        photo: demoAdmin.photoURL!,
        gender: "male",
        role: "admin",
        dob: "02/12/2017",
        _id: demoAdmin.uid!,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(demoAdmin.uid);
        dispatch(userExits(data.user));
        await navigate("/admin/dashboard");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExits());
      }
    } catch (error) {
      toast.error("Sign In Failed");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isNewUser ? "Sign Up" : "Sign In"}
        </h1>

        {isNewUser ? (
          <>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="dob">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : null}

        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {isNewUser ? "Already have an account? " : "New here? "}
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-[#1B5A7D] font-semibold hover:underline transition-colors duration-300"
            >
              {isNewUser ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <button
          onClick={loginHandler}
          disabled={!isFormComplete}
          className={`w-full bg-[#1B5A7D] text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2 ${
            !isFormComplete
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#0a405e]"
          }`}
        >
          <FcGoogle className="text-2xl" />
          <span>
            {isNewUser ? "Sign Up with Google" : "Sign In with Google"}
          </span>
        </button>

        <div className="flex justify-center gap-7 mt-4">
          <button
            onClick={demoUserSignIn}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
          >
            <span className="font-medium">Demo User Sign In</span>
          </button>
          <button
            onClick={demoAdminSignIn}
            className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:from-red-500 hover:to-red-700 transition-colors duration-300"
          >
            <span className="font-medium">Demo Admin Sign In</span>
          </button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          Note: Demo users will be removed on page reload for security purposes.
        </p>
      </div>
    </div>
  );
};

export default Login;

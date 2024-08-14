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

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);
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
      </div>
    </div>
  );
};

export default Login;

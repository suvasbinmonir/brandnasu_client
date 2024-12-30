import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { app } from "./../firebase/firebase.config";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { baseURL } from "../url/baseURL";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // Save user data in db
  const saveUser = async (currentUser) => {
    console.log(currentUser?.displayName, currentUser?.photoURL);
    if (currentUser) {
      const userInfo = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        image: currentUser?.photoURL,
      };
      await axios.post(`${baseURL}/user`, userInfo);
      console.log(userInfo);
    }
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("currentUser-->", currentUser);
      if (currentUser) {
        await saveUser(currentUser);
        // get token and store client
        const userInfo = { email: currentUser.email };
        if (userInfo) {
          await axios.post(`${baseURL}/jwt`, userInfo).then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          });
        }
      } else {
        // Remove token if user is logged out
        setUser(currentUser);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    // also fires when Firebase refreshes the ID token (~hourly), which renews
    // the API session before it expires
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        localStorage.removeItem("access-token");
        setLoading(false);
        return;
      }
      try {
        // the server verifies this Firebase ID token before issuing its own
        const idToken = await currentUser.getIdToken();
        const res = await axiosPublic.post("/jwt", { idToken });
        if (res.data?.token) localStorage.setItem("access-token", res.data.token);
      } catch {
        localStorage.removeItem("access-token");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    auth,
    logOut,
    googleLogIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null)

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // setting token
        try {
          const res = await axios.get(
            `http://localhost:3000/user/${currentUser.email.toLowerCase()}`
          );
          setUserData(res.data);
        } catch (err) {
          console.error(err);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);

      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Axios interceptor
 
  // create user with email and password

  const createUser = (email, password) => {
    setLoading(true); // set loading to true while creating user
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in user with email and password
  const signInUser = (email, password) => {
    setLoading(true); // set loading to true while signing in
    return signInWithEmailAndPassword(auth, email, password);
  };
  // sign out user
  const logOutUser = () => {
    setLoading(true); // set loading to true while signing out
    return signOut(auth);
  };

  // update user
  const updateUserProfile = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // creating user with google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const userInfo = {
    userData,
    user,
    loading,
    createUser,
    signInUser,
    logOutUser,
    updateUserProfile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

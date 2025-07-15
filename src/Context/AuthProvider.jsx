import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../Firebase/Firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // observer
  useEffect(() => {
    const observer = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      observer(); // unsubscribe from the observer when the component unmounts
    };
  }, []);

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
  const signOutUser = () => {
    setLoading(true); // set loading to true while signing out
    return signOutUser(auth);
  };

  // update user
  const updateUserProfile = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    }).finally(() => {
      setLoading(false); // set loading to false after updating user profile
    });
  };

  // creating user with google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

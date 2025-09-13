// contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Signup (admin or user)
  const signup = async (name, email, password, userType = "user") => {
    try {
      setError("");
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Auth displayName
      await updateProfile(user, { displayName: name });

      // Create Firestore doc
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        userType, // admin or user
        profilePicture: "",
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return userCredential;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signin
  const signin = async (email, password) => {
    try {
      setError("");
      setLoading(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      setError("");
      await signOut(auth);
      setUserProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 🔹 Update Profile
  const updateUserProfile = async (updates) => {
    if (!currentUser) return;
    try {
      if (updates.name && updates.name !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: updates.name });
      }
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      await fetchUserProfile(currentUser.uid);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 🔹 Fetch Profile
  const fetchUserProfile = async (uid) => {
    try {
      const snapshot = await getDoc(doc(db, "users", uid));
      if (snapshot.exists()) {
        const profileData = snapshot.data();
        setUserProfile(profileData);
        return profileData;
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
    return null;
  };

  // 🔹 Role helpers
  const isAdmin = () => userProfile?.userType === "admin";
  const isUser = () => userProfile?.userType === "user";

  const getUserAvatar = () =>
    userProfile?.profilePicture || currentUser?.photoURL || null;

  const getUserDisplayName = () =>
    currentUser?.displayName || userProfile?.name || "User";

  // 🔹 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchUserProfile(user.uid);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signup,
    signin,
    logout,
    updateUserProfile,
    isAdmin,
    isUser,
    getUserAvatar,
    getUserDisplayName,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

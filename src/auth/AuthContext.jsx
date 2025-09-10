import { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/*Correo administrador*/
const ADMIN_EMAIL = "cristart.hernandezf@gmail.com";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const suppressAfterRegisterRef = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (suppressAfterRegisterRef.current && fbUser) {
        return;
      }

      setUser(fbUser);
      setLoading(false);

      if (fbUser) {
        const token = await getIdToken(fbUser);
        localStorage.setItem("kodigo_token", token);
        const email = (fbUser.email || "").toLowerCase().trim();
        setIsAdmin(email === ADMIN_EMAIL.toLowerCase().trim());
      } else {
        localStorage.removeItem("kodigo_token");
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  const register = async ({ name, email, password }) => {
    suppressAfterRegisterRef.current = true;
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await setDoc(
      doc(db, "users", cred.user.uid),
      { name, email, createdAt: serverTimestamp() },
      { merge: true }
    );
    await signOut(auth);
    suppressAfterRegisterRef.current = false;
    return true;
  };

  const login = async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(user, true);
    localStorage.setItem("kodigo_token", token);
    return user;
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("kodigo_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuth: !!user, isAdmin, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

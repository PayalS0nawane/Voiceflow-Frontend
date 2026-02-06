import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

 export const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return result.user;
};
// export default login;


import { proxy, useSnapshot } from "valtio";
import { apiAuth } from "../routes/usersApi";
export interface User {
  id: string;
  email: string;
}

const getUser = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }
  return null;
};

const actions = {
  setUser: (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData);
    state.user = userData;
  },
  logoutUser: () => {
    apiAuth
      .get(`/auth/local/logout`, { withCredentials: true })
      .then((res) => {});
    localStorage.removeItem("user");
    state.user = null;
  },
};

const state = proxy({
  user: getUser(),
});

function userStore() {
  const snap = useSnapshot(state);

  return {
    ...snap,
    ...actions,
  };
}

export default userStore;

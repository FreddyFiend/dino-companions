// import React, { createContext, useState } from "react";

// export interface User {
//   id: number;
//   email: string;
// }

// export interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const UserContext = createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
// });

// interface UserProviderProps {
//   children: React.ReactNode;
// }

// export const UserProvider = ({ children }: UserProviderProps) => {
//   //  @ts-ignore
//   let temp = JSON.parse(localStorage.getItem("user")) || null;
//   const [user, setUser] = useState<User | null>(temp);

//   const userContextValue: UserContextType = {
//     user,
//     setUser,
//   };

//   return (
//     <UserContext.Provider value={userContextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// };

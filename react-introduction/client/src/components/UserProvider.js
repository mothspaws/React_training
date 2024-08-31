import { createContext, useState } from "react";

const UserContext = createContext();

const roles = {
  GUEST: 'guest',
  ADMIN: 'admin',
  USER: 'user',
};

const users = [
  {
    id: 0,
    role: roles.USER,
    fullName: 'Bohuslav Růžička',
  },
  {
    id: 1,
    role: roles.ADMIN,
    fullName: 'Václav Schuster'
  }
];

export function UserProvider({ children }) {
  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [user, setUser] = useState(alreadyLogged ?? {
    role: roles.GUEST
  });

  const changeUser = (id) => {
    const selectedUser = users.find(user => user.id === id);
    const result = selectedUser ?? {
      role: roles.GUEST
    };

    setUser(result);
    sessionStorage.setItem('authUser', JSON.stringify(result));
  };

  const value = {
    user,
    users,
    changeUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

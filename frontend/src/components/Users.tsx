import { useQuery } from "@tanstack/react-query";
import * as api from "../routes/usersApi";
import { UserDto } from "../@types/user";
import { useEffect } from "react";
const Users = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  return (
    <div>
      <ul>
        {isLoading && <div>Loading </div>}
        {data?.map((user: UserDto) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Users;

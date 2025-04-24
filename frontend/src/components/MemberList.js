import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const res = await API.get("/");
    setMembers(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`/${id}`);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <h2>All Members</h2>
      <Link to="/add">Add Member</Link>
      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.name} ({m.email}) -
            <Link to={`/edit/${m.id}`}> Edit </Link>
            <button onClick={() => handleDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;

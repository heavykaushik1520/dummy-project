import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

const MemberForm = () => {
  const { id } = useParams();
  const [member, setMember] = useState({
    name: "",
    email: "",
    address: "",
    age: "",
    weight: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/${id}`).then((res) => setMember(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await API.put(`/${id}`, member);
    } else {
      await API.post("/", member);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Member" : "Add Member"}</h2>
      {["name", "email", "address", "age", "weight"].map((field) => (
        <div key={field}>
          <input
            name={field}
            value={member[field]}
            onChange={handleChange}
            placeholder={field}
            required
          />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
};

export default MemberForm;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberList from "./components/MemberList";
import MemberForm from "./components/MemberForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemberList />} />
        <Route path="/add" element={<MemberForm />} />
        <Route path="/edit/:id" element={<MemberForm />} />
      </Routes>
    </Router>
  );
}

export default App;

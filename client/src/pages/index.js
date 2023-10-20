"use client";

import { type } from "os";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != password2) {
      setError("Password doesnt match");
      alert(`error: ${error}`);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status == 200 && res.status != 500) {
        alert("user successfullt created");
      } else {
        alert(`User already exists`);
      }
    } catch (e) {
      console.log(res);
      alert(`error: ${e}`);
    }
  };

  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p>Please fill in the form below</p>
        <form
          onSubmit={handleSubmit}
          className="py-4 mt-4 border-t flex flex-col gap-5"
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="john@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label htmlFor="Confirm password">Confirm Password</label>
            <input
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              id="password"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button
            className="bg-green-700 p-3 text-white font-bold"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "User",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const initial = {
    firstName: "",
    lastName: "",
    email: "",
    type: "User",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  };

  const [errorMessages, setErrorMessages] = useState({});
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format";
      } else {
        const user = localStorage.getItem(formData.email);
        if (user) {
          errors.email = "user already exist";
        }
      }
    }

    if (!formData.type.trim()) {
      errors.type = "Type is required";
    } else {
      const validTypes = ["Admin", "User"];
      if (!validTypes.includes(formData.type)) {
        errors.type = "Invalid type";
      }
    }

    if (!formData.phoneNo.trim()) {
      errors.phoneNo = "Phone No is required";
    } else {
      if (formData.phoneNo.length !== 10) {
        errors.phoneNo = "Invalid phone number";
      }
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      localStorage.setItem(formData.email, JSON.stringify(formData));
      const allUsers = JSON.parse(localStorage.getItem("all-users")) || [];
      console.log(allUsers)
      allUsers.push(formData);
      localStorage.setItem("all-users",JSON.stringify(allUsers));
      setFormData(initial);
      setErrorMessages({});
    } else {
      setErrorMessages(errors);
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errorMessages.firstName && (
            <span className="error">{errorMessages.firstName}</span>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errorMessages.lastName && (
            <span className="error">{errorMessages.lastName}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errorMessages.email && (
            <span className="error">{errorMessages.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          {errorMessages.type && (
            <span className="error">{errorMessages.type}</span>
          )}
        </div>
        <div>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          {errorMessages.phoneNo && (
            <span className="error">{errorMessages.phoneNo}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessages.password && (
            <span className="error">{errorMessages.password}</span>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errorMessages.confirmPassword && (
            <span className="error">{errorMessages.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

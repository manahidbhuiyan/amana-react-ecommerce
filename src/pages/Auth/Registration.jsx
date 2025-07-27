import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState("register");
  const [formData, setFormData] = useState({
    phone: "",
    verificationCode: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsConditions: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just changing steps for UI demonstration
    if (step === "register") setStep("verify");
    else if (step === "verify") setStep("save");
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-center mb-4 uppercase">
          {step === "register"
            ? "Create New Account"
            : step === "verify"
            ? "Verify Phone"
            : "Save Your Info"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === "register" && (
            <>
              <div>
                <label className="block mb-1 font-medium">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Ex. 01761491XXX"
                  required
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="termsConditions"
                  checked={formData.termsConditions}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                  required
                />
                <label className="text-sm">
                  By signing up, you agree to our Terms & Conditions
                </label>
              </div>
            </>
          )}

          {step === "verify" && (
            <div>
              <label className="block mb-1 font-medium">
                Verification Code *
              </label>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Ex. 45XXXX"
                required
              />
            </div>
          )}

          {step === "save" && (
            <>
              <div>
                <label className="block mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {step === "register"
              ? "Register"
              : step === "verify"
              ? "Verify"
              : "Save"}
          </button>

          {step === "register" && (
            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <a href="/signin" className="text-indigo-600 font-medium">
                Sign In
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

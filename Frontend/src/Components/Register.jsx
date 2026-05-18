import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, NavLink } from "react-router";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  // register user
  const onRegister = async (newUser) => {
    setloading(true);
    seterror(null);

    try {
      // create form data
      const formData = new FormData();

      // separate role & image
      let { role, profilePic, ...userObj } = newUser;

      // append text fields
      Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
      });

      // append image
      if (profilePic && profilePic.length > 0) {
        formData.append("profilePic", profilePic[0]);
      }

      let resobj;

      // api call based on role
      if (role === "user") {
        resobj = await axios.post(
          "http://localhost:3000/userapi/user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (role === "author") {
        resobj = await axios.post(
          "http://localhost:3000/authorapi/user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log("response:", resobj);

      if (resobj.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      seterror(err.response?.data?.message || err.message);
    }

    setloading(false);
    reset();
    setPreview(null);
  };

  // cleanup preview url
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>

      <div className="bg-gray-200 p-10 w-[700px] rounded">
        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex flex-col gap-6"
        >
          {/* Role Selection */}
          <div className="flex items-center gap-6 text-lg">
            <span className="font-medium">Select Role</span>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="user"
                {...register("role", {
                  required: "Please select a role",
                })}
              />
              User
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="author"
                {...register("role", {
                  required: "Please select a role",
                })}
              />
              Author
            </label>
          </div>

          {errors.role && (
            <p className="text-red-600 text-sm">
              {errors.role.message}
            </p>
          )}

          {/* First & Last Name */}
          <div className="flex gap-6">
            <div className="w-full">
              <input
                type="text"
                placeholder="First name"
                {...register("firstname", {
                  required: "First name is required",
                })}
                className="bg-gray-300 p-3 w-full rounded"
              />

              {errors.firstname && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Last name"
                {...register("lastname", {
                  required: "Last name is required",
                })}
                className="bg-gray-300 p-3 w-full rounded"
              />

              {errors.lastname && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
              className="bg-gray-300 p-3 rounded w-full"
            />

            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="bg-gray-300 p-3 rounded w-full"
            />

            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profilePic", {
                required: "Profile image is required",
              })}
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  // file type validation
                  if (
                    !["image/jpeg", "image/png"].includes(file.type)
                  ) {
                    seterror("Only JPG or PNG allowed");
                    e.target.value = "";
                    return;
                  }

                  // file size validation
                  if (file.size > 2 * 1024 * 1024) {
                    seterror("File size must be less than 2MB");
                    e.target.value = "";
                    return;
                  }

                  // preview
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                  seterror(null);
                }
              }}
            />

            {errors.profilePic && (
              <p className="text-red-600 text-sm">
                {errors.profilePic.message}
              </p>
            )}

            {/* Image Preview */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 text-black font-medium py-3 px-8 rounded w-40 self-center hover:bg-sky-600 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <div>
            <p className="ml-12">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-purple-600 hover:text-purple-950"
              >
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

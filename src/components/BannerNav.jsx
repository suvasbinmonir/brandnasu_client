import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Alert from "./Alert";

const BannerNav = () => {
  const { user, logOut, loading, signInWithGoogle } = useAuth();
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result?.user) {
        setAlert({ message: "Sign In Successful!", type: "success" });
      }
    } catch (err) {
      setAlert({ message: err?.message, type: "error" });
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setAlert({ message: "Sign Out Successful!", type: "success" });
    } catch (err) {
      setAlert({ message: err?.message, type: "error" });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto flex justify-between items-center md:py-8 py-4 lg:px-24 md:px-12 px-6">
      {/* Display the custom alert */}
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
      <h3 className="lg:w-40 md:w-32 w-24">
        <img src="/Logo.png" alt="BrandNasu Logo" className="w-full h-full" />
      </h3>
      <div className="flex justify-center items-center md:gap-6 gap-4">
        <a
          href="mailto:hello@brandnasu.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-darkIndigo lg:text-[26px] md:text-2xl text-base lg:poppins-bold md:poppins-semibold poppins-light md:px-4 lg:py-2.5 md:p-2 py-1 px-2 md:tracking-wide"
        >
          hello@brandnasu.com
        </a>
        {!user && !loading ? (
          <div>
            <button
              onClick={handleGoogleSignIn}
              className="border-2 border-darkIndigo lg:px-6 lg:py-2.5 md:px-5 md:py-2 px-2 py-1 text-lightIndigo md:text-xl text-sm md:poppins-bold poppins-light hover:bg-darkIndigo"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="relative">
            <div
              onClick={() => setIsDropDownOpen(!isDropdownOpen)}
              className="rounded-full cursor-pointer hover:shadow-md transition"
            >
              <div>
                <img
                  className="rounded-full md:size-12 size-10"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL}
                  title={user?.displayName}
                  alt="profile"
                  height="30"
                  width="30"
                />
              </div>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white rounded-md shadow-lg z-20">
                <div className="block px-4 py-2 text-darkIndigo poppins-regular hover:bg-gray-200">
                  {user?.displayName}
                </div>
                <div
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-darkIndigo poppins-regular hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerNav;

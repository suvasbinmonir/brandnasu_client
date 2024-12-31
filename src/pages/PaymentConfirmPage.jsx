import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BannerNav from "../components/BannerNav";
import { BiUpload } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import useAxiosCommon from "../hooks/useAxiosCommon";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosCommon = useAxiosCommon();
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const { transactionId, userName, linkedInUrl } = location.state || {};

  useEffect(() => {
    if (!transactionId) {
      navigate("/");
    }
  }, [transactionId, navigate]);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/15055757863", "_blank");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a six-digit random number prefixed with BN
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `BN${randomNumber}`;

    // Get the current date in DD/MM/YYYY format
    const currentDate = new Date();
    const orderDate = `${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}/${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${currentDate.getFullYear()}`;

    if (!profilePic) {
      setAlert({
        message: "Please select a file before submitting.",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", profilePic);

    // Optional: Add other fields if required by the server
    // formData.append("title", e.target.title.value);

    try {
      const result = await axiosCommon.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = result.data?.file?.url;
      if (!imageUrl) {
        throw new Error("File upload failed. No URL returned.");
      }

      setPreviewUrl(imageUrl);

      const emailParams = {
        to_name: "Suvas",
        from_name: userName,
        orderNumber,
        orderDate,
        title: e.target.title.value,
        colorScheme: e.target.colorScheme.value,
        additionalInfo: e.target.additionalInfo.value,
        imageUrl,
        linkedInUrl,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setAlert({
        message: "Thank you. I will get back to you as soon as possible.",
        type: "success",
      });
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setAlert({
        message: error.response?.data?.message || "Error submitting the form.",
        type: "error",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-darkIndigo to-indigo text-lightIndigo w-full">
      {/* Display Alert */}
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}

      <div className="w-full">
        <BannerNav />
      </div>
      <div className="max-w-screen-2xl flex flex-col items-center w-full mx-auto md:py-8 py-4 lg:px-24 md:px-12 px-6">
        <div className="text-center w-full max-w-3xl p-6">
          <h1 className="lg:text-2xl md:text-xl text-lg lg:mb-10 md:mb-8 mb-6 poppins-medium">
            ✅ Your order has been placed successfully.
          </h1>
          <h2 className="lg:text-4xl md:text-3xl text-2xl  poppins-regular md:poppins-medium mb-8">
            Fill Out the Requirement
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-left">
              <span className="text-base poppins-light mb-3">
                Preferred Name/Title for the Banner:
              </span>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full px-4 py-1.5 text-lightIndigo text-lg placeholder:text-lightIndigo/50 placeholder:text-base
                border focus:outline-none border-lightIndigo/50 bg-transparent sm:text-sm"
                placeholder="Enter the title"
              />
            </label>
            <label className="block text-left">
              <span className="text-base poppins-light mb-3">
                What’s Your Preferred Color Scheme:
              </span>
              <input
                type="text"
                name="colorScheme"
                required
                className="mt-1 block w-full px-4 py-1.5 text-lightIndigo text-lg placeholder:text-lightIndigo/50 placeholder:text-base
                border focus:outline-none border-lightIndigo/50 bg-transparent sm:text-sm"
                placeholder="Enter your color scheme"
              />
            </label>
            <div className="text-left flex flex-col">
              <span className="text-base poppins-light mb-2">
                Upload Your Logo and Branding Assets (Optional):
              </span>
              <div className="relative inline-block w-fit">
                <label
                  htmlFor="file-upload"
                  className="px-6 py-2 text-sm font-medium bg-lightIndigo text-darkIndigo rounded-md flex items-center gap-1 cursor-pointer hover:bg-blue-100"
                >
                  <BiUpload className="text-xl font-semibold" /> Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 w-fit cursor-pointer"
                />
              </div>
            </div>
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="h-32 w-64 object-cover border border-lightIndigo"
                />
              </div>
            )}
            <label className="block text-left">
              <span className="text-base poppins-light mb-3">
                Additional Information You might need important (Optional):
              </span>
              <textarea
                name="additionalInfo"
                placeholder="Enter additional information"
                rows="4"
                className="mt-1 block w-full px-4 py-1.5 text-lightIndigo text-lg placeholder:text-lightIndigo/50 placeholder:text-base
                border focus:outline-none border-lightIndigo/50 bg-transparent sm:text-sm"
              />
            </label>
            <button
              type="submit"
              className="w-full text-lg bg-lightIndigo transition-colors duration-150 hover:bg-lightIndigo/90 text-darkIndigo poppins-semibold py-2.5 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="xl:px-24 lg:px-4 px-0 w-full">
          <div className="w-full text-center mt-8 p-8 bg-lightIndigo text-darkIndigo">
            <p className="xl:text-4xl lg:text-3xl md:text-2xl text-xl poppins-medium mb-4">
              Have a question? Feel free to reach out
            </p>
            <p className="poppins-regular lg:text-lg text-base">
              Email:{" "}
              <a
                href="mailto:hello@brandnasu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-darkIndigo hover:underline poppins-light"
              >
                hello@brandnasu.com
              </a>
            </p>
            <p className="poppins-regular lg:text-lg text-base">
              WhatsApp:{" "}
              <button
                onClick={handleWhatsAppClick}
                className="text-darkIndigo hover:underline poppins-light"
              >
                wa.me/15055757863
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentConfirmPage;

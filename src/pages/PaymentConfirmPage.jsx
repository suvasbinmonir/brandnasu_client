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
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleFileAdd = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 5) {
      setAlert({
        message: "You can upload a maximum of 5 files.",
        type: "error",
      });
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setAlert({ message: "", type: "" });
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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

    if (files.length === 0) {
      setAlert({
        message: "Please select a file before submitting.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const result = await axiosCommon.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(result);

      const uploadedFiles = result.data?.files || [];
      const imageUrls = uploadedFiles.map((file) => file.url);
      console.log(imageUrls, "Image URLs");

      if (imageUrls.length === 0) {
        throw new Error("File upload failed. No URL returned.");
      }

      // Convert imageUrls array to a comma-separated string
      const imageUrlsString = imageUrls.join(", "); // Join the URLs into a single string

      const emailParams = {
        to_name: "Suvas",
        from_name: userName,
        orderNumber,
        orderDate,
        title: e.target.title.value,
        colorScheme: e.target.colorScheme.value,
        additionalInfo: e.target.additionalInfo.value,
        imageUrls: imageUrlsString, // Pass the imageUrls as a string, not an array
        linkedInUrl,
      };

      console.log(emailParams);

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
      navigate("/");

      // Reset the form fields
      e.target.reset();
      setFiles([]);
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setAlert({
        message: error.response?.data?.message || "Error submitting the form.",
        type: "error",
      });
    } finally {
      setLoading(false);
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
          <h2 className="lg:text-4xl md:text-3xl text-2xl poppins-regular md:poppins-medium mb-8">
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
                  htmlFor="multiFileInput"
                  className={`px-6 py-2 text-sm font-medium bg-lightIndigo text-darkIndigo rounded-md flex items-center gap-1 cursor-pointer hover:bg-blue-100 ${
                    files.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <BiUpload className="text-xl font-semibold" /> Choose File
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileAdd}
                  id="multiFileInput"
                  disabled={loading || files.length >= 5}
                  className={`absolute inset-0 opacity-0 w-fit cursor-pointer ${
                    files.length === 5 ? "hidden" : ""
                  }`}
                />
              </div>
            </div>
            {files.length > 0 && (
              <div className="mb-4">
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
                    >
                      <span className="text-gray-700 truncate">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
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
              {loading ? "Submitting..." : "Submit"}
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

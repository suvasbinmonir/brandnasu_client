import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import visa from "../../public/visaCard.jpeg";
import masterCard from "../../public/masterCard.jpeg";
import americanExpress from "../../public/americanExpress.jpeg";
import unionPay from "../../public/unionPay.jpeg";
import { countries } from "countries-list";
import paymentMethod from "../../public/Artboard 6.jpg";
import useAxiosCommon from "../hooks/useAxiosCommon";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PLFAnRqH2dqFgib53eSh9RsKIJCjC8TacyHlWEaPTjK4iGArVU5rSUitSkYUrXl27jszPY9VWKt29KX2c4rhLOl006HTvhnfz"
);

const CheckoutForm = () => {
  const [totalPrice, setTotalPrice] = useState(50);
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardBrand, setCardBrand] = useState("");
  const [brandError, setBrandError] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedInUrl: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedCountry,
      card: cardBrand,
      price: totalPrice,
    }));
  }, [selectedCountry, cardBrand, totalPrice]);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxiosCommon();
  const linkedInUrlRegex =
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[A-Za-z0-9_-]+(\/)?$/;

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsExpressDelivery(checked);
    if (checked) {
      setTotalPrice(totalPrice + 20);
    } else {
      setTotalPrice(totalPrice - 20);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate LinkedIn URL
    if (name === "linkedInUrl") {
      if (!linkedInUrlRegex.test(value)) {
        setError("Please enter a valid LinkedIn profile URL.");
      } else {
        setError(""); // Clear error if valid
      }
    }
  };

  // Get all countries from the countries-list package
  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  const handleCardChange = (event) => {
    setBrandError(false); // Reset brand error when user types
    setError(""); // Reset general error

    if (event.brand) {
      if (["visa", "mastercard", "amex", "unionpay"].includes(event.brand)) {
        setCardBrand(event.brand);
      } else {
        setCardBrand(""); // Reset card brand
        setBrandError(true); // Show brand error
      }
    }
  };

  const getCardImage = (brand) => {
    switch (brand) {
      case "visa":
        return visa;
      case "mastercard":
        return masterCard;
      case "amex":
        return americanExpress;
      case "unionpay":
        return unionPay;
      default:
        return null;
    }
  };

  const handleFocus = () => {
    setCardBrand(""); // Reset to default when focusing
    setBrandError(false); // Reset brand error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      // Using axiosCommon to make the API request
      const { data } = await axiosInstance.post("/create-payment-intent", {
        price: formData?.price / 100,
      });

      const { clientSecret } = data;

      const cardElement = elements.getElement(CardNumberElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
            },
          },
        }
      );

      if (error) {
        setAlert({ message: error.message, type: "error" });
      } else if (paymentIntent.status === "succeeded") {
        setAlert({ message: "Payment Successful!", type: "success" });
        navigate("/payment-confirm", {
          state: {
            transactionId: paymentIntent.id,
            userName: `${formData.firstName}`,
            linkedInUrl: `${formData.linkedInUrl}`,
          },
        });
      }

      const payment = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        linkedInUrl: formData?.linkedInUrl,
        card: formData?.card,
        amount: formData?.price,
        country: formData?.country,
        transactionId: paymentIntent.id,
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      await axiosInstance.post("/payments", payment);
    } catch (err) {
      setAlert({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display the custom alert */}
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
      <div>
        <div className="text-darkIndigo mt-5">
          <h4 className="lg:text-lg text-base poppins-light mb-3">
            Contact Info
          </h4>
          {/* First Name and Last Name */}
          <div className="flex flex-col sm:flex-row sm:gap-6 gap-3 mb-3">
            <div className="flex-1">
              <input
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                name="firstName"
                className="block w-full px-4 py-1.5 text-darkIndigo text-lg placeholder:text-darkIndigo/50 placeholder:text-base
                border-2 focus:outline-none border-darkIndigo/20 bg-transparent sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                name="lastName"
                className="block w-full px-4 py-1.5 text-darkIndigo text-lg placeholder:text-darkIndigo/50 placeholder:text-base
                border-2 focus:outline-none border-darkIndigo/20 bg-transparent sm:text-sm"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              className="block w-full px-4 py-1.5 text-darkIndigo text-lg placeholder:text-darkIndigo/50 placeholder:text-base
              border-2 focus:outline-none border-darkIndigo/20 bg-transparent sm:text-sm"
              placeholder="Email"
            />
          </div>

          {/* LinkedIn Profile URL */}
          <div className="mb-4">
            <input
              type="url"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleInputChange}
              placeholder="LinkedIn Profile URL"
              className="block w-full px-4 py-1.5 text-darkIndigo text-lg placeholder:text-darkIndigo/50 placeholder:text-base
              border-2 focus:outline-none border-darkIndigo/20 bg-transparent sm:text-sm"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>

        <h4 className="lg:text-lg text-base poppins-light mb-3">
          Payment Method
        </h4>

        {/* Card Number */}
        <div className="mb-3">
          <label className="block text-sm poppins-light mb-1">
            Card Number
          </label>
          <div className="relative flex items-center">
            {/* Default Card Images */}
            {cardBrand === "" && !brandError && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                <img src={visa} alt="Visa" className="lg:w-8 w-6 rounded" />
                <img
                  src={masterCard}
                  alt="MasterCard"
                  className="lg:w-8 w-6 rounded"
                />
                <img
                  src={americanExpress}
                  alt="American Express"
                  className="lg:w-8 w-6 rounded"
                />
                <img
                  src={unionPay}
                  alt="UnionPay"
                  className="lg:w-8 w-6 rounded"
                />
              </div>
            )}

            {/* Dynamic Card Image */}
            {cardBrand !== "" && !brandError && (
              <img
                src={getCardImage(cardBrand)}
                alt={cardBrand}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-8 w-auto py-1 rounded-md"
              />
            )}

            {/* Fallback with Error */}
            {brandError && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-end gap-1">
                <div className="flex gap-2 py-2">
                  <img src={visa} alt="Visa" className="h-8 w-auto" />
                  <img
                    src={masterCard}
                    alt="MasterCard"
                    className="h-8 w-auto"
                  />
                  <img
                    src={americanExpress}
                    alt="American Express"
                    className="h-8 w-auto"
                  />
                  <img src={unionPay} alt="UnionPay" className="h-8 w-auto" />
                </div>
              </div>
            )}

            <CardNumberElement
              onChange={handleCardChange}
              onFocus={handleFocus}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#2E1C6A80",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
              }}
              className={`block w-full px-4 py-1.5 border-2 focus:outline-none placeholder:text-darkIndigo/50 bg-transparent ${
                brandError
                  ? "border-red-500 text-red-500"
                  : "text-darkIndigo border-darkIndigo/20"
              }`}
            />
          </div>

          {/* Error Message Below the Input */}
          {brandError && (
            <p className="text-red-500 text-xs mt-2">Card type not supported</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-6 gap-3 mb-3">
          {/* Expiry Date */}
          <div className="w-full">
            <label className="block text-sm poppins-light mb-1">
              Expiry Date
            </label>
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#2E1C6A80",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              className="block w-full px-4 py-1.5 text-darkIndigo border-2 focus:outline-none placeholder:text-darkIndigo/50 border-darkIndigo/20 bg-transparent"
            />
          </div>

          {/* CVC */}
          <div className="w-full">
            <label className="block text-sm poppins-light mb-1">
              Security Code (CVC)
            </label>
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#2E1C6A80",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              className="block w-full px-4 py-1.5 text-darkIndigo border-2 focus:outline-none placeholder:text-darkIndigo/50 border-darkIndigo/20 bg-transparent"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="text-sm poppins-light mb-5">
            Country
          </label>
          <select
            name="country"
            className="block w-full px-4 py-1.5 text-darkIndigo text-lg placeholder:text-darkIndigo/50 placeholder:text-base border-2 focus:outline-none border-darkIndigo/20 bg-transparent sm:text-sm"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countryList.map(({ code, name }) => (
              <option key={code} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-darkIndigo my-5">
          <h4 className="lg:text-lg text-base poppins-light mb-3">
            Order Summary
          </h4>
          <div>
            <div className="flex justify-between items-center md:text-lg bg-[#DFD9FF] text-darkIndigo px-4 py-1.5 rounded-md">
              <p>LinkedIn Banner Design</p>
              <p className="poppins-medium md:text-xl text-lg">$50</p>
            </div>
          </div>
          {/* Add checkbox for express delivery */}
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="expressDelivery"
              className="mr-3 w-4 h-4 cursor-pointer"
              checked={isExpressDelivery}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="expressDelivery"
              className="md:text-base md:poppins-medium text-sm poppins-regular mt-0.5"
            >
              24 HOURS EXPRESS DELIVERY +$20
            </label>
          </div>
          {/* Total section */}
          <div className="flex justify-between items-center md:text-lg bg-[#DFD9FF] text-darkIndigo mt-5 px-4 py-1.5 rounded-md">
            <p>Total</p>
            <p className="poppins-medium md:text-xl text-lg flex items-center gap-2">
              <span className="bg-blue-500 px-2 text-sm poppins-semibold rounded text-lightIndigo">
                USD
              </span>
              ${`${totalPrice}`}
            </p>
          </div>
        </div>

        {error && <div className="text-red-500 mb-3">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`bg-darkIndigo/90 hover:bg-darkIndigo transition-colors duration-150 text-lightIndigo md:text-4xl text-xl poppins-semibold md:p-3 p-2 tracking-wide w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Order Now"}
        </button>

        <div>
          <img src={paymentMethod} alt="Payment Method" />
        </div>
      </div>
    </form>
  );
};

const PaymentSection = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="px-6">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default PaymentSection;

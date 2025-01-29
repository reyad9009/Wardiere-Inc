import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const CheckoutForm = ({ user, salary, monthFieldId, yearFieldId }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (salary && parseFloat(salary) > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: parseFloat(salary) })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [axiosSecure, salary]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    const month = document.getElementById(monthFieldId).value;
    const year = document.getElementById(yearFieldId).value;

    if (!month || !year) {
      setError("Please provide Month and Year.");
      return;
    }

    // Check if payment for the same month and year already exists
    try {
      const checkPaymentResponse = await axiosSecure.get(
        `/check-payment?userId=${user._id}&month=${month}&year=${year}`
      );

      if (checkPaymentResponse.data.exists) {
        setError(`Payment for ${month} ${year} already exists.`);
        return;
      }
    } catch (error) {
      console.error("Error checking payment:", error);
      setError("An error occurred while checking payment history.");
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError("Payment confirmation failed.");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // Save payment details
      const payment = {
        userId: user._id,
        email: user.email,
        name: user.name,
        designation: user.designation,
        photo: user.photo,
        salary,
        month,
        year,
        transactionId: paymentIntent.id,
        date: "",
        status: "pending",
      };

      const res = await axiosSecure.post("/payments", payment);
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Payment for ${month} ${year} is successful!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;

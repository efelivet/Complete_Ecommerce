 import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {API} from './api'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");
  const status = searchParams.get("status");
  
  useEffect(() => {
    if (status !== "successful") {
      return;
    }

    const verifyPayment = async () => {
      try {
        await API.post("/payments/flutterwave/verify", {
          tx_ref,
          transaction_id,
        },
        { withCredentials: true });

      
        navigate("/");
      } catch (err) {
        console.error("Verification failed", err);
      }
    };

    verifyPayment();
  }, [tx_ref, transaction_id, status, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Processing Payment...</h2>
      <p>Please wait while we verify your payment.</p>
    </div>
  );
};

export default PaymentSuccess;

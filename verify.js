import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Verify() {
  const router = useRouter();
  const { phoneNumber } = router.query;
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    if (phoneNumber) {
      // Simulate an API call to verify OTP
      axios.post('/api/verify-otp', { phoneNumber, otp: '123456' }) // Assuming a static OTP for demonstration
        .then(response => {
          setVerified(response.data.success);
        })
        .catch(() => {
          setVerified(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [phoneNumber]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>OTP Verification</h1>
      {loading ? (
        <div>
          <p>Verifying OTP...</p>
          <div className="spinner"></div>
        </div>
      ) : verified ? (
        <p>Phone number verified successfully!</p>
      ) : (
        <p>Failed to verify phone number.</p>
      )}
      <style jsx>{`
        .spinner {
          margin: 20px auto;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

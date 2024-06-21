import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Phone Number Verification</h1>
      {loading ? (
        <div>
          <p>Sending OTP...</p>
          <div className="spinner"></div>
        </div>
      ) : (
        <p>OTP sent! Check your messages.</p>
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

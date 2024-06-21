export default async function handler(req, res) {
  const { phoneNumber, otp } = req.body;

  // Hypothetical API call to verify OTP
  try {
    const response = await fetch('https://api.sms-service.com/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer your_sms_api_key`,
      },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    const data = await response.json();

    if (response.ok && data.verified) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
}

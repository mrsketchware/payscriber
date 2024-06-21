
export default async function handler(req, res) {
  const { phoneNumber } = req.body;

  // Hypothetical API call to send OTP
  try {
    const response = await fetch('https://api.sms-service.com/sendOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer your_sms_api_key`,
      },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, message: data.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
}

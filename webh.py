import requests
import time

# Configuration for the SMS API service
SMS_API_URL = "https://api.sms-service.com/getMessages"  # Hypothetical API endpoint
SMS_API_KEY = "AEDYH34KOFFD23_3ES11"

# Configuration for phone number verification
PHONE_NUMBER = "5715803090"
OTP_SENDER_ID = "APPLE"
OTP_VALIDATION_URL = "https://example.com/verifyOtp"  # Hypothetical OTP verification endpoint
VERIFY_TIMEOUT = 300  # Time to wait for OTP in seconds

def get_latest_otp(phone_number):
    """
    Fetch the latest OTP sent to the given phone number.
    This function assumes the SMS API returns a JSON response with a list of messages.
    """
    response = requests.get(SMS_API_URL, headers={"Authorization": f"Bearer {SMS_API_KEY}"})
    if response.status_code == 200:
        messages = response.json().get("messages", [])
        for message in messages:
            if message["sender"] == OTP_SENDER_ID and phone_number in message["recipient"]:
                return message["body"]
    return None

def extract_otp_from_message(message):
    """
    Extract the OTP from the message body.
    Assumes OTP is a 6-digit number in the message.
    """
    import re
    match = re.search(r"\b\d{6}\b", message)
    return match.group(0) if match else None

def verify_otp(otp):
    """
    Verify the OTP by sending it to the verification endpoint.
    """
    response = requests.post(OTP_VALIDATION_URL, json={"phone_number": PHONE_NUMBER, "otp": otp})
    return response.status_code == 200 and response.json().get("status") == "success"

def main():
    start_time = time.time()
    otp = None

    while time.time() - start_time < VERIFY_TIMEOUT:
        message = get_latest_otp(PHONE_NUMBER)
        if message:
            otp = extract_otp_from_message(message)
            if otp:
                print(f"OTP received: {otp}")
                break
        time.sleep(10)  # Wait 10 seconds before checking again

    if otp:
        if verify_otp(otp):
            print("Phone number verified successfully!")
        else:
            print("Failed to verify the phone number.")
    else:
        print("Failed to receive OTP within the timeout period.")

if __name__ == "__main__":
    main()

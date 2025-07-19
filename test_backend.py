import requests
import json

def test_chat_endpoint():
    """Test the chat endpoint with a simple message"""
    url = "http://localhost:5001/chat"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "message": "Hello! Can you tell me a short joke?"
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"Response Text: {response.text}")
        
        if response.status_code == 200:
            try:
                json_response = response.json()
                print(f"JSON Response: {json_response}")
                return True
            except json.JSONDecodeError:
                print("Response is not valid JSON")
                return False
        else:
            try:
                error_response = response.json()
                print(f"Error Response: {error_response}")
            except json.JSONDecodeError:
                print("Error response is not valid JSON")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running. Please start it with: python app.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing ChatGPT wrapper backend...")
    success = test_chat_endpoint()
    if success:
        print("✅ Backend is working correctly!")
    else:
        print("❌ Backend test failed!") 
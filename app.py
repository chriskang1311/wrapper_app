from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'])

# Check if API key is set
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("⚠️  Warning: OPENAI_API_KEY not found in environment variables")
    print("   Please create a .env file with your OpenAI API key:")
    print("   OPENAI_API_KEY=your_api_key_here")
else:
    print("✅ OpenAI API key found")

client = openai.OpenAI(api_key=api_key)

@app.route("/")
def home():
    return "✅ Flask backend is running"

@app.route("/chat", methods=["POST"])
def chat():
    if not api_key:
        return jsonify({"error": "OpenAI API key not configured"}), 500
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    user_prompt = data.get("message", "")
    if not user_prompt:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_prompt}
            ]
        )
        return jsonify({"response": response.choices[0].message.content})
    except openai.AuthenticationError:
        return jsonify({"error": "Invalid OpenAI API key"}), 401
    except openai.RateLimitError:
        return jsonify({"error": "Rate limit exceeded"}), 429
    except openai.APIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route("/generate-title", methods=["POST"])
def generate_title():
    if not api_key:
        return jsonify({"error": "OpenAI API key not configured"}), 500
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    conversation = data.get("conversation", [])
    if not conversation:
        return jsonify({"error": "No conversation provided"}), 400

    try:
        # Create a summary of the conversation for title generation
        conversation_text = ""
        for message in conversation:
            role = "User" if message["role"] == "user" else "Assistant"
            content = message["content"][:200]  # Limit content length
            conversation_text += f"{role}: {content}\n"
        
        title_prompt = f"""Based on this conversation, generate a concise, descriptive title (3-6 words) that captures the main topic or theme. The title should be professional and clear.

Conversation:
{conversation_text}

Title:"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates concise, descriptive titles for conversations. Return only the title, nothing else."},
                {"role": "user", "content": title_prompt}
            ],
            max_tokens=20,
            temperature=0.7
        )
        
        title = response.choices[0].message.content
        if title:
            title = title.strip()
            # Clean up the title (remove quotes, extra spaces, etc.)
            title = title.replace('"', '').replace("'", "").strip()
        else:
            title = "New Chat"
        
        return jsonify({"title": title})
    except openai.AuthenticationError:
        return jsonify({"error": "Invalid OpenAI API key"}), 401
    except openai.RateLimitError:
        return jsonify({"error": "Rate limit exceeded"}), 429
    except openai.APIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5001)






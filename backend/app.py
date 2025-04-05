from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS
import google.generativeai as genai
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize Gemini API
GEMINI_API_KEY = "AIzaSyA4vy87oZ8T4fuonLrSdQ9PFnq5SBpXaLk"  # Replace with your actual API key
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
#genai.configure(api_key=GEMINI_API_KEY)

@app.route('/gemini', methods=['POST'])
def gemini_info():
    try:
        data = request.json
        n, p, k, ndvi, rainfall = data['n'], data['p'], data['k'], data['ndvi'], data['rainfall']

        # Construct the Gemini prompt
        prompt = f"""
        Given the following soil parameters:
        - Nitrogen (N): {n} kg/ha
        - Phosphorus (P): {p} kg/ha
        - Potassium (K): {k} kg/ha
        - NDVI: {ndvi}
        - Annual Rainfall: {rainfall} mm

        Provide:
        1. A brief explanation of each parameter. 
        2. Crop recommendations based on the given values.
        3. Suitable fertilizers for soil improvement.
        """

        # Prepare the payload
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }

        # Make API request to Google Gemini
        response = requests.post(
            GEMINI_API_URL,
            headers={"Content-Type": "application/json"},
            params={"key": GEMINI_API_KEY},
            json=payload
        )

        # Handle response
        if response.status_code == 200:
            gemini_response = response.json()
            reply_text = gemini_response["candidates"][0]["content"]["parts"][0]["text"]

            return jsonify({"gemini_response": reply_text})
        else:
            print("Error in Gemini API:", response.text)
            return jsonify({"error": "Failed to fetch Gemini response"}), 500

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500


# Load datasets (update paths accordingly)
state_data = pd.read_csv(r"C:\TE_ProjectwithBack\soil-sage-harvest\public\data\FertilityData_CombinedsetwithSUBDIVISION.csv")  # State-level data
district_data = pd.read_csv(r"C:\TE_ProjectwithBack\soil-sage-harvest\public\data\DisFertilityModelData.csv")  # District-level data

@app.route('/get_fertility_data', methods=['GET'])
def get_fertility_data():
    state = request.args.get('state', None)
    district = request.args.get('district', None)

    if state:
        filtered_data = state_data[state_data["State"] == state]

        # Debugging print statement
        print("Filtered Data Columns:", filtered_data.columns.tolist())

        # Check if the 'YEAR' column exists before renaming
        if 'YEAR' in filtered_data.columns:
            filtered_data = filtered_data.rename(columns={"YEAR": "Year"})

        # Ensure the required columns exist
        required_columns = {'Year', 'Fertility_Class', 'N', 'P', 'K', 'ANNUALRAIN', 'Mean_NDVI'}
        missing_columns = required_columns - set(filtered_data.columns)

        if missing_columns:
            return jsonify({"error": f"Missing columns: {missing_columns}"}), 500

        response_data = filtered_data[['Year', 'Fertility_Class', 'N', 'P', 'K', 'ANNUALRAIN', 'Mean_NDVI']].to_dict(orient='records')

    elif district:
        filtered_data = district_data[district_data["Dist Name"] == district]

        if 'YEAR' in filtered_data.columns:
            filtered_data = filtered_data.rename(columns={"YEAR": "Year"})

        response_data = filtered_data[['Year', 'Fertility_Class', 'N', 'P', 'K', 'ANNUALRAIN', 'Mean_NDVI']].to_dict(orient='records')

    else:
        return jsonify({"error": "Please provide either state or district"}), 400

    return jsonify(response_data)


# Load the trained pipeline model
model_path = "C:/TE_ProjectwithBack/soil-sage-harvest/public/models/district_fertility_model_xgboost.pkl"
model = joblib.load(model_path)

# Define class labels
fertility_classes = {0: "High", 1: "Medium", 2: "Low"}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)

        # Convert JSON to DataFrame
        input_df = pd.DataFrame([[data['n'], data['p'], data['k'], data['ndvi'], data['rainfall']]],
                                columns=['N', 'P', 'K', 'Mean_NDVI', 'ANNUALRAIN'])

        print("Input data with feature names:\n", input_df)

        # Make prediction
        result = model.predict(input_df)[0]  # Get single value from array
        print("Prediction result (numeric):", result)

        # Convert NumPy int to Python int
        result = int(result)

        # Map numeric result to class label
        class_label = fertility_classes.get(result, "Unknown")
        print("Prediction result (class label):", class_label)

        # Return response
        return jsonify({'prediction': class_label})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
























#import pandas as pd
# import numpy as np
# from flask import Flask, request, jsonify
# import joblib
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load the trained pipeline model
# model_path = "C:/TE_ProjectwithBack/soil-sage-harvest/public/models/district_fertility_model_xgboost.pkl"
# model = joblib.load(model_path)

# # Define the correct feature names
# FEATURE_COLUMNS = ["N", "P", "K", "Mean_NDVI", "ANNUALRAIN"]

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         if model is None:
#             return jsonify({"error": "Model failed to load"}), 500

#         data = request.get_json()
#         print("Received data:", data)

#         # Convert input data to a DataFrame with correct feature names
#         input_data = pd.DataFrame([[  
#             data["n"], data["p"], data["k"], data["ndvi"], data["rainfall"]  
#         ]], columns=FEATURE_COLUMNS)

#         print("Input data with feature names:\n", input_data)  # Debugging

#         # Make prediction
#         prediction = model.predict(input_data)[0]
#         fertility_classes = {0: "High", 1: "Medium", 2: "Low"}
#         predicted_class = fertility_classes.get(prediction, "Unknown")

#         return jsonify({"prediction": predicted_class})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)

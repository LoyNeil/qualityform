from flask import Flask, request, jsonify
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import os
import json
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load Google Sheets API credentials from .env
credentials_json = json.loads(os.getenv("API_KEY"))
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

# Authenticate with Google Sheets
creds = Credentials.from_service_account_info(credentials_json, scopes=SCOPES)
service = build("sheets", "v4", credentials=creds)

SPREADSHEET_ID = "1LnCLCTqocHRZXP3pdxTtIK_1ROY5TtEojLt_QvkoYDk"  # Your Google Sheet ID
SHEET_NAME = "Sheet1"  # Update with actual sheet name

@app.route("/submit", methods=["POST"])
def submit():
    try:
        data = request.json
        form_data = data.get("formData", {})
        score_1 = data.get("score")
        score = float(score_1) if score_1 is not None else 0
        field_parameters = data.get("fieldParameters", [])

        print("✅ Received request data:")
        print("Form Data:", form_data)
        print("Score:", score)
        print("Field Parameters:", field_parameters)

        # Validate required fields
        if not form_data:
            return jsonify({"message": "Missing formData"}), 400
        
        if not isinstance(score, (int, float)) or score < 0:
            return jsonify({"message": "Invalid score"}), 400
        
        if not isinstance(field_parameters, list):
            return jsonify({"message": "Invalid fieldParameters"}), 400

        # Initialize flattened parameters list
        flattened_field_parameters = []

        # Process each parameter set
        for param in field_parameters:
            params_dict = param.get("params", {})
            issues_dict = param.get("issues", {})
            remarks_dict = param.get("remarks", {})

            # Get all parameter keys (param1, param2, ..., param14)
            param_keys = sorted(params_dict.keys())  # Sort to maintain consistent order

            # Process each parameter
            for param_key in param_keys:
                response = params_dict.get(param_key, "N/A")
                issues = issues_dict.get(param_key, [])
                remarks = remarks_dict.get(param_key, "N/A")

                # Format issues
                issues_str = ", ".join(issues) if issues else "No Issues"

                # Add parameters in order: response, issues, remarks
                flattened_field_parameters.extend([
                    response,
                    issues_str,
                    remarks
                ])

        # Fill remaining columns if needed (assuming max 20 parameters)
        max_params = 20 * 3  # 20 parameters, 3 fields each
        while len(flattened_field_parameters) < max_params:
            flattened_field_parameters.append("")

        # Get the next empty row
        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"{SHEET_NAME}!A:A"  # Check column A to find next empty row
        ).execute()
        
        next_row = len(result.get('values', [])) + 1  # If no values, start at row 1

        # Prepare data for Google Sheets
        values = [[
            form_data.get("agentName", ""),
            form_data.get("teamLeader", ""),
            form_data.get("callDuration", ""),
            form_data.get("callDate", ""),
            form_data.get("lob", ""),
            score,
            *flattened_field_parameters
        ]]

        print("📌 Data being sent to Google Sheets:", values)

        # Update data in Google Sheets at specific row
        body = {"values": values}
        service.spreadsheets().values().update(
            spreadsheetId=SPREADSHEET_ID,
            range=f"{SHEET_NAME}!A{next_row}",  # Specify exact starting cell
            valueInputOption="USER_ENTERED",
            body=body
        ).execute()

        return jsonify({"message": "Audit data saved successfully!"})

    except Exception as e:
        print("❌ Error saving audit data:", e)
        return jsonify({"error": "Failed to save audit data"}), 500

if __name__ == "__main__":
    app.run(port=3000, debug=True)
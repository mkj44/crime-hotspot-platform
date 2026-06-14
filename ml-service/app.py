from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Crime Predictor ML API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
try:
    model = joblib.load("crime_model.pkl")
except:
    model = None
    print("Warning: Model not found. Please run 'python train.py' first.")

class PredictionRequest(BaseModel):
    hour: int
    day: int
    location_risk: int # 1 (Low) to 3 (High)
    weather: int # 0 (Clear) or 1 (Rain)

crime_map = {0: "Theft", 1: "Assault", 2: "Vandalism", 3: "Safe"}

@app.post("/predict")
def predict_crime(req: PredictionRequest):
    if model is None:
        return {"error": "Model not loaded. Please run train.py first to generate crime_model.pkl"}
    
    input_data = pd.DataFrame([[req.hour, req.day, req.location_risk, req.weather]], 
                              columns=['hour', 'day', 'location_risk', 'weather'])
    
    pred = model.predict(input_data)[0]
    prob = model.predict_proba(input_data)[0]
    
    return {
        "expected_crime": crime_map[pred],
        "probability_distribution": {
            crime_map[i]: round(prob[i], 2) for i in range(len(prob))
        },
        "highest_probability": round(max(prob), 2)
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}

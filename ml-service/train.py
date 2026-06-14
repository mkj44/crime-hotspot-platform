import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib

# Create a mock dataset for Crime Prediction
# Features: Hour of day, Day of week, Location Risk (1-3), Weather (0=Clear, 1=Rain)
# Target: Crime Type (0=Theft, 1=Assault, 2=Vandalism, 3=Safe)

np.random.seed(42)
n_samples = 1000

hours = np.random.randint(0, 24, n_samples)
days = np.random.randint(0, 7, n_samples)
locations = np.random.randint(1, 4, n_samples)
weather = np.random.randint(0, 2, n_samples)

# Simple deterministic logic to make predictions realistic for mock data
crimes = []
for i in range(n_samples):
    risk_score = (hours[i] >= 20 or hours[i] <= 4) * 2 + (locations[i] == 3) * 2 + weather[i]
    if risk_score >= 4:
        crimes.append(1) # Assault
    elif risk_score >= 2:
        crimes.append(0) # Theft
    elif risk_score >= 1:
        crimes.append(2) # Vandalism
    else:
        crimes.append(3) # Safe

df = pd.DataFrame({
    'hour': hours,
    'day': days,
    'location_risk': locations,
    'weather': weather,
    'crime_type': crimes
})

X = df[['hour', 'day', 'location_risk', 'weather']]
y = df['crime_type']

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

# Save the model
joblib.dump(clf, 'crime_model.pkl')
print("Model trained successfully and saved to 'crime_model.pkl'")

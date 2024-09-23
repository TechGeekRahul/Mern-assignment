import pandas as pd

# Read CSV
data = pd.read_csv('data.csv')

# Drop rows with missing values
cleaned_data = data.dropna()

# Output cleaned data
cleaned_data.to_csv('cleaned_data.csv', index=False)

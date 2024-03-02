# 1: 'GOAL 1: No Poverty',
# 2: 'GOAL 2: Zero Hunger',
# 3: 'GOAL 3: Good Health and Well-being',
# 4: 'GOAL 4: Quality Education',
# 5: 'GOAL 5: Gender Equality',
# 6: 'GOAL 6: Clean Water and Sanitation',
# 7: 'GOAL 7: Affordable and Clean Energy',
# 8: 'GOAL 8: Decent Work and Economic Growth',
# 9: 'GOAL 9: Industry, Innovation and Infrastructure',
# 10: 'GOAL 10: Reduced Inequality',
# 11: 'GOAL 11: Sustainable Cities and Communities',
# 12: 'GOAL 12: Responsible Consumption and Production',
# 13: 'GOAL 13: Climate Action',
# 14: 'GOAL 14: Life Below Water',
# 15: 'GOAL 15: Life on Land',
# 16: 'GOAL 16: Peace and Justice Strong Institutions',
# 17: 'GOAL 17: Partnerships to achieve the Goal'

import joblib

class TextClassifier:
    def __init__(self):
        # Load the pre-trained model
        self.model = joblib.load('./webscraping/model.joblib')
        self.vectorizer = joblib.load('./webscraping/vectorizer.joblib')
        self.selector = joblib.load('./webscraping/selector.joblib')

    def predict(self, input_text):
        # Vectorize the input text
        input_vectorized = self.vectorizer.transform([input_text])

        # Select features
        input_selected = self.selector.transform(input_vectorized)

        # Make predictions
        predictions = self.model.predict(input_selected)

        return predictions[0] if len(predictions) > 0 else None

classifier = TextClassifier()

input_text = "Saving the climate one tree at a time with digital seeds"
result = classifier.predict(input_text)
# print(f"The predicted class is: {result}")
# print(type(result))

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt

data = pd.DataFrame({
    'color_mean':[0.8,0.3,0.9,0.2,0.85,0.1,0.7,0.25],
    'texture_var':[0.1,0.4,0.05,0.5,0.12,0.6,0.09,0.45],
    'label':['Healthy','Diseased','Healthy','Diseased','Healthy','Diseased','Healthy','Diseased']
})

X = data[['color_mean','texture_var']]
y = data['label']
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.3,random_state=42)

svm = SVC(kernel='rbf', gamma='auto')
svm.fit(X_train, y_train)

y_pred = svm.predict(X_test)
print(classification_report(y_test, y_pred))
print("Accuracy:", accuracy_score(y_test, y_pred))

sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, cmap='Greens')
plt.title("SVM - Healthy vs Diseased Plants")
plt.show()

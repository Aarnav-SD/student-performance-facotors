from config import db
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pandas as pd


df = pd.read_csv('C:\\Users\\aarna\\Full-stack-stuff\\amoghus\\backend\\StudentPerformanceFactors.csv')
df = df.drop(['School_Type', 'Parental_Education_Level', 'Gender'], axis='columns')

column_list = df.columns.tolist()

ndf = df
ndf = ndf.drop(['Hours_Studied',
 'Attendance',
 'Sleep_Hours',
 'Previous_Scores',
 'Tutoring_Sessions',
 'Physical_Activity',
 'Exam_Score',
 ], axis='columns')

columns = ndf.columns.tolist()

for i in columns:
    ohe_df = pd.get_dummies(df[f"{i}"], prefix=f"{i}").astype(int)
    df = pd.concat([df, ohe_df], axis='columns')
    df = df.drop(i, axis='columns')

X = df.drop(['Exam_Score'], axis='columns')

model = LinearRegression()

model.fit(X, df.Exam_Score)

'''
X_train, X_test, y_train, y_test = train_test_split(X, df.Exam_Score, test_size = 0.2)

print(model.score(X_test, y_test))
'''


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hours_studied = db.Column(db.Integer, unique=False, nullable=False)
    attendance = db.Column(db.Integer, unique=False, nullable=False)
    parental_involvement = db.Column(db.String(6), unique=False, nullable=False)
    access_to_resources = db.Column(db.String(6), unique=False, nullable=False)
    extracurricular_activities = db.Column(db.String(3), unique=False, nullable=False)
    sleep_hours = db.Column(db.Integer, unique=False, nullable=False)
    previous_scores = db.Column(db.Integer, unique=False, nullable=False)
    motivation_level = db.Column(db.String(6), unique=False, nullable=False)
    internet_access = db.Column(db.String(3), unique=False, nullable=False)
    tutoring_sessions = db.Column(db.Integer, unique=False, nullable=False)
    family_income = db.Column(db.String(6), unique=False, nullable=False)
    peer_influence = db.Column(db.String(8), unique=False, nullable=False)
    physical_activity = db.Column(db.Integer, unique=False, nullable=False)
    learning_disabilities = db.Column(db.String(3), unique=False, nullable=False)
    teacher_quality = db.Column(db.String(6), unique=False, nullable=False)
    distance_from_home = db.Column(db.String(8), unique=False, nullable=False)
    

    def to_json(self):
        return {
            "id" : self.id,
            "hoursStudied" : self.hours_studied,
            "attendance" : self.attendance,
            "parentalInvolvement" : self.parental_involvement,
            "accessToResources" : self.access_to_resources,
            "extracurricularActivities" : self.extracurricular_activities,
            "sleepHours" : self.sleep_hours,
            "previousScores" : self.previous_scores,
            "motivationLevel" : self.motivation_level,
            "internetAccess" : self.internet_access,
            "tutoringSessions" : self.tutoring_sessions,
            "familyIncome" : self.family_income,
            "teacherQuality" : self.teacher_quality,
            "peerInfluence" : self.peer_influence,
            "physicalActivity" : self.physical_activity,
            "learningDisabilities" : self.learning_disabilities,
            "distanceFromHome": self.distance_from_home
        }
    
    
    def to_dict(self):
        return {
            "id": self.id,
            "hoursStudied": self.hours_studied,
            "attendance": self.attendance,
            "parentalInvolvement": self.parental_involvement,
            "accessToResources": self.access_to_resources,
            "extracurricularActivities": self.extracurricular_activities,
            "sleepHours": self.sleep_hours,
            "previousScores": self.previous_scores,
            "motivationLevel": self.motivation_level,
            "internetAccess": self.internet_access,
            "tutoringSessions": self.tutoring_sessions,
            "familyIncome": self.family_income,
            "teacherQuality": self.teacher_quality,
            "peerInfluence": self.peer_influence,
            "physicalActivity": self.physical_activity,
            "learningDisabilities": self.learning_disabilities,
            "distanceFromHome": self.distance_from_home
        }
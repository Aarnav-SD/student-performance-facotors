from flask import request, jsonify
from config import app, db
from models import Students, model
import numpy as np


@app.route('/view_record/<int:id>', methods=['GET'])
def view_student_record(id):
    student = Students.query.get(id)
    if not student:
        return jsonify({'message': 'Student record not found.'}), 404
    
    return jsonify({'student': student.to_dict()}), 200


@app.route('/', methods=['GET', 'POST'])
def action():
    if request.method == 'POST':
      
        data = request.json  
        if data is None:  
            return jsonify({'error': 'Invalid JSON payload'}), 400
        
        action = data.get('action')

        if action == 'Create':
            return jsonify({'message': 'Create'}), 200
        elif action == 'View':
            return jsonify({'message': 'View'}), 200
        else:
            return jsonify({'message': 'Error: Unsupported action'}), 400  

    return jsonify({'message': 'Welcome to the Welcome page!'}), 200


@app.route('/view', methods=['GET'])
def your_data():
    students = Students.query.all()
    if not students:
        return jsonify({'message': 'Student record not found.'}), 404
    
    student_data = [student.to_dict() for student in students]  
    return jsonify({'students': student_data}), 200


@app.route('/create', methods=['POST'])
def register():
    hours_studied = request.json.get('hoursStudied')
    attendance = request.json.get('attendance')
    parental_involvement = request.json.get('parentalInvolvement')
    access_to_resources = request.json.get('accessToResources')
    extracurricular_activities = request.json.get('extracurricularActivities')
    sleep_hours = request.json.get('sleepHours')
    previous_scores = request.json.get('previousScores')
    motivation_level = request.json.get('motivationLevel')
    internet_access = request.json.get('internetAccess')
    tutoring_sessions = request.json.get('tutoringSessions')
    family_income = request.json.get('familyIncome')
    teacher_quality = request.json.get('teacherQuality')
    peer_influence = request.json.get('peerInfluence')
    physical_activity = request.json.get('physicalActivity')
    learning_disabilities = request.json.get('learningDisabilities')
    distance_from_home = request.json.get('distanceFromHome')

    factors = [hours_studied, attendance, parental_involvement, access_to_resources, extracurricular_activities, sleep_hours, previous_scores, motivation_level, internet_access, tutoring_sessions, family_income, teacher_quality, peer_influence, physical_activity, learning_disabilities, distance_from_home]

    if any(not factor for factor in factors):
        return (
            jsonify({'message' : 'All fields mandatory'}), 400,
        )
    
    new_student = Students(
        hours_studied = hours_studied,
        attendance = attendance,
        parental_involvement = parental_involvement,
        access_to_resources = access_to_resources,
        extracurricular_activities = extracurricular_activities,
        sleep_hours = sleep_hours,
        previous_scores = previous_scores,
        motivation_level = motivation_level,
        internet_access = internet_access,
        tutoring_sessions = tutoring_sessions,
        family_income = family_income,
        teacher_quality = teacher_quality,
        peer_influence = peer_influence,
        physical_activity = physical_activity,
        learning_disabilities = learning_disabilities,
        distance_from_home = distance_from_home
    )
    try:
        db.session.add(new_student)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    
    return jsonify({'message' : 'Student record added successfully!'})


@app.route('/update_student_record/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    student = Students.query.get(student_id)

    if not student:
        return jsonify({'message' : 'Student record not found.'}), 404
    
    data = request.json

    student.hours_studied = data.get('hoursStudied', student.hours_studied)
    student.attendance = data.get('attendance', student.attendance)
    student.parental_involvement = data.get('parentalInvolvement', student.parental_involvement)
    student.access_to_resources = data.get('accessToResources', student.access_to_resources)
    student.extracurricular_activities = data.get('extracurricularActivities', student.extracurricular_activities)
    student.sleep_hours = data.get('sleepHours', student.sleep_hours)
    student.previous_scores = data.get('previousScores', student.previous_scores)
    student.motivation_level = data.get('motivationLevel', student.motivation_level)
    student.internet_access = data.get('internetAccess', student.internet_access)
    student.tutoring_sessions = data.get('tutoringSessions', student.tutoring_sessions)
    student.family_income = data.get('familyIncome', student.family_income)
    student.teacher_quality = data.get('teacherQuality', student.teacher_quality)
    student.peer_influence = data.get('peerInfluence', student.peer_influence)
    student.physical_activity = data.get('physicalActivity', student.physical_activity)
    student.learning_disabilities = data.get('learningDisabilities', student.learning_disabilities)
    student.distance_from_home = data.get('distanceFromHome', student.distance_from_home)

    db.session.commit()

    return jsonify({'message' : 'Record updated.'}), 200


@app.route('/delete_record/<int:student_id>', methods=['DELETE'])
def delete_record(student_id):
    student = Students.query.get(student_id)

    if not student:
        return jsonify({'message' : 'Student record not found.'}), 404

    db.session.delete(student)
    db.session.commit()

    return jsonify({'message' : 'Record deleted.'}), 200


@app.route('/predict/<int:student_id>', methods=['GET'])
def prediction(student_id):
    student = Students.query.get(student_id)
    
    if not student:
        return jsonify({'message' : 'Student record not found.'}), 404
    

    parental_involvement_high = parental_involvement_mid = parental_involvement_low = 0
    access_to_resources_high = access_to_resources_mid = access_to_resources_low = 0
    motivation_level_high = motivation_level_mid = motivation_level_low = 0
    family_income_high = family_income_mid = family_income_low = 0
    teacher_quality_high = teacher_quality_mid = teacher_quality_low = 0
    extracurricular_yes = extracurricular_no = 0
    internet_access_yes = internet_access_no = 0
    learning_disabilities_yes = learning_disabilities_no = 0
    peer_influence_good = peer_influence_bad = peer_influence_neutral = 0
    distance_from_home_far = distance_from_home_mid = distance_from_home_near = 0

    if student.parental_involvement == 'High':
        parental_involvement_high = 1
    elif student.parental_involvement == 'Medium':
        parental_involvement_mid = 1
    else:
        parental_involvement_low = 1
    if student.access_to_resources == 'High':
        access_to_resources_high = 1
    elif student.access_to_resources == 'Medium':
        access_to_resources_mid = 1
    else:
        access_to_resources_low = 1
    if student.motivation_level == 'High':
        motivation_level_high = 1
    elif student.motivation_level == 'Medium':
        motivation_level_mid = 1
    else:
        motivation_level_low = 1
    if student.family_income == 'High':
        family_income_high = 1
    elif student.family_income == 'Medium':
        family_income_mid = 1
    else:
        family_income_low = 1
    if student.teacher_quality == 'High':
        teacher_quality_high = 1
    elif student.teacher_quality == 'Medium':
        teacher_quality_mid = 1
    else:
        teacher_quality_low = 1
    if student.extracurricular_activities == 'Yes':
        extracurricular_yes = 1
    else:
        extracurricular_no = 1
    if student.internet_access == 'Yes':
        internet_access_yes = 1
    else:
        internet_access_no = 1
    if student.learning_disabilities == 'Yes':
        learning_disabilities_yes = 1
    else:
        learning_disabilities_no = 1
    if student.peer_influence == 'Positive':
        peer_influence_good = 1
    elif student.peer_influence == 'Negative':
        peer_influence_bad = 1
    else:
        peer_influence_neutral = 1
    if student.distance_from_home == 'Far':
        distance_from_home_far = 1
    elif student.distance_from_home == 'Moderate':
        distance_from_home_mid = 1
    else:
        distance_from_home_near = 1


    var_list = np.array([
        student.hours_studied, 
        student.attendance, 
        student.sleep_hours, 
        student.previous_scores, 
        student.tutoring_sessions, 
        student.physical_activity, 
        parental_involvement_high, 
        parental_involvement_low, 
        parental_involvement_mid, 
        access_to_resources_high, 
        access_to_resources_low, 
        access_to_resources_mid, 
        extracurricular_no, 
        extracurricular_yes, 
        motivation_level_high, 
        motivation_level_low, 
        motivation_level_mid, 
        internet_access_no, 
        internet_access_yes, 
        family_income_high, 
        family_income_low, 
        family_income_mid, 
        teacher_quality_high, 
        teacher_quality_low, 
        teacher_quality_mid, 
        peer_influence_bad, 
        peer_influence_neutral, 
        peer_influence_good, 
        learning_disabilities_no, 
        learning_disabilities_yes, 
        distance_from_home_far, 
        distance_from_home_mid, 
        distance_from_home_near])
    

    var_list = var_list.reshape(1, -1)
    
    predicted_value = model.predict(var_list).tolist()
    
    return jsonify({'prediction' : predicted_value})


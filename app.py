from flask import Flask, request
from flask_cors import CORS
from datetime import datetime, timezone
import psycopg2
import os
import sys

CREATE_STUDENTS_TABLE = (
  "CREATE TABLE IF NOT EXISTS students (id SERIAL PRIMARY KEY, student_name TEXT UNIQUE, date_of_birth DATE, email TEXT);"
)
INSERT_STUDENT_RETURN_ID = """INSERT INTO students (student_name, date_of_birth, email) 
SELECT %s, %s, %s
WHERE NOT EXISTS (
  SELECT 1 FROM students
  WHERE student_name = %s
) RETURNING id;"""
GET_STUDENTS = """SELECT * FROM students"""
DELETE_STUDENT = "DELETE FROM students WHERE student_name = %s;"

CREATE_COURSES_TABLE = (
  "CREATE TABLE IF NOT EXISTS courses (id SERIAL PRIMARY KEY, course_name TEXT UNIQUE);"
)
INSERT_COURSE_RETURN_ID = """INSERT INTO courses (course_name) 
SELECT %s
WHERE NOT EXISTS (
  SELECT 1 FROM courses
  WHERE course_name = %s
) RETURNING id;"""
GET_COURSES = """SELECT * FROM courses"""
DELETE_COURSE = "DELETE FROM courses WHERE course_name = %s;"

CREATE_RESULTS_TABLE = (
  """CREATE TABLE IF NOT EXISTS results (id SERIAL PRIMARY KEY, course_name TEXT, student_name TEXT, score TEXT,
      FOREIGN KEY(course_name) REFERENCES courses(course_name) ON DELETE CASCADE, FOREIGN KEY(student_name) REFERENCES students(student_name) ON DELETE CASCADE);"""
)
INSERT_RESULT_RETURN_ID = """INSERT INTO results (course_name, student_name, score)
SELECT %s, %s, %s
WHERE NOT EXISTS (
  SELECT 1 FROM results
  WHERE course_name = %s AND student_name = %s
);"""
GET_RESULTS = """SELECT * FROM results"""

DELETE_EVERYTHING = """ DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public; """


url = os.environ.get("DATABASE_URL")
connection = psycopg2.connect(url)
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.delete("/api/everything")
def delete_everything():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(DELETE_EVERYTHING, ())
    return {"message": "All data deleted."}, 201

# {"first_name": "John", "family_name": "Smith", "date_of_birth": "2000-02-04", "email": "js@gmail.com"}
@app.post("/api/student")
def create_student():
    data = request.get_json()
    print(data, file=sys.stderr)
    first_name = data["first_name"]
    family_name = data["family_name"]
    student_name = first_name + " " + family_name
    date_of_birth = data["date_of_birth"]
    email = data["email"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_STUDENTS_TABLE)
            cursor.execute(INSERT_STUDENT_RETURN_ID, (student_name, date_of_birth, email, student_name))
            connection.commit()
            if cursor.rowcount > 0:
                cursor.execute("SELECT LASTVAL()")
                student_id = cursor.fetchone()[0]
                return {"id": student_id, "message": f"Student {student_name} successfully created."}, 201
            else:
                return {"message": f"Error: Student: {student_name}, already exists."}, 409

@app.get("/api/student")
def get_student_all():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_STUDENTS)
            return cursor.fetchall()

# {"student_name": "John Smith"}
@app.delete("/api/student")
def delete_student():
    data = request.get_json()
    student_name = data["student_name"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(DELETE_STUDENT, (student_name, ))
    return {"message": f"Student {student_name} deleted."}, 201


# {"name": "Math"}
@app.post("/api/course")
def create_course():
    data = request.get_json()
    course_name = data["course_name"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_COURSES_TABLE)
            cursor.execute(INSERT_COURSE_RETURN_ID, (course_name, course_name))
            connection.commit()
            if cursor.rowcount > 0:
                cursor.execute("SELECT LASTVAL()")
                course_id = cursor.fetchone()[0]
                return {"id": course_id, "message": f"Course: {course_name} successfully created."}, 201
            else:
                return {"message": f"Error: Course: {course_name} already exists."}, 409
            cursor.execute(INSERT_COURSE_RETURN_ID, (course_name, ))
            course_id = cursor.fetchone()[0]
    return {"id": course_id, "message": f"Course {course_name} created."}, 201

@app.get("/api/course")
def get_course_all():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_COURSES)
            return cursor.fetchall()

# {"course_name": "Math"}
@app.delete("/api/course")
def delete_course():
    data = request.get_json()
    course_name = data["course_name"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(DELETE_COURSE, (course_name, ))
    return {"message": f"Course {course_name} deleted."}, 201


# {"course_name": "Math", "student_name": "John Smith", "score": "A"}
@app.post("/api/result")
def create_result():
    # print("Test", file=sys.stderr)
    data = request.get_json()
    course_name = data["course_name"]
    student_name = data["student_name"]
    score = data["score"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_RESULTS_TABLE)
            cursor.execute(INSERT_RESULT_RETURN_ID, (course_name, student_name, score, course_name, student_name))
            connection.commit()
            if cursor.rowcount > 0:
                cursor.execute("SELECT LASTVAL()")
                result_id = cursor.fetchone()[0]
                return {"id": result_id, "message": f"Result for Course: {course_name}, Student: {student_name}, Score: {score}, successfully created."}, 201
            else:
                return {"message": f"Error: Result for Course: {course_name}, Student: {student_name}, already exists."}, 409

@app.get("/api/result")
def get_result_all():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_RESULTS)
            return cursor.fetchall()

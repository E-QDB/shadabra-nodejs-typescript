## Idea
#####

>*Build APIs for managing courses, classes, students, teachers, sessions of a programming training center*

- Models
   - Course (id, name, description, tech, image)
   - Class (id, name, description, courseId, fee)
   - Teacher (id, name, bio, phone, email, avatar, isAdmin) => sms auth
   - Session (id, name, classId, teacherId, startTime, endTime, date)
   - Student (id, name, phone, email, notes)
   - Fee (classId, studentId, classFee, discount, paidAmount)

#####
- Tasks
   - Datist
      - [ ] CRUD Course
      - [ ] CRUD Student
      - [ ] CRUD Session (maybe later)
   - Shawn
      - [X] Setup Project
      - [ ] CRUD Teacher
      - [ ] CRUD Class
      - [ ] CRUD Fee
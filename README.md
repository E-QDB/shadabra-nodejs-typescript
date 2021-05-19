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
      - [X] CRUD Course
      - [ ] CRUD Student (by 23rd May 2021)
      - [ ] CRUD Session (maybe later)
   - Shawn
      - [X] Setup Project
      - [X] CRUD Teacher
      - [ ] CRUD Class (by 23rd May 2021)
      - [ ] CRUD Fee

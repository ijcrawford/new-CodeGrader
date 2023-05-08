import http from "./httpService";
import { getJwt } from "./authServices";

//const apiEndPointIntake = "https://educationalplaybook.herokuapp.com/intake";



// Get Course By CourseId
export function getCourseByCourseId(courseId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/get-course/${courseId}`);
}
// Get Courses by StudentId
export function getCoursesByStudentId(studentId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/student/${studentId}`);
}

// Get Courses by ProfessorId
export function getCoursesByProfessorId(professorId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/professor/${professorId}`);
}


// Submit Course
export function submitCourse(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/submit-course`, data);
}

// Edit Course by CourseId
export function editCourseByCourseId(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/edit-course`, data);
}

// Delete Course by CourseId
export function deleteCourseByCourseId(courseId) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointIntake}/${courseId}`);
}

// Get Course Data by CourseId
export function getCourseDataByCourseId(courseId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/${courseId}/view-course`);
}

// Add Students by CourseId
export function addStudentsByCourseId(courseId, body) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/add-students/${courseId}`, body);
}
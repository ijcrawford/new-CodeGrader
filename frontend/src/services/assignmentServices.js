import http from "./httpService";
import { getJwt } from "./authServices";

//const apiEndPointIntake = "https://educationalplaybook.herokuapp.com/intake";

// Get Assignments By CourseId
export function getAssignmentsByCourseId() {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/course/${courseId}`);
}

// Get Assignment By AssignmentId
export function getAssignmentByAssignmentId(assignmentId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/get-course/${assignmentId}`);
}

// Submit Assignment
export function submitAssignment(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/submit-assignment`, data);
}

// Edit Assignment by AssignmentId
export function editAssignmentByAssignmentId(data) {
    http.setJwt(getJwt());
    return http.put(`${apiEndPointIntake}/edit-assignment`, data);
}

// Delete Assignment by AssignmentId
export function deleteAssignmentByAssignmentId(assignmentId) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointIntake}/${assignmentId}`);
}

// Get Assignment Data by AssignmentId
export function getAssignmentDataByAssignmentId(assignmentId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointIntake}/${assignmentId}/view-assignment`);
}

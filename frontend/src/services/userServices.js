import http from "./httpService";
import { getJwt } from "./authServices";

const apiEndPointUser = "http://localhost:4001/users";
//const apiEndPointUser = `https://educationalplaybook.herokuapp.com/user`;

// Login
export function login(data) {
    return http.post(`${apiEndPointUser}/login`, data);
}

// Logout
export function logout() {
    return http.post(`${apiEndPointUser}/logout`);
}

// Get-accounts
export function getAccounts() {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/get-accounts`);
}

// Get-accounts
export function getUserByUserId(userId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/get-user/${userId}`);
}

// Get-accounts by role
export function getAccountsByRole(role) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/get-accounts/${role}`);
}

// Create Student Account
export function createStudentAccount(data) {
    http.setJwt(getJwt());
    return http.post(`${apiEndPointUser}/create-student-account`, data);
}

// Create Professor Account
export function createProfessorAccount(data) {
    http.setJwt(getJwt());
    return http.post(`${apiEndPointUser}/create-professor-account`, data);
}


// Deleting a User by UserID
export function deleteUserByUserId(userId) {
    http.setJwt(getJwt());
    return http.delete(`${apiEndPointUser}/delete/${userId}`);
}

// Get Dashboards by UserId
export function getDashboardsByUserId(userId) {
    http.setJwt(getJwt());
    return http.get(`${apiEndPointUser}/dashboards/${userId}`);
}
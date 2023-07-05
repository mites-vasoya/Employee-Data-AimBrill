import axios from "axios";

const API = "http://localhost:9999";

const uploadIFile = async (formData) => {
    const response = await axios.post(API + "/file/import", formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type header
        },
    });
    return response.data;
}

const addNewData = async (newData) => {
    console.log("NEW DATA : ", newData);
    const response = await axios.post(API + `/employee/add`, newData);
    console.log("UPDATE RESPONSE :", response.data)
    return response.data;
}

const updateData = async (newData) => {
    console.log("NEW DATA : ", newData);
    const response = await axios.put(API + `/employee/edit/${newData.EmployeeID}`, newData);
    console.log("UPDATE RESPONSE :", response.data)
    return response.data;
}

const deleteSingleData = async (employeeId) => {
    const response = await axios.delete(API + `/employee/delete/${employeeId}`);
    return response.data;
}

const deleteMultipleData = async (employeeIds) => {
    const response = await axios.post(API + "/employee/delete/multiple", employeeIds);

    console.log("DELETE MULTIPLE : ", response.data)
    return response.data;
}

const employeeService = {
    uploadIFile, addNewData, updateData, deleteSingleData, deleteMultipleData
}

export default employeeService;
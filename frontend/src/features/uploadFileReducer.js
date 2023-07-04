import axios from "axios";

const API = "http://localhost:9999";

const uploadIFile = async (formData) => {

    console.log("Response Reducer: ", formData);

    const response = await axios.post(
        API + "/file/import",
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the content type header
            },
        }
    );

    return response.data;
}

const uploadFileService = {
    uploadIFile,
}

export default uploadFileService;
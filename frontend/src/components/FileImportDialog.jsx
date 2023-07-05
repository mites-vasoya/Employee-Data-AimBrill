import React, {useEffect, useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Dialog from "@mui/material/Dialog";

import {uploadFile} from "../features/employeeSlice";

import "./FileImportDialog.css"
import {useDispatch} from "react-redux";

function FileImportDialog({openImportFile, setOpenImportFile}) {
    const dispatch = useDispatch();
    const [importedFile, setImportedFile] = useState();

    const handleDropEvent = (e) => {
        console.log("DROP EVENT : ", e.target.files)
    }

    const handleImportFileChange = (e) => {
        const file = e.target.files[0];
        setImportedFile(URL.createObjectURL(file));
    }

    const handleImportBtn = () => {
        if (importedFile === undefined) {
            alert("Select File to Upload");
        } else {
            const form = document.getElementById("file-upload-form");
            const formData = new FormData(form);
            formData.append('file', importedFile);
            formData.append("name", "Mitesh");
            setOpenImportFile(!openImportFile);
            dispatch(uploadFile(formData));
        }
    }

    return (<div>
        <Dialog open={openImportFile} sx={{border: '3px solid red;'}}>
            <DialogTitle>Import File</DialogTitle>
            <DialogContent>
                <div className="fileUpload">
                    <form id="file-upload-form">
                        <input type="file" onChange={handleImportFileChange} name="importedFile"/>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenImportFile(!openImportFile)}>Cancel</Button>
                <Button onClick={handleImportBtn}>Import</Button>
            </DialogActions>
        </Dialog>
    </div>);
}

export default FileImportDialog;
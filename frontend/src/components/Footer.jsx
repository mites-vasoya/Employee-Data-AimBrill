import React from 'react';
import "./Footer.css"
import {Button} from "@mui/material";

function Footer({openImportFile, setOpenImportFile}) {
    return (<div className="footer">
        <Button variant="contained" sx={{margin: "auto 20px auto auto"}} className="importFileBtn"
                onClick={() => setOpenImportFile(!openImportFile)}>IMPORT
            FILE</Button>
    </div>);
}

export default Footer;
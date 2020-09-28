import React from "react";
import "./Footer.css"
import {Typography} from "@material-ui/core";


class Footer extends React.Component<{}, {}>{
    render() {
        return (
            <div color='secondary' className='main-footer'>
                <div className='a'>
                    <Typography variant="body1">Copyright ©  Book In. All rights reserved</Typography>
                </div>
            </div>
        )
    }
}


export default Footer;

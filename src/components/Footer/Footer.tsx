import React from "react";
import "./Footer.css"


export class Footer extends React.Component<{}, {}>{
    render() {
        return (
            <div color='secondary' className='main-footer'>
                <div className='a'>
                    <p>Copyright ©  Book In. All rights reserved</p>
                </div>
            </div>
        )
    }

}

export default Footer
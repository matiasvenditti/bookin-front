import React from 'react';
import {default as ReactWorldFlagsFlag} from 'react-world-flags';
import './Flag.css';


interface FlagProps {
    code: string,
    height?: string,
}

export const Flag = (props: FlagProps) => {
    const {code, height} = props;

    return (
        <div className='flag-container'>
            <ReactWorldFlagsFlag code={code} height={height || "16"} />
        </div>
    )
}

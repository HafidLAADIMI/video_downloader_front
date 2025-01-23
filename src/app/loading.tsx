import React from "react";
import { Ellipsis } from 'react-css-spinners'
function Loading() {
    return (
        <div className=" bg-black h-full w-full flex  justify-center items-center">
            <Ellipsis color="rgba(14,165,233)" size={86} />
        </div>
    );
}

export default Loading;
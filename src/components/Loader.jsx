import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loader(params) {

    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
    );
};


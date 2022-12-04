import 'styles/loading.scss';
import React from "react";

interface Props {
    isLoading: boolean
}

const Loading : React.FC<Props>= ({isLoading}) => {
    if(isLoading) {
        return (
            <div className="loading">
                <div className="loadingio-spinner-spinner-fi70xeirlmk">
                    <div className="ldio-h1i410tahtn">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <></>
    );
}

export default Loading;
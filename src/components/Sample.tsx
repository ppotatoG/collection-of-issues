import React from 'react';


interface Props {
    isLoading:boolean
}
const Sample:React.FC<Props> = ({isLoading}) => {
    if(isLoading) {
        return <div>Loading 중</div>
    }
    return (
        <div>Loading 중 아님;</div>
    );
};

export default Sample;
import 'styles/loading.scss';
import React from "react";

// prop이 아니니 따로
interface Data {
    title?:string;
    description:string;
    name:string;
    createdAt:string;
    like:number;
}
interface Board extends Data {
    updatedAt:string;
}

interface ObjectType<T> {
    [key:string]:T
}

interface Props {
    isLoading?:boolean;
    data?:Data[]
}

const a:ObjectType<string | number> = {
    title:'',
    description:''
}
console.log(a)

const Loading:React.FC<Props> = ({isLoading,data}) => {
    const LoadingComponent = () : JSX.Element => {
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
        if(!isLoading) return <></>;
    }
    return (
         <LoadingComponent/>
    );
}

export default Loading;
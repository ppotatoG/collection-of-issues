import {FaSortDown} from "react-icons/fa";
import React, {Dispatch, SetStateAction} from "react";

interface SelectBoxType {
    sortView : boolean
    setSortView : Dispatch<SetStateAction<boolean>>
    sortSelectValue : string
    setSortSelectValue : Dispatch<SetStateAction<string>>
    searchText : string
    fetchRepos: any
}

const SelectBox = ({
   sortView,
   setSortView,
   sortSelectValue,
   setSortSelectValue,
   searchText,
   fetchRepos
} : SelectBoxType ): JSX.Element => {
    const sortValues : string[] = [ 'default', 'stars', 'forks', 'updated' ];

    const selectSort = ( selectedValue : string ) => {
        setSortSelectValue(selectedValue)
        setSortView(false);
        if (searchText) fetchRepos(selectedValue);
    }

    return (
        <div className="selectBox">
            <button
                type="button"
                onClick={() => setSortView(!sortView)}
            >
                {sortSelectValue && <span>{sortSelectValue}</span>}
                <FaSortDown/>
            </button>
            <ul>
                {
                    sortView &&
                    sortValues.map((curValue : string, idx : number) => {
                        return (
                            <li
                                key={idx}
                                value={curValue}
                                onClick={() => selectSort(curValue)}
                            >
                                {curValue}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default SelectBox;
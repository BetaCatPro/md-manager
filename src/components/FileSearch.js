import React, { useState } from 'react'

const FileSearch = ({title, onFileSearch}) => {
    const [ inputActive, setinputActive ] = useState(false)
    const [ value, setValue ] = useState('')

    return (
        <div className="alert alert-primary">
            {
                !inputActive &&
                <div className="d-flex justify-content-between align-items-center">
                    <span>{title}</span>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={()=>{setinputActive(true)}}
                    >搜索
                    </button>
                </div>
            }
            {
                inputActive &&
                <div className="row">
                    <input
                        className="form-control col-8"
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                    <button
                        className="btn btn-primary col-4"
                        type="button"
                        onClick={()=>{setinputActive(true)}}
                    >搜索
                    </button>
                </div>
            }
        </div>
    )
}

export default FileSearch
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import PropTypes from 'prop-types'

import keyPressed from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const node = useRef(null)

    const enterPressed = keyPressed(13) // enter键
    const escPressed = keyPressed(27) // esc键

    const closeSearch = (editItem) => {
        setEditStatus(null)
        setValue('')
        if(editItem.isNew) {
            onFileDelete(editItem.id)
        }
    }

    useEffect(() => {
        const editItem = files.find(file => file.id === editStatus)
        if(enterPressed && editStatus && value.trim() != '') {
            onSaveEdit(editItem.id, value)
            setEditStatus(false)
            setValue('')
        }
        if(escPressed && editStatus) {
            closeSearch(editItem)
        }
    })

    useEffect(() => {
        const newFile = files.find(file => file.isNew)
        if(newFile) {
            setEditStatus(newFile.id)
            setValue(newFile.title)
        }
    },[files])

    useEffect(() => {
        if(editStatus) {
            node.current.focus()
        }
    }, [editStatus])

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files.map(file => (
                    <li
                        className="row mx-0 list-group-item bg-light d-flex align-items-center file-item"
                        key={file.id}
                    >
                        {(file.id !== editStatus && !file.isNew) &&
                            <>
                            <span className="col-2">
                                <FontAwesomeIcon
                                    icon={faMarkdown}
                                    size="lg"
                                />
                            </span>
                            <span
                                className="col-6 c-link"
                                onClick={()=>{onFileClick(file.id)}}
                            >{file.title}</span>

                            <button
                                className="icon-btn col-2"
                                type="button"
                                onClick={()=>{setEditStatus(file.id);setValue(file.title)}}
                            >
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    size="lg"
                                    title="编辑"
                                />
                            </button>
                            <button
                                className="icon-btn col-2"
                                type="button"
                                onClick={()=>{onFileDelete(file.id)}}
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size="lg"
                                    title="删除"
                                />
                            </button>
                            </>
                        }
                        {((file.id === editStatus) || file.isNew) &&
                            <>
                            <input
                                className="form-control col-10"
                                value={value}
                                ref={node}
                                onChange={(e)=>{setValue(e.target.value)}}
                            />
                            <button
                                className="icon-btn col-2"
                                type="button"
                                onClick={()=>{closeSearch(file)}}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    title="关闭"
                                    size="lg"
                                />
                            </button>
                            </>
                        }
                    </li>
                ))
            }
        </ul>
    )
}

FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onSaveEdit: PropTypes.func,
    onFileDelete: PropTypes.func
}

export default FileList

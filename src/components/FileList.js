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

    const closeSearch = (e) => {
        e.preventDefault()
        setEditStatus(null)
        setValue('')
    }

    useEffect(() => {
        const handleInputEvent = (event) => {
            if(enterPressed && editStatus) {
                const editItem = files.find(file => file.id === editStatus)
                onSaveEdit(editItem.id, value)
                setEditStatus(false)
                setValue('')
            }
            if(escPressed && editStatus) {
                closeSearch(event)
            }
        }
        document.addEventListener('keyup', handleInputEvent)
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
        }
    })

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
                        className="row list-group-item bg-light d-flex align-items-center file-item"
                        key={file.id}
                    >
                        {(file.id !== editStatus) &&
                            <>
                            <span className="col-2">
                                <FontAwesomeIcon
                                    icon={faMarkdown}
                                    size="lg"
                                />
                            </span>
                            <span
                                className="col-8 c-link"
                                onClick={()=>{onFileClick(file.id)}}
                            >{file.title}</span>

                            <button
                                className="icon-btn col-1"
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
                                className="icon-btn col-1"
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
                        {(file.id === editStatus) &&
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
                                onClick={closeSearch}
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

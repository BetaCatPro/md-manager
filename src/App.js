import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { v4 as uuidv4 } from 'uuid'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'

import defaultFiles from './utils/defaultFiles'

function App() {
    const [ files, setFiels ] = useState(defaultFiles)
    const [ searchFiles, setSearchFiels ] = useState([])
    const [ activeFileId, setActiveFileId ] = useState('')
    const [ openedFilesId, setOpenedFilesId ] = useState([])
    const [ unsavedFilesId, setUnsavedFilesId ] = useState([])
    const openedFiles = openedFilesId.map((openedId) => {
        return files.find(file => file.id === openedId)
    })
    const activeFile = files.find(file => file.id === activeFileId)
    const fileListArr = (searchFiles.length > 0) ? searchFiles : files

    // 搜索文件
    const fileSearch = (keyword) => {
        const newFiles = files.filter(file => file.title.includes(keyword))
        setSearchFiels(newFiles)
    }

    // 文件列表点击
    const fileClick = (fileId) => {
        setActiveFileId(fileId)
        if(!openedFilesId.includes(fileId)) {
            setOpenedFilesId([...openedFilesId,fileId])
        }
    }

    // 编辑文件名
    const saveEdit = (fileId, title) => {
        const newFiles = files.map(file => {
            if(file.id === fileId) {
                file.title = title
                file.isNew = false
            }
            return file
        })
        setFiels(newFiles)
    }

    // 删除文件
    const fileDelete = (fileId) => {
        const newFiles = files.filter(file => file.id != fileId)
        setFiels(newFiles)
        tabClose(fileId)
    }

    // 点击导航标签
    const tabClick = (fileId) => {
        setActiveFileId(fileId)
    }

    // 关闭导航标签
    const tabClose = (id) => {
        const tabWithout = openedFilesId.filter(fileID => fileID != id)
        setOpenedFilesId(tabWithout)
        if(tabWithout.length > 0) {
            setActiveFileId(tabWithout[0])
        } else {
            setActiveFileId('')
        }
    }

    // 文档内容改变回调
    const fileChange = (id, value) => {
        const newFiles = files.map(file => {
            if(file.id === id) {
                file.body = value
            }
            return file
        })
        setFiels(newFiles)
        if(!unsavedFilesId.includes(id)) {
            setUnsavedFilesId([...unsavedFilesId, id])
        }
    }

    // 新建文件
    const createFile = () => {
        const newId = uuidv4()
        const newFiles = [...files,{
            id: newId,
            title: '',
            body: '## title',
            createdAt: new Date().getTime(),
            isNew: true
        }]
        setFiels(newFiles)
    }

    return (
        <div className="App container-fluid px-0">
            <div className="row no-gutters">
                <div className="col-4 bg-light left-pannel">
                    <FileSearch
                        title="我的云文档"
                        onFileSearch={fileSearch}
                    />
                    <FileList
                        files={fileListArr}
                        onFileClick={fileClick}
                        onSaveEdit={saveEdit}
                        onFileDelete={fileDelete}
                    />
                    <div className="row no-gutters button-group">
                        <div className="col">
                            <BottomBtn
                                text="新建"
                                colorClass="btn-primary"
                                icon={faPlus}
                                onBtnClick={createFile}
                            />
                        </div>
                        <div className="col">
                            <BottomBtn
                                text="导入"
                                colorClass="btn-success"
                                icon={faFileImport}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-8 right-pannel">
                    {!activeFileId &&
                        <div className="start-page">
                            选择或者创建新的 Markdown 文档
                        </div>
                    }
                    {activeFileId &&
                        <>
                        <TabList
                            files={openedFiles}
                            activeId={activeFileId}
                            unsaveIds={unsavedFilesId}
                            onTabClick={tabClick}
                            onCloseTab={tabClose}
                        />
                        <SimpleMDE
                            key={activeFile && activeFile.id}
                            value={activeFile && activeFile.body}
                            onChange={(value) => {fileChange(activeFile.id, value)}}
                            options={{
                                minHeight: '450px',
                            }}
                        />
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'

function App() {
    return (
        <div className="App container-fluid">
            <div className="row">
                <div className="col-4 bg-light left-pannel">
                    <FileSearch
                        title="我的云文档"
                        onFileSearch={(id)=>{console.log(id)}}
                    />
                    <FileList
                        files={defaultFiles}
                        onFileClick={(id)=>{console.log(id)}}
                        onSaveEdit={(id,val)=>{console.log(id,val)}}
                        onFileDelete={(id)=>{console.log(id)}}
                    />
                </div>
                <div className="col-8 bg-primary right-pannel">
                    <p>container</p>
                </div>
            </div>
        </div>
    );
}

export default App;

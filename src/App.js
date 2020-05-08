import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'

function App() {
    return (
        <div className="App container-fluid">
            <div className="row">
                <div className="col-5 bg-light left-pannel">
                    <FileSearch
                        title="我的云文档"
                        onFileSearch={()=>{}}
                    />
                </div>
                <div className="col-7 bg-primary right-pannel">
                    <p>container</p>
                </div>
            </div>
        </div>
    );
}

export default App;

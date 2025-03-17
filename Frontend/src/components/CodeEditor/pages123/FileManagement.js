import React from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

const FileManagement = ({ token }) => {
    return (
        <div>
            <FileUpload token={token} />
            <FileList token={token} />
        </div>
    );
};

export default FileManagement;

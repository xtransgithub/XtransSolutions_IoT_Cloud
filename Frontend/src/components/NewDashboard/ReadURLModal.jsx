import React, { useState, useEffect } from 'react';
import { server } from '../../config';
const ReadURLModal = ({ allChannels, show, onClose }) => {
    const [selectedChannelId, setSelectedChannelId] = useState('');
    const [generatedURL, setGeneratedURL] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!show) {
            setSelectedChannelId('');
            setGeneratedURL('');
            setCopied(false);
        }
    }, [show]);

    const handleGenerate = () => {
        if (selectedChannelId) {
            // const url = `http://cloud.xtranssolutions.com/node/api/channels/${selectedChannelId}/entries/read`;
            const url = `${server}api/channels/${selectedChannelId}/entries/read`
            setGeneratedURL(url);
            setCopied(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedURL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Generate Read URL</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Select Channel</label>
                            <select
                                className="form-select"
                                value={selectedChannelId}
                                onChange={(e) => setSelectedChannelId(e.target.value)}
                            >
                                <option value="">-- Select Channel --</option>
                                {allChannels.map(channel => (
                                    <option key={channel._id} value={channel._id}>
                                        {channel.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {generatedURL && (
                            <div className="alert alert-info mt-3">
                                <strong>Generated URL:</strong>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <code style={{ wordBreak: 'break-word', flex: 1 }}>{generatedURL}</code>
                                    <button
                                        className="btn btn-outline-primary btn-sm ms-3"
                                        onClick={handleCopy}
                                    >
                                        {copied ? 'Copied!' : 'Copy URL'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={!selectedChannelId}
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadURLModal;

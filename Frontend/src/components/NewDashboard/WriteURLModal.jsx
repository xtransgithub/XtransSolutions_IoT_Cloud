import React, { useState, useEffect } from 'react';
import config from '../../config';
const WriteURLModal = ({ allChannels, show, onClose }) => {
    const [selectedChannelId, setSelectedChannelId] = useState('');
    const [selectedFields, setSelectedFields] = useState([]);
    const [generatedURL, setGeneratedURL] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!show) {
            setSelectedChannelId('');
            setSelectedFields([]);
            setGeneratedURL('');
            setCopied(false);
        }
    }, [show]);

    const handleGenerate = () => {
        if (selectedChannelId && selectedFields.length > 0) {
            const queryParams = selectedFields.map(f => `${f}=12`).join('&');
            // const url = `http://cloud.xtranssolutions.com/node/api/channels/${selectedChannelId}/entries?${queryParams}`;
            const url = `${config.BACKEND_URL}api/channels/${selectedChannelId}/entries?${queryParams}`;
            setGeneratedURL(url);
            setCopied(false); // Reset copied message
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedURL)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
    };

    const selectedChannel = allChannels.find(c => c._id === selectedChannelId);

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Generate Write URL</h5>
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

                        <div className="mb-3">
                            <label className="form-label">Select Fields</label>
                            <select
                                multiple
                                className="form-select"
                                value={selectedFields}
                                onChange={(e) =>
                                    setSelectedFields([...e.target.selectedOptions].map(opt => opt.value))
                                }
                                disabled={!selectedChannelId}
                                style={{ height: '150px' }}
                            >
                                {(selectedChannel?.fields || []).map((field, index) => (
                                    <option key={index} value={field}>{field}</option>
                                ))}
                            </select>
                            <small className="text-muted">Hold Ctrl (or Cmd) to select multiple fields.</small>
                        </div>

                        {generatedURL && (
                            <>
                                <div className="alert alert-success mt-3">
                                    <strong>Generated URL:</strong>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <code style={{ wordBreak: 'break-word', flex: 1 }}>{generatedURL}</code>
                                      {/*  //<button
                                            //className="btn btn-outline-primary btn-sm ms-3"
                                          //  onClick={handleCopy}
                                        //>
                                         //   {copied ? 'Copied!' : 'Copy URL'}
                                       // </button>  */}
                                     </div>
                                </div>
                                <p className="text-success mt-2 fw-semibold">
                                    ✅ Link generated! (Note: Change the field value according to requirments)
                                </p>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button
                            className="btn btn-primary"
                            onClick={handleGenerate}
                            disabled={!selectedChannelId || selectedFields.length === 0}
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteURLModal;

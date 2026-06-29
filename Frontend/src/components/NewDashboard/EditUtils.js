import axios from 'axios';
import config from '../../config';

export const handleChannelUpdate = async (id, updatedChannelName, token, setChannelData, setIsEditing) => {
    try {
        const response = await axios.patch(
            `${config.BACKEND_URL}api/auth/channels/${id}`,
            { name: updatedChannelName },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setChannelData(prevData => ({ ...prevData, name: response.data.channel.name }));
        window.location.reload();
        setIsEditing(false);
    } catch (error) {
        console.error('Error updating channel name:', error);
    }
};

export const handleFieldUpdate = async (id, updatedFields, token, setChannelData, setIsEditing) => {
    const confirmUpdate = window.confirm('Are you sure you want to update the field names?');
    if (!confirmUpdate) return;

    // Validate field names
    const invalidField = updatedFields.find(({ newName }) => !/^[a-z0-9]+$/.test(newName));
    if (invalidField) {
        alert('Field names can only contain lowercase letters and numbers.');
        return;
    }

    try {
        const updatedFieldData = updatedFields.map(({ oldName, newName }) => ({ oldName, newName }));

        const response = await axios.patch(
            `${config.BACKEND_URL}api/auth/channels/${id}/fields`,
            { fields: updatedFieldData },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setChannelData(prevData => ({
            ...prevData,
            fields: response.data.channel.fields
        }));

        window.location.reload();
        setIsEditing(false);
    } catch (error) {
        console.error('Error updating field names:', error);
        alert('An error occurred while updating field names. Please try again.');
    }
};

export const handleAddMultipleFields = async (id, newFields, token, setChannelData, setIsEditing) => {
    if (newFields.length > 0) {
        const invalidFields = newFields.filter(field => !/^[a-z0-9]+$/.test(field));
        if (invalidFields.length > 0) {
            alert('Field names can only contain lowercase letters and numbers.');
            return;
        }

        try {
            const response = await axios.patch(
                `${config.BACKEND_URL}api/channels/${id}/add-fields`,
                { fields: newFields },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setChannelData(prevData => ({
                ...prevData,
                fields: [...prevData.fields, ...response.data.channel.fields]
            }));
            // setNewFields([]);
            window.location.reload();
            setIsEditing(false);
        } catch (error) {
            console.error('Error adding new fields:', error);
        }
    } else {
        alert('Please enter at least one field.');
    }
};

export const handleRemoveField = async (id, fieldToRemove, token, setChannelData, setFieldData, setHistoricalData) => {
    if (fieldToRemove.trim()) {
        try {
            const response = await axios.delete(
                `${config.BACKEND_URL}api/channels/${id}/fields/${fieldToRemove}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setChannelData(prevData => ({
                    ...prevData,
                    fields: prevData.fields.filter(field => field !== fieldToRemove),
                }));

                setFieldData(prevData => {
                    const updatedFieldData = { ...prevData };
                    delete updatedFieldData[fieldToRemove];
                    return updatedFieldData;
                });

                setHistoricalData(prevData => {
                    const updatedHistoricalData = { ...prevData };
                    delete updatedHistoricalData[fieldToRemove];
                    return updatedHistoricalData;
                });

                // setFieldToRemove('');
                window.location.reload();
            } else {
                console.error('Failed to remove field:', response.data.message);
                alert(response.data.message || 'Failed to remove field.');
            }
        } catch (error) {
            console.error('Error removing field:', error);
            alert(error.response?.data?.message || 'Error occurred while removing field.');
        }
    } else {
        alert('Please enter a valid field name to remove.');
    }
};
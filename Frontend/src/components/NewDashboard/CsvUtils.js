import axios from 'axios';
import { server } from '../../config';

export const getCSV = async (id, token) => {
    try {
        const response = await axios.get(
            `${server}api/csv/channels/${id}/fields/csv`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob',
            }
        );
        if (response.data.size === 0) {
            alert("No data available to export");
            return;
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `channel_${id}_fields.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.error('Error downloading CSV:', error);
    }
};

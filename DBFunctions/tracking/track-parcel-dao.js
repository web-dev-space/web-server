import axios from "axios";

export const createTrackParcel = async (courier, trackingNumber) => {
    if (!courier) {
        courier = 'dhl';
    }

    console.log('createTrackParcel: courier: ', courier, ' trackingNumber: ', trackingNumber)

    const options = {
        method: 'POST',
        url: 'https://api.tracktry.com/v1/trackings/post',
        headers: {
            'Content-Type': 'application/json',
            'Tracktry-Api-Key': process.env.REACT_APP_TRACKTRY_API_KEY
        },
        data: {
            tracking_number: trackingNumber,
            carrier_code: courier
        }
    };

    const response = await axios.request(options);
    return response.data;
};

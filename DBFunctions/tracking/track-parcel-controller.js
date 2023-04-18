import axios from "axios";

const TrackParcelController = (app) => {
    app.get("/trackParcels/:courier/:trackingNumber", findTrackParcelById);
    app.post("/trackParcels/tracking", createTrackParcel);
};

const findTrackParcelById = async (req, res) => {
    try {
        const courier = req.params.courier;
        const trackingNumber = req.params.trackingNumber;

        const options = {
            method: 'GET',
            url: `https://api.tracktry.com/v1/trackings/${courier}/${trackingNumber}`,
            headers: {
                'Content-Type': 'application/json',
                'Tracktry-Api-Key': process.env.REACT_APP_TRACKTRY_API_KEY
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error("error in getParcelTracking", error, error?.response?.data);
    }
};

const createTrackParcel = async (req, res) => {
    const {courier, trackingNumber} = req.body;
    try {
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
        res.json(response.data);
    } catch (error) {
        console.error("error in createTracking", error, error?.response?.data);
    }
};

export default TrackParcelController;
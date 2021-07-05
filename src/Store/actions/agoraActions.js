export const GET_TOKEN = "GET_TOKEN";

const baseUrl = "https://api.theclimatelink.com/api/v1/";

const endpoints = {
    getToken: "chat/token"
}

export const getToken = (channel, cb) => {
    return async dispatch => {
        try {
            const response = await fetch(
                baseUrl + endpoints.getToken,
                {
                    method: "POST",
                    body: JSON.stringify({
                        "channelName": channel,
                        "privileges": [
                            1
                        ]
                    }),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        // "Authorization": 'Bearer ' + accessToken,
                    }
                }
            );

            const responseJson = await response.json();

            if (!responseJson.message) {
                throw new Error("Something went wrong");
            }

            if (cb) {
                cb(responseJson.message);
            }
        } catch (err) {
            console.log(err, "error");
        }
    }
}
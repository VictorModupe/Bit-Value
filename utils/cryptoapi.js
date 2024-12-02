import { XRapidAPIHost, XRapidAPIKey, XRapidAPIHostNews} from "./api";
import axios from "axios";

//Endpoints

const apiBaseUrl = "https://coinranking1.p.rapidapi.com";

const coinsUrl = `${apiBaseUrl}/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0`

const newsUrl = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk"

const CryptoApiCall = async (endpoints, params) => {
    const options = {
        method: "GET",
        url: endpoints,
        params: params ? params: {},
        headers:{
            "X-RapidAPI-Key": `${XRapidAPIKey}`,
            "X-RapidAPI-Host": `${XRapidAPIHost}`,
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error Response:", error.response?.data || "No response data");
        console.error("Status Code:", error.response?.status || "No status code");
        console.error("Headers:", error.response?.headers || "No headers");
        console.error("Full Error Object:", error); 
        return {};}};

const NewsApiCall = async (endpoints) => {
            const options = {
                method: "GET",
                url: endpoints, 
                params: params ? params: {},
                headers:{
                    "X-RapidAPI-Key": `${XRapidAPIKey}`,
                    "X-RapidAPI-Host": `${XRapidAPIHostNews}`,
                },
            };
        
            try {
                const response = await axios.request(options);
                return response.data;
              } catch (error) {
                console.error("Error Response:", error.response?.data || "No response data");
                console.error("Status Code:", error.response?.status || "No status code");
                console.error("Headers:", error.response?.headers || "No headers");
                console.error("Full Error Object:", error); 
                return {};}};
export const FetchAllCoins = async () => {
    return await CryptoApiCall(coinsUrl);
};

export const FetchCoinDetails = async (coinUuid) => {
    const endpoints = `${apiBaseUrl}/coin/${coinUuid}/?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
    return await CryptoApiCall(endpoints);
}

export const FetchCoinHistory = async (coinUuid) => {
    const endpoints = `${apiBaseUrl}/coin/${coinUuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
    return await CryptoApiCall(endpoints);
}

export const SearchCoins = async (search) => {
    const endpoints = `${apiBaseUrl}/search-suggestion?referenceCurrencyUuid=yhjMzLPhuIDl&query=${search}`;
    return await CryptoApiCall(endpoints);
}

export const FetchCryptoNews = async () => {
    return await NewsApiCall(newsUrl);
}
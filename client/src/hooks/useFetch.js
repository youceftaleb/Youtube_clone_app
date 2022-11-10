import { useState, useEffect } from "react";
const baseUrl = "http://localhost:9001/api";
const useFetch = (url, x = null) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(baseUrl + url)
            .then((res) => res.json())
            .then((jsonData) => {
                setResponse(jsonData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [x]);

    return { response, error, loading };
};

export default useFetch;

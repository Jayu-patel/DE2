import { useEffect, useState } from 'react';

function useGeoLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {
            lat: '',
            lng: '',
        },
        error: null
    });

    useEffect(() => {
        let isMounted = true;
        if ("geolocation" in navigator) {

            const success = (position) => {
                if (isMounted) {
                    setLocation({
                        loaded: true,
                        coordinates: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        error: null
                    });
                }
            };

            const error = (e) => {
                if (isMounted) {
                    setLocation((prevLocation) => ({
                        ...prevLocation,
                        loaded: true,
                        error: e.message
                    }));
                }
            };

            const options = {
                // enableHighAccuracy: true,
                timeout: 5000, // 5 seconds timeout
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            if (isMounted) {
                setLocation((prevLocation) => ({
                    ...prevLocation,
                    loaded: true,
                    error: "Geolocation not supported"
                }));
            }
        }

        return () => {
            isMounted = false;
        }
    }, [])

    return location
}

export default useGeoLocation
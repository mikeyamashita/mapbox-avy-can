/* from https://medium.com/@josephat94/building-a-custom-hook-to-detect-user-device-in-react-js-e4dd6e0d2d9c*/
import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
    const [device, setDevice] = useState('');

    useEffect(() => {
        const handleDeviceDetection = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobile = /android|blackberry|windows phone/g.test(userAgent);
            const isIOS = /iphone|ipad|ipod/g.test(userAgent);
            const isTablet = /(tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

            if (isMobile) {
                setDevice('Mobile');
            } else if (isIOS) {
                setDevice('IOS');
            } else if (isTablet) {
                setDevice('Tablet');
            } else {
                setDevice('Desktop');
            }
        };

        handleDeviceDetection();
        window.addEventListener('resize', handleDeviceDetection);

        return () => {
            window.removeEventListener('resize', handleDeviceDetection);
        };
    }, []);

    return device;
};

export default useDeviceDetection;
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SetTitle: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const updateTitle = () => {
            switch (location.pathname) {
                case '/':
                    document.title = '0xhttps';
                    break;
                case '/about':
                    document.title = 'About - 0xhttps';
                    break;
                case '/contact':
                    document.title = 'Contact - 0xhttps';
                    break;
                case '/ai':
                    document.title = 'AI - 0xhttps';
                    break;
                default:
                    document.title = '0xhttps';
            }
        };
    updateTitle();
}, [location.pathname]);

    return null;
};

export default SetTitle;

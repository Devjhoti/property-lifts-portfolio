import React, { useState } from 'react';
import './ConfiguratorUI.css';

const options = {
    body: [
        { id: 'brushed_steel', label: 'Brushed Steel', color: '#cccccc' },
        { id: 'gold', label: 'Imperial Gold', color: '#F08F24' },
        { id: 'titanium', label: 'Titanium Slate', color: '#555555' },
        { id: 'matte_black', label: 'Obsidian Black', color: '#1a1a1a' }
    ],
    floor: [
        { id: 'dark_marble', label: 'Dark Marble', color: '#0d0d0d' },
        { id: 'light_travertine', label: 'Light Travertine', color: '#e6dfd1' },
        { id: 'wooden', label: 'Classic Oak', color: '#3d2314' },
        { id: 'terrazzo', label: 'Milano Terrazzo', color: '#888888' }
    ],
    ceiling: [
        { id: 'led_panel', label: 'Luminous LED', color: '#ffffff' },
        { id: 'starlight', label: 'Starlight Canopy', color: '#111111' },
        { id: 'mirror', label: 'Infinity Mirror', color: '#dddddd' }
    ],
    handle: [
        { id: 'silver', label: 'Chrome Silver', color: '#cccccc' },
        { id: 'gold', label: 'Brushed Gold', color: '#F08F24' },
        { id: 'matte_black', label: 'Matte Black', color: '#111111' }
    ],
    button_pad: [
        { id: 'touch_glass', label: 'Smart Touch Glass', color: '#000000' },
        { id: 'brushed_steel', label: 'Brushed Steel', color: '#cccccc' },
        { id: 'vintage_gold', label: 'Vintage Gold', color: '#F08F24' }
    ]
};

const ConfiguratorUI = ({ config, setConfig, isComplete, onRequestQuote }) => {
    const [activeTab, setActiveTab] = useState('body');

    const handleSelect = (category, id) => {
        setConfig(prev => ({ ...prev, [category]: id }));
    };

    return (
        <div className="configurator-ui">
            <div className="config-header">
                <h2>Design Your Lift</h2>
                <p>Select materials to customize your experience.</p>
            </div>

            <div className="tabs-container">
                {Object.keys(options).map(key => (
                    <button
                        key={key}
                        className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
            </div>

            <div className="options-container">
                {options[activeTab].map(opt => (
                    <div
                        key={opt.id}
                        className={`option-card ${config[activeTab] === opt.id ? 'active' : ''}`}
                        onClick={() => handleSelect(activeTab, opt.id)}
                    >
                        <div className="color-swatch" style={{ background: opt.color }}></div>
                        <span className="option-label">{opt.label}</span>
                    </div>
                ))}
            </div>

            <div className="action-footer">
                <button
                    className="premium-btn full-width"
                    disabled={!isComplete}
                    onClick={onRequestQuote}
                    style={{ opacity: isComplete ? 1 : 0.5, cursor: isComplete ? 'pointer' : 'not-allowed' }}
                >
                    <span>{isComplete ? 'Request Quote' : 'Select All Components'}</span>
                </button>
            </div>
        </div>
    );
};

export default ConfiguratorUI;

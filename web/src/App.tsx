import './App.css';
import { useState, useEffect } from 'react';
import Info from './components/Info';
import Map from './components/Map';
import Settings from './components/Settings';
import { DateTime } from 'luxon';

function App() {
    const [settings, setSettings] = useState({ start: DateTime.now().minus({weeks: 2}).toISO(), end: DateTime.now().toISO(), magnitude: 5, speed: 5 });
    useEffect(() => {
        async function load() {
            await loadData();
        }

        load();
    }, []);


    const updateSettings = function (key: string, value: string) {
        if(key === 'start' || key == 'end') {
            const date:DateTime = DateTime.fromISO(value);
            if(!date.isValid) return;
            value = date.toISO();
        }
        setSettings({ ...settings, [key]: value });
    }

    const loadData = async function () {
        //
    }

    return (
        <div className="app">
            {`loading data from: ${settings.start} to ${settings.end}, magnitude >${settings.magnitude}`}
            <Info settings={settings} />
            <Map />
            <Settings settings={settings} onUpdate={updateSettings} />
        </div>
    );
}

export default App;

const { useState, useEffect } = React

export function NoteMap({ note }) {
    const [mapId, setMapId] = useState('');

    useEffect(() => {
        // Generate a unique ID for the map container
        const uniqueId = `map-${note.id || Math.random().toString(36).substr(2, 9)}`;
        setMapId(uniqueId);

        // Load the Google Maps API script
        const loadMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDKcKxUkz6BNfdIoy7GDdyAtsE6eUHb8Vs&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = initMap;
        };

        // Function to initialize the map
        const initMap = () => {
            // Determine the center of the map based on the note's coords or default to London
            const center = note.info.coords ? note.info.coords : defaultCenter;

            // Create a new map centered around the determined location
            const map = new window.google.maps.Map(document.getElementById(uniqueId), {
                center: center,
                zoom: note.info.coords ? 10 : 12
            });

            // Add a marker for the note's location if provided
            if (note.info.coords) {
                new window.google.maps.Marker({
                    position: note.info.coords,
                    map: map
                });
            }
        };

        loadMapScript();
    }, [note]);

    // Default location to London
    const defaultCenter = { lat: 51.509865, lng: -0.118092 };

    return (
        <div className="note-map-container">
            <h2>{note.info.title}</h2>
            <div id={mapId} style={{ height: '140px', width: '250px' }}></div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import markers from "./markers";
import { markerImage, hiddenMarkers } from "./hidden";
import { pokeballImage, pokeballCoords } from "./pokeballCoords";
import techniques from "./techniques";

const Map = () => {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  const handleMarkerInteraction = (markerId, isHovered) => {
    if (isHovered) {
      setHoveredMarker(markerId);
    } else {
      setHoveredMarker(null);
    }
  };

  const handleMarkerClick = (markerId) => {
    if (selectedMarkers.includes(markerId)) {
      setSelectedMarkers(selectedMarkers.filter((id) => id !== markerId));
    } else {
      setSelectedMarkers([...selectedMarkers, markerId]);
    }
  };

  // Fonction pour télécharger la sauvegarde au format JSON
  const downloadSaveFile = () => {
    const saveData = {
      selectedMarkers,
    };
    const saveDataJSON = JSON.stringify(saveData);
    const blob = new Blob([saveDataJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mapSave.json";
    link.click();
  };

  // Fonction pour charger la sauvegarde à partir du fichier JSON
  const handleSaveFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const saveDataJSON = e.target.result;
      const saveData = JSON.parse(saveDataJSON);
      setSelectedMarkers(saveData.selectedMarkers || []);
    };
    reader.readAsText(file);
  };

  // Effet pour charger la sauvegarde initiale au chargement de la page (si disponible)
  useEffect(() => {
    const savedMarkers = localStorage.getItem("selectedMarkers");
    if (savedMarkers) {
      setSelectedMarkers(JSON.parse(savedMarkers));
    }
  }, []);

  // Effet pour sauvegarder les marqueurs sélectionnés à chaque changement
  useEffect(() => {
    localStorage.setItem("selectedMarkers", JSON.stringify(selectedMarkers));
  }, [selectedMarkers]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          background: "rgba(255, 255, 255, 0.8)", // Couleur de fond avec transparence
          padding: "10px",
          borderRadius: "5px",
          zIndex: 9999, // Valeur de zIndex élevée pour placer le panneau de contrôle au-dessus
        }}
      >
        <button style={{ marginBottom: "10px" }} onClick={downloadSaveFile}>
          Télécharger la sauvegarde
        </button>
        <input type="file" accept=".json" onChange={handleSaveFileUpload} />
      </div>

      <MapInteractionCSS>
        <img src="img/map.png" alt="Carte" />

        {markers.map((marker) => (
          <div
            key={marker.id}
            style={{
              position: "absolute",
              left: marker.x,
              top: marker.y,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => handleMarkerInteraction(marker.id, true)}
            onMouseLeave={() => handleMarkerInteraction(marker.id, false)}
            onClick={() => handleMarkerClick(marker.id)}
          >
            <img
              src="img/marker.png"
              alt={`Marqueur ${marker.id}`}
              style={{ zIndex: 1, width: marker.width, height: marker.height }}
            />
            {selectedMarkers.includes(marker.id) && (
              <img
                src="img/checkmark.png"
                alt="Checkmark"
                style={{
                  position: "absolute",
                  top: 0,
                  zIndex: 2,
                  width: "18px",
                  height: "18px",
                }}
              />
            )}
            {hoveredMarker === marker.id && !selectedMarkers.includes(marker.id) && (
              <div
                style={{
                  position: "absolute",
                  bottom: "+100%",
                  background: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                <p>{marker.info}</p>
                <p>{marker.id}</p>
              </div>
            )}
          </div>
        ))}

        {hiddenMarkers.map((marker) => (
          <div
            key={marker.id}
            style={{
              position: "absolute",
              left: marker.x,
              top: marker.y,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => handleMarkerInteraction(marker.id, true)}
            onMouseLeave={() => handleMarkerInteraction(marker.id, false)}
            onClick={() => handleMarkerClick(marker.id)}
          >
            <img
              src={markerImage}
              alt={`Marqueur ${marker.id}`}
              style={{ zIndex: 1, width: marker.width, height: marker.height }}
            />
            {selectedMarkers.includes(marker.id) && (
              <img
                src="img/checkmark.png"
                alt="Checkmark"
                style={{
                  position: "absolute",
                  top: 0,
                  zIndex: 2,
                  width: "18px",
                  height: "18px",
                }}
              />
            )}
            {hoveredMarker === marker.id && !selectedMarkers.includes(marker.id) && (
              <div
                style={{
                  position: "absolute",
                  bottom: "+100%",
                  background: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                <p>{marker.info}</p>
                <p>{marker.id}</p>
              </div>
            )}
          </div>
        ))}

        {pokeballCoords.map((pokeball) => (
          <div
            key={pokeball.id}
            style={{
              position: "absolute",
              left: pokeball.x,
              top: pokeball.y,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => handleMarkerInteraction(pokeball.id, true)}
            onMouseLeave={() => handleMarkerInteraction(pokeball.id, false)}
            onClick={() => handleMarkerClick(pokeball.id)}
          >
            <img
              src={pokeballImage}
              alt={`Pokéball ${pokeball.id}`}
              style={{ zIndex: 1, width: pokeball.width, height: pokeball.height }}
            />
            {selectedMarkers.includes(pokeball.id) && (
              <img
                src="img/checkmark.png"
                alt="Checkmark"
                style={{
                  position: "absolute",
                  top: 0,
                  zIndex: 2,
                  width: "18px",
                  height: "18px",
                }}
              />
            )}
            {hoveredMarker === pokeball.id && !selectedMarkers.includes(pokeball.id) && (
              <div
                style={{
                  position: "absolute",
                  bottom: "+100%",
                  background: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                <p>{pokeball.id}</p>
              </div>
            )}
          </div>
        ))}

        {techniques.map((technique) => (
          <div
            key={technique.id}
            style={{
              position: "absolute",
              left: technique.x,
              top: technique.y,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => handleMarkerInteraction(technique.id, true)}
            onMouseLeave={() => handleMarkerInteraction(technique.id, false)}
            onClick={() => handleMarkerClick(technique.id)}
          >
            <img
              src="img/TMItem.png"
              alt={`Technique ${technique.id}`}
              style={{ zIndex: 1, width: "12px", height: "12px" }}
            />
            {selectedMarkers.includes(technique.id) && (
              <img
                src="img/checkmark.png"
                alt="Checkmark"
                style={{
                  position: "absolute",
                  top: 0,
                  zIndex: 2,
                  width: "18px",
                  height: "18px",
                }}
              />
            )}
            {hoveredMarker === technique.id && !selectedMarkers.includes(technique.id) && (
              <div
                style={{
                  position: "absolute",
                  bottom: "+100%",
                  background: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                <p>{technique.id}</p>
              </div>
            )}
          </div>
        ))}

</MapInteractionCSS>
    </div>
  );
};

export default Map;

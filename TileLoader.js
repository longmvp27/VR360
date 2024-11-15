import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useState, useRef } from "react";

const TileLoader = ({ zoomLevel, cameraPosition }) => {
    const [tileTextures, setTileTextures] = useState({});
    const [loading, setLoading] = useState(true);
    const previousZoomLevel = useRef(zoomLevel); //track the zoom level
    const faces = ["px", "nx", "py", "ny", "pz", "nz"];

    // console.log("Camera pos: ", cameraPosition);
    // console.log("Zoom level: ", zoomLevel);
    // console.log("Previous zoom level: ", previousZoomLevel);
    const loadTile = async (face, zoomLevel, x, y) => {
        try {
            const response = await fetch(`/get-tile?face=${face}&x=${x}&y=${y}&zoomLevel=${zoomLevel}`);
            const blob = await response.blob();
            const img = await createImageBitmap(blob); // Convert blob to image
            const texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            return texture;
        } catch (error) {
            console.log("Error: ", error);
            return null;
        }
    };

    const getTileCoordinates = (cameraPosition, face, zoomLevel) => {
        const x = Math.floor(cameraPosition.x / (zoomLevel * 10));
        const y = Math.floor(cameraPosition.y / (zoomLevel * 10));
        return { x, y };
    };

    useEffect(() => {
        if(zoomLevel > previousZoomLevel) {
            const loadTilesForFace = async (face) => {
                const { x, y } = getTileCoordinates(cameraPosition, face, zoomLevel);
                const texture = await loadTile(face, zoomLevel, x, y);
                setTileTextures((prevTextures) => ({
                    ...prevTextures,
                    [face]: texture,
                }));
            };
    
            const loadAllTiles = async () => {
                setLoading(true);
                await Promise.all(
                    faces.map((face) => {
                        loadTilesForFace(face)
                    })
                );
                setLoading(false); //end loading process
            }
            loadAllTiles();
        }
        //update zoom level
        previousZoomLevel.current = zoomLevel;
    }, [zoomLevel, cameraPosition]);

    return (
        <>
            {faces.map((face) => (
                tileTextures[face] && (
                    <mesh key={face}>
                        <planeGeometry args={[500, 500]} />
                        <meshBasicMaterial map={tileTextures[face]} side={THREE.BackSide} />
                    </mesh>
                )
            ))}
        </>
    );
};

export default TileLoader;

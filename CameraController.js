import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
const CameraController = ({ cameraRef, setCameraPosition, setZoomLevel }) => {
    const previousDistRef = useRef(null);
    const zoomLevelRef = useRef(0); //track the zoom level 
    useFrame(() => {
        if (cameraRef?.current) {
            // Clone the current camera position
            const currentPosition = cameraRef.current.position.clone();
            setCameraPosition(currentPosition);

            // Calculate the zoom level based on the camera's distance from the origin
            const currentDist = currentPosition.length();
            console.log("Previous distance: ", previousDistRef.current);
            console.log("Current distance: ", currentDist);
            console.log("Current zoom level: ", zoomLevelRef.current);
            if(previousDistRef.current != null) {
                if(currentDist < previousDistRef.current) {
                    //Zoom in
                    zoomLevelRef.current = Math.min(Math.round(zoomLevelRef.current) + 1, 3);
                }
            }
            //Update the zoom level state and distance
            previousDistRef.current = currentDist;
            setZoomLevel(zoomLevelRef.current);
        }
    });

    return null; 
};

export default CameraController;
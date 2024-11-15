"use client";
import React, { Suspense, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import '../style/style.css'
import ImageControls from './ImageControls'
import Dome from './Dome'
import ClickHandle from './ClickHandle'
import TileLoader from './TileLoader'
import CameraController from './CameraController'
import * as THREE from 'three'
const ThreeSixtyImage = () => { 
    const [clickedPosition, setClickedPosition] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(0);
    const [cameraPosition, setCameraPosition] = useState({x: 0, y: 0, z: 0});
    const cameraRef = useRef();
    return (
        <>
            <Canvas 
            camera={{ position: [0, 0, 0.1] }} 
            onCreated={(state) => (cameraRef.current = state.camera)} //Get camera ref
            gl={{toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2}}
            >
                <ambientLight intensity={1.0} />
                <ImageControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.2}
                    autoRotate={false}
                    rotateSpeed={-0.5}
                />
                <Suspense fallback={null}>
                    <Dome />
                </Suspense>
                <CameraController
                    cameraRef={cameraRef} //Pass the camera
                    setCameraPosition={setCameraPosition}
                    setZoomLevel={setZoomLevel}
                />
                <TileLoader zoomLevel={zoomLevel} cameraPosition={cameraPosition} />
                <ClickHandle
                    setClickedPosition={setClickedPosition}
                />

            </Canvas>
        </>
    );
};

export default ThreeSixtyImage;
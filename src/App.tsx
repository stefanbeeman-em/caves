import * as THREE from 'three';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { CameraControls } from "@react-three/drei"
import { Cave, randomCaves } from './Caves';

const DEG45 = Math.PI / 4;

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'red' : 'blue'} wireframe={true} />
    </mesh>
  )
}

function App() {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const caves = randomCaves(24);
  return (
    <>
      <Canvas>
        <CameraControls ref={cameraControlRef}/>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {caves.map((cave: Cave) => (
          <Box position={[cave.xpos, cave.ypos, cave.zpos]} scale={cave.scale} />
        ))}
      </Canvas>
    </>
  )
}

export default App

import * as THREE from 'three';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { CameraControls } from "@react-three/drei"
import { Cave, CaveType, randomCaves } from './Caves';

const DEG45 = Math.PI / 4;

type BoxMesh = ThreeElements['mesh'] & {color: string, text: string}

const CaveColors = {
  [CaveType.River]: 'blue',
  [CaveType.Fault]: 'red',
  [CaveType.Mine]: 'brown',
  [CaveType.Bloom]: 'yellow',
  [CaveType.Fungal]: 'pink',
  [CaveType.Ruins]: 'grey',
  [CaveType.Burrow]: 'purple'
}

function Box(props: BoxMesh) {
  const ref = useRef<THREE.Mesh>(null!)
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => alert(props.text)}
      onPointerOver={(event) => false}
      onPointerOut={(event) => false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} wireframe={true} />
    </mesh>
  )
}

function App() {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const caves = randomCaves(24);
  const [selected, select] = useState(false)
  return (
    <>
      <Canvas>
        <CameraControls ref={cameraControlRef}/>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {caves.map((cave: Cave) => (
          <Box
            position={[cave.xpos, cave.ypos, cave.zpos]}
            scale={cave.scale} color={CaveColors[cave.type]}
            text={cave.desc}
          />
        ))}
      </Canvas>
    </>
  )
}

export default App

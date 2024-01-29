import * as THREE from 'three';
import React, { Fragment, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { CameraControls, Html } from "@react-three/drei"
import { Cave, CaveType, randomCaves } from './Caves';

const DEG45 = Math.PI / 4;

type BoxMesh = ThreeElements['mesh'] & {
  key: number, 
  color: string, 
  label: string,
}

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
  const [showLabel, setShowLabel] = useState(false);
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <Fragment>
      <mesh
        {...props}
        ref={ref}
        onClick={(event) => alert(props.label)}
        onPointerOver={(event) => setShowLabel(true)}
        onPointerOut={(event) => setShowLabel(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={props.color} wireframe={true} />
      </mesh>
      {showLabel && (
        <Html center position={props.position}>
          <div style={{ fontWeight: "bold", color: props. color }}>{props.label}</div>
        </Html>
      )}
      
    </Fragment>
  )
}

interface ControlBarProps {
  onCenterCamera: () => void,
  onRotateLeft: () => void,
  onRotateRight: () => void,
}

function ControlBar(props: ControlBarProps) {
  return (
    <div style={{ position: 'absolute', top: '0' }}>
    <button
      type="button"
      onClick={props.onRotateLeft}
    >
      rotate left
    </button>
    <button
      type="button"
      onClick={props.onCenterCamera}
    >
      reset
    </button>
    <button
      type="button"
      onClick={props.onRotateRight}
    >
      rotate right
    </button>
  </div>
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
        {caves.map((cave: Cave, index: number) => (
          <Box
            key={index}
            position={[cave.xpos, cave.ypos, cave.zpos]}
            scale={cave.scale} color={CaveColors[cave.type]}
            label={cave.desc}
          />
        ))}
      </Canvas>
      <ControlBar 
        onCenterCamera={() => {
          cameraControlRef.current?.reset(true);
        }}
        onRotateLeft={() => {
          cameraControlRef.current?.rotate(DEG45, 0, true);
        }}
        onRotateRight={() => {
          cameraControlRef.current?.rotate(-1 * DEG45, 0, true);
        }}
      />
    </>
  )
}

export default App

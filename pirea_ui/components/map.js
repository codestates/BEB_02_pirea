
import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import niceColors from 'nice-color-palettes'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const data = Array.from({ length: 1000 }, () => ({ color: niceColors[17][Math.floor(Math.random() * 5)], scale: 1 }))

function Boxes({ onChange }) {

  const [hovered, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  const meshRef = useRef()
  const prevRef = useRef()
  useEffect(() => void (prevRef.current = hovered), [hovered])
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // meshRef.current.rotation.x = Math.sin(time / 4)
    // meshRef.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        const id = i++
        tempObject.position.set(5 - x, 10 - y)
        //tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(y / 4 + time) 
        if (hovered != prevRef.Current) {
          tempColor.set(id === hovered ? 'white' : data[id].color).toArray(colorArray, id * 3)
          meshRef.current.geometry.attributes.color.needsUpdate = true
          // localStorage.setItem("axis", tempObject.position['x'])
          id === hovered ? onChange({ x: tempObject.position['x'], y: tempObject.position['y'] }) : null;
          // console.log(tempObject.position);

        }
        const scale = (data[id].scale = THREE.MathUtils.lerp(data[id].scale, id === hovered ? 2 : 1, 0.1))
        tempObject.scale.setScalar(scale)
        tempObject.updateMatrix()
        meshRef.current.setMatrixAt(id, tempObject.matrix)
        // console.log(id, tempObject.position);
      }
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, 1000]} onClick={(e) => {
      set(e.instanceId);
    }} onPointerOut={(e) => set(undefined)}>
      <boxGeometry args={[0.6, 0.6, 0.6]}>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </boxGeometry>
      <meshPhongMaterial vertexColors={THREE.VertexColors} />
    </instancedMesh>
  )
}

export default function Map({ onChange }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()

  return (
    <>
      <Canvas
        linear
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 15], near: 5, far: 20 }}
        onCreated={({ gl }) => gl.setClearColor('#f0f0f0')}>
        <ambientLight />
        <pointLight position={[150, 150, 150]} intensity={0.55} />
        <Boxes onChange={onChange} />
      </Canvas>
    </>
  )
}

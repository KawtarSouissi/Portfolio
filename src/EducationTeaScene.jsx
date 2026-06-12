import React, { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const TEA_MODEL = '/3D_glb_optimized/tea.glb'
const textureSlots = [
  'map',
  'normalMap',
  'roughnessMap',
  'metalnessMap',
  'emissiveMap',
  'aoMap',
  'alphaMap',
]

function TeaModel() {
  const group = useRef(null)
  const { gl, size: viewportSize } = useThree()
  const { scene } = useGLTF(TEA_MODEL)
  const targetSize = viewportSize.width < 600 ? 5.5 : 7.35
  const model = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((child) => {
      if (!child.isMesh || !child.material) return
      child.material = child.material.clone()
      child.material.envMapIntensity = 1.45
      if (child.material.color && child.material.metalness > .35) {
        child.material.color.lerp(new THREE.Color('#d7ad5d'), .48)
        child.material.roughness = Math.min(child.material.roughness, .3)
      }
      textureSlots.forEach((slot) => {
        const texture = child.material[slot]
        if (!texture) return
        texture.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy())
        texture.needsUpdate = true
      })
    })

    const bounds = new THREE.Box3().setFromObject(clone)
    const size = bounds.getSize(new THREE.Vector3())
    const center = bounds.getCenter(new THREE.Vector3())
    const scale = targetSize / Math.max(size.x, size.y, size.z)

    clone.scale.setScalar(scale)
    clone.position.copy(center.multiplyScalar(-scale))
    return clone
  }, [gl, scene, targetSize])

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const time = clock.elapsedTime
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      Math.sin(time * .72) * .1,
      3,
      delta,
    )
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -.48 + Math.sin(time * .42) * .035,
      3,
      delta,
    )
  })

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0, -.48, 0]}>
      <primitive object={model} />
    </group>
  )
}

function FrameLoopController({ active }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    invalidate()
  }, [active, invalidate])

  useFrame(() => {
    if (active) invalidate()
  })

  return null
}

export default function EducationTeaScene({ active }) {
  return (
    <Canvas
      className={`education-tea-canvas${active ? ' is-active' : ''}`}
      aria-label="Service à thé marocain en 3D"
      frameloop="demand"
      dpr={1.5}
      orthographic
      camera={{ position: [0, 0, 10], zoom: 76, near: .1, far: 100 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMappingExposure = 1.08
      }}
    >
      <FrameLoopController active={active} />
      <ambientLight intensity={1.85} />
      <hemisphereLight args={['#fffaf0', '#7b4422', 1.4]} />
      <directionalLight position={[-4, 7, 8]} intensity={5.2} color="#fff0c7" />
      <pointLight position={[3, 1, 6]} intensity={23} distance={14} color="#ffd39a" />
      <Suspense fallback={null}>
        <TeaModel />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(TEA_MODEL)

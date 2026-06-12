import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_ROOT = '/3D_glb_optimized'
const EMERALD_FILE = `${MODEL_ROOT}/Sims_emrauld.glb`

const traits = [
  { id: 'amicale', file: `${MODEL_ROOT}/amicale.glb`, position: [1.05, 3.2, 0], size: 2.45, phase: .3 },
  { id: 'dynamique', file: `${MODEL_ROOT}/dynamique.glb`, position: [0, 1.6, .1], size: 2.4, phase: 1.4 },
  { id: 'drole', file: `${MODEL_ROOT}/drole.glb`, position: [-.8, -.05, .15], size: 2.4, phase: 2.2 },
  { id: 'creative', file: `${MODEL_ROOT}/creative.glb`, position: [-.5, -1.7, .1], size: 2.4, phase: 3.1 },
  { id: 'proactive', file: `${MODEL_ROOT}/proactive.glb`, position: [0, -3.3, .1], size: 2.45, phase: 4.2 },
]

const textureSlots = [
  'map',
  'normalMap',
  'roughnessMap',
  'metalnessMap',
  'emissiveMap',
  'aoMap',
  'alphaMap',
]

function normalizedClone(scene, targetSize) {
  const clone = scene.clone(true)
  clone.traverse((child) => {
    if (!child.isMesh) return
    if (!child.material) return
    child.material = child.material.clone()
    child.material.envMapIntensity = 1.35
    textureSlots.forEach((slot) => {
      const texture = child.material[slot]
      if (!texture) return
      texture.anisotropy = 8
      texture.needsUpdate = true
    })
  })

  const box = new THREE.Box3().setFromObject(clone)
  const dimensions = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const scale = targetSize / Math.max(dimensions.x, dimensions.y, dimensions.z, .001)
  clone.scale.setScalar(scale)
  clone.position.copy(center.multiplyScalar(-scale))
  return clone
}

function TraitModel({ trait, position, active, onSelect }) {
  const group = useRef(null)
  const model = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { scene } = useGLTF(trait.file)
  const object = useMemo(() => normalizedClone(scene, trait.size), [scene, trait.size])

  useFrame(({ clock }, delta) => {
    if (!group.current || !model.current) return
    const time = clock.elapsedTime + trait.phase
    const energized = hovered || active
    const amplitude = energized ? .28 : .11

    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      position[1] + Math.sin(time * (energized ? 1.8 : .9)) * amplitude,
      5,
      delta,
    )
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      position[0] + Math.cos(time * .62) * (energized ? .08 : .025),
      5,
      delta,
    )

    const scale = THREE.MathUtils.damp(group.current.scale.x, energized ? 1.24 : 1, 7, delta)
    group.current.scale.setScalar(scale)
    model.current.rotation.y = THREE.MathUtils.damp(
      model.current.rotation.y,
      Math.sin(time * (energized ? 1.35 : .45)) * (energized ? .42 : .1),
      6,
      delta,
    )
    model.current.rotation.x = Math.sin(time * .75) * (energized ? .13 : .04)
    model.current.rotation.z = Math.cos(time * .55) * (energized ? .11 : .035)
  })

  return (
    <group
      ref={group}
      position={position}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(trait.id)
      }}
      onPointerEnter={(event) => {
        event.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setHovered(false)
        document.body.style.cursor = ''
      }}
    >
      <group ref={model}>
        <primitive object={object} />
        <mesh>
          <sphereGeometry args={[.72, 12, 12]} />
          <meshBasicMaterial transparent opacity={.001} depthWrite={false} colorWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

function Emerald({ mobile }) {
  const group = useRef(null)
  const { scene } = useGLTF(EMERALD_FILE)
  const emerald = useMemo(() => normalizedClone(scene, 1.65), [scene])

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 1.1
    group.current.rotation.z = Math.sin(clock.elapsedTime * .85) * .08
    group.current.position.y = (mobile ? 3.55 : 5.05) + Math.sin(clock.elapsedTime * 1.55) * .14
  })

  return (
    <group ref={group} position={[mobile ? 1.35 : 5.6, mobile ? 3.55 : 5.05, .2]}>
      <primitive object={emerald} />
    </group>
  )
}

function CursorLight() {
  const light = useRef(null)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.damp(light.current.position.x, pointer.x * 7, 4, delta)
    light.current.position.y = THREE.MathUtils.damp(light.current.position.y, pointer.y * 4, 4, delta)
  })

  return <pointLight ref={light} position={[0, 2, 7]} intensity={18} distance={18} decay={1.8} color="#fff0df" />
}

function Scene({ selected, onSelect }) {
  const { size } = useThree()
  const mobile = size.width < 760

  return (
    <>
      <ambientLight intensity={1.4} />
      <hemisphereLight args={['#fff8ed', '#350008', 1.5]} />
      <directionalLight position={[-4, 8, 8]} intensity={3.4} color="#fff3df" />
      <spotLight position={[5, 7, 6]} angle={.55} penumbra={.8} intensity={18} color="#ffcfca" />
      <CursorLight />
      {traits.map((trait) => (
        <TraitModel
          key={trait.id}
          trait={trait}
          position={mobile
            ? [-1.15, 2.55 - traits.indexOf(trait) * 1.35, trait.position[2]]
            : trait.position}
          active={selected === trait.id}
          onSelect={onSelect}
        />
      ))}
      <Emerald mobile={mobile} />
    </>
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

export default function SimsAboutScene({ active, selected, onSelect }) {
  return (
    <Canvas
      className={`sims-canvas${active ? ' is-active' : ''}`}
      aria-label="Qualités de Kawtar en objets 3D interactifs"
      frameloop="demand"
      dpr={1.5}
      orthographic
      camera={{ position: [0, 0, 12], zoom: 72, near: .1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMappingExposure = 1.05
      }}
      onPointerMissed={() => onSelect(null)}
    >
      <FrameLoopController active={active} />
      <Scene selected={selected} onSelect={onSelect} />
    </Canvas>
  )
}

traits.forEach((trait) => useGLTF.preload(trait.file))
useGLTF.preload(EMERALD_FILE)

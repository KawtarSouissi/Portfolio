import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_ROOT = '/3D_glb_optimized'

const items = [
  { id: 'naklo', file: `${MODEL_ROOT}/cage_stabilisateur_flash.glb`, position: [-5.35, 3, 0], size: 2.85, rotationZ: -.04, hitbox: [3.2, 2.2, 1.2] },
  { id: 'riwaya', file: `${MODEL_ROOT}/DJI_gimbal_stabilisateur.glb`, position: [-.15, 3.9, .2], size: 2.45, rotationZ: -.28, hitbox: [1.8, 3, 1.2] },
  { id: 'marvelous', file: `${MODEL_ROOT}/LED_flashlight.glb`, position: [5.5, 3.2, .1], size: 1.82, rotationZ: -.18, hitbox: [2.2, 2.2, 1.2] },
  { id: 'voice', file: `${MODEL_ROOT}/microphone_rod.glb`, position: [-6, -.89, .15], size: 2.25, rotationZ: .03, hitbox: [2.8, 2, 1.2] },
  { id: 'agency', file: `${MODEL_ROOT}/batterie_externe.glb`, position: [6.5, -.9, .1], size: 1.9, rotationZ: -.17, hitbox: [2.2, 2.8, 1.2] },
  { id: 'gloss', file: `${MODEL_ROOT}/makeup1.glb`, position: [-1.8, -.8, .35], size: 1, rotationZ: -.25, hitbox: [1.25, 1.5, 1] },
  { id: 'blush', file: `${MODEL_ROOT}/makeup2.glb`, position: [1.85, .1, .35], size: 2, rotationZ: -.50, hitbox: [1.45, 1.45, 1] },
]

const softwareItems = [
  { id: 'capcut', file: `${MODEL_ROOT}/capcut.glb`, position: [-3.85, 3.95, .5], size: .82, rotationZ: .18, hitbox: [1.15, 1.15, .8] },
  { id: 'photopea', file: `${MODEL_ROOT}/photopea.glb`, position: [3.55, 3.9, .5], size: .78, rotationZ: -.12, hitbox: [1.1, 1.1, .8] },
  { id: 'instagram', file: `${MODEL_ROOT}/instagram.glb`, position: [1.85, 2.05, .5], size: .8, rotationZ: -.08, hitbox: [1.1, 1.1, .8] },
  { id: 'notion', file: `${MODEL_ROOT}/notion.glb`, position: [-3.15, 1.15, .5], size: .82, rotationZ: -.18, hitbox: [1.1, 1.1, .8] },
  { id: 'tiktok', file: `${MODEL_ROOT}/tiktok.glb`, position: [-7.15, .75, .45], size: .82, rotationZ: .08, hitbox: [1.15, 1.15, .8] },
  { id: 'captions', file: `${MODEL_ROOT}/captions.glb`, position: [6.8, 1.15, .5], size: .78, rotationZ: .12, hitbox: [1.1, 1.1, .8] },
  { id: 'canva', file: `${MODEL_ROOT}/canva.glb`, position: [4.15, -1.65, .45], size: .84, rotationZ: -.08, hitbox: [1.15, 1.15, .8] },
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

function NormalizedModel({ file, size, tone = 1 }) {
  const { scene } = useGLTF(file)
  const normalized = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((child) => {
      if (!child.isMesh) return
      if (child.material) {
        child.material = child.material.clone()
        child.material.envMapIntensity = 1.1
        if (child.material.color) child.material.color.multiplyScalar(tone)
        textureSlots.forEach((slot) => {
          const texture = child.material[slot]
          if (!texture) return
          texture.anisotropy = 8
          texture.needsUpdate = true
        })
      }
    })

    const box = new THREE.Box3().setFromObject(clone)
    const dimensions = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = size / Math.max(dimensions.x, dimensions.y, dimensions.z)

    clone.scale.setScalar(scale)
    clone.position.copy(center.multiplyScalar(-scale))
    return clone
  }, [scene, size, tone])

  return <primitive object={normalized} />
}

function FloatingItem({ item, selected, onSelect, mobile }) {
  const group = useRef(null)
  const model = useRef(null)
  const [hovered, setHovered] = useState(false)
  const { pointer } = useThree()
  const position = mobile
    ? [item.position[0] * .56, item.position[1] * .78 - .3, item.position[2]]
    : item.position

  useFrame(({ clock }, delta) => {
    if (!group.current || !model.current) return

    const time = clock.elapsedTime
    const phase = item.position[0] * .43 + item.position[1] * .19
    const floatAmplitude = mobile ? .06 : hovered ? .3 : .11
    const floatSpeed = hovered ? 1.85 : .85
    const targetX = position[0] + Math.sin(time * .47 + phase) * .035 + pointer.x * .13 * Number(hovered)
    const targetY = position[1] + Math.sin(time * floatSpeed + phase) * floatAmplitude + Math.cos(time * .53 + phase) * .035

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, hovered ? 6 : 3, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, hovered ? 6 : 3, delta)

    const targetScale = hovered ? 1.17 : selected === item.id ? 1.08 : 1
    const nextScale = THREE.MathUtils.damp(group.current.scale.x, targetScale, 7, delta)
    group.current.scale.setScalar(nextScale)

    model.current.rotation.y = THREE.MathUtils.damp(
      model.current.rotation.y,
      Math.sin(time * (hovered ? 1.35 : .48) + phase) * (hovered ? .34 : .11),
      5,
      delta,
    )
    model.current.rotation.x = THREE.MathUtils.damp(
      model.current.rotation.x,
      Math.cos(time * (hovered ? 1.1 : .4) + phase) * (hovered ? .11 : .035),
      5,
      delta,
    )
  })

  return (
    <group
      ref={group}
      position={position}
      rotation={[0, 0, item.rotationZ || 0]}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(item.id)
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
        <NormalizedModel file={item.file} size={item.size * (mobile ? .76 : 1)} />
        <mesh>
          <boxGeometry args={item.hitbox} />
          <meshBasicMaterial transparent opacity={.001} depthWrite={false} colorWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

function CursorLight() {
  const light = useRef(null)
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.damp(light.current.position.x, pointer.x * 7, 5, delta)
    light.current.position.y = THREE.MathUtils.damp(light.current.position.y, pointer.y * 4.5, 5, delta)
  })

  return <pointLight ref={light} position={[0, 1.5, 6]} intensity={22} distance={18} decay={1.7} color="#ffe8d5" />
}

function BagModel({ mobile }) {
  const group = useRef(null)
  const baseY = mobile ? -4.15 : -4.05

  useFrame(({ clock }, delta) => {
    if (!group.current) return

    const time = clock.elapsedTime
    const cycle = time % 7.2
    const shake = cycle < 1.25
      ? Math.sin((cycle / 1.25) * Math.PI) * Math.exp(-cycle * .45)
      : 0
    const targetRotationZ = Math.sin(time * 15) * .022 * shake + Math.sin(time * .42) * .004
    const targetY = baseY + Math.abs(Math.sin(time * 12)) * .055 * shake + Math.sin(time * .55) * .018

    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotationZ, 8, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(time * .28) * .035, 3, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 6, delta)
  })

  return (
    <group ref={group} position={[0, baseY, -.35]}>
      <NormalizedModel file={`${MODEL_ROOT}/burgundy sac a main.glb`} size={mobile ? 6.2 : 8.45} tone={.62} />
    </group>
  )
}

function Scene({ selected, onSelect }) {
  const { size } = useThree()
  const mobile = size.width < 760

  return (
    <>
      <ambientLight intensity={1.25} />
      <hemisphereLight args={['#fff8ed', '#4d0710', 1.15]} />
      <directionalLight position={[-5, 8, 10]} intensity={3.2} color="#fff4df" />
      <CursorLight />
      <spotLight position={[0, 8, 8]} angle={.55} penumbra={.7} intensity={25} color="#ffffff" />

      <group scale={mobile ? .92 : 1}>
        {items.map((item) => (
          <Suspense fallback={null} key={item.id}>
            <FloatingItem item={item} mobile={mobile} selected={selected} onSelect={onSelect} />
          </Suspense>
        ))}
        {softwareItems.map((item) => (
          <Suspense fallback={null} key={item.id}>
            <FloatingItem item={item} mobile={mobile} selected={selected} onSelect={onSelect} />
          </Suspense>
        ))}
        <Suspense fallback={null}>
          <BagModel mobile={mobile} />
        </Suspense>
      </group>

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

export default function AboutScene({ active, selected, onSelect }) {
  return (
    <Canvas
      className={`bag-canvas${active ? ' is-active' : ''}`}
      aria-label="Objets 3D du sac de créatrice de contenu de Kawtar"
      frameloop="demand"
      dpr={1.5}
      orthographic
      camera={{ position: [0, 0, 12], zoom: 82, near: .1, far: 100 }}
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

items.forEach((item) => useGLTF.preload(item.file))
softwareItems.forEach((item) => useGLTF.preload(item.file))
useGLTF.preload(`${MODEL_ROOT}/burgundy sac a main.glb`)

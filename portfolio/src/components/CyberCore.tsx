import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Port of the Stitch "Interactive 3D Cyber Core" scene, with drag-to-rotate,
// off-screen pausing, reduced-motion support and full cleanup on unmount.
export default function CyberCore() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.touchAction = 'pan-y'
    renderer.domElement.style.cursor = 'grab'
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 1.2))
    const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 50, 0)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2.5, 50, 0)
    pointLight2.position.set(-5, -5, 3)
    scene.add(pointLight2)

    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    const coreMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 2),
      new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
        emissive: 0x003344,
        shininess: 80,
      }),
    )
    rootGroup.add(coreMesh)

    const innerMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        emissive: 0x3b0764,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
      }),
    )
    rootGroup.add(innerMesh)

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5 }),
    )
    ring1.rotation.x = Math.PI / 3
    rootGroup.add(ring1)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.02, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.4 }),
    )
    ring2.rotation.y = Math.PI / 4
    rootGroup.add(ring2)

    const nodeGeom = new THREE.BoxGeometry(0.12, 0.12, 0.12)
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const node = new THREE.Mesh(nodeGeom, nodeMat)
      node.position.set(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0)
      ring1.add(node)
    }

    const particleCount = 280
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10
    }
    const particleGeom = new THREE.BufferGeometry()
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeom,
      new THREE.PointsMaterial({ size: 0.05, color: 0x00f0ff, transparent: true, opacity: 0.6 }),
    )
    scene.add(particles)

    // Interaction: gentle mouse parallax plus drag-to-rotate with inertia.
    let parallaxX = 0
    let parallaxY = 0
    let smoothX = 0
    let smoothY = 0
    let dragX = 0
    let dragY = 0
    let velocityX = 0
    let velocityY = 0
    let dragging = false
    let lastX = 0
    let lastY = 0

    const onMouseMove = (e: MouseEvent) => {
      parallaxX = (e.clientX - window.innerWidth / 2) * 0.0008
      parallaxY = (e.clientY - window.innerHeight / 2) * 0.0008
    }
    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      renderer.domElement.setPointerCapture(e.pointerId)
      renderer.domElement.style.cursor = 'grabbing'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      velocityX = (e.clientX - lastX) * 0.008
      velocityY = (e.clientY - lastY) * 0.008
      dragX += velocityX
      dragY += velocityY
      lastX = e.clientX
      lastY = e.clientY
      if (reducedMotion) renderer.render(scene, camera)
    }
    const onPointerUp = () => {
      dragging = false
      renderer.domElement.style.cursor = 'grab'
    }

    window.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerup', onPointerUp)
    renderer.domElement.addEventListener('pointercancel', onPointerUp)

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.render(scene, camera)
    })
    resizeObserver.observe(container)

    const timer = new THREE.Timer()
    let frame = 0
    let visible = true

    const animate = (timestamp?: number) => {
      frame = requestAnimationFrame(animate)
      if (!visible) return
      timer.update(timestamp)
      const t = timer.getElapsed()

      coreMesh.rotation.y = t * 0.25
      coreMesh.rotation.x = t * 0.15
      innerMesh.rotation.y = -t * 0.45
      innerMesh.rotation.z = t * 0.3
      const pulse = 1 + Math.sin(t * 2.5) * 0.08
      innerMesh.scale.setScalar(pulse)
      ring1.rotation.z = t * 0.35
      ring2.rotation.x = t * 0.25
      ring2.rotation.y = t * 0.2
      particles.rotation.y = t * 0.04

      if (!dragging) {
        dragX += velocityX
        dragY += velocityY
        velocityX *= 0.94
        velocityY *= 0.94
      }
      smoothX += (parallaxX - smoothX) * 0.05
      smoothY += (parallaxY - smoothY) * 0.05
      rootGroup.rotation.y = smoothX * 1.5 + t * 0.1 + dragX
      rootGroup.rotation.x = smoothY * 1.5 + dragY

      renderer.render(scene, camera)
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibilityObserver.observe(container)

    if (reducedMotion) {
      rootGroup.rotation.set(0.3, 0.4, 0)
      renderer.render(scene, camera)
    } else {
      animate()
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose()
          ;(obj.material as THREE.Material).dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Background3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Create floating stars
    const starsGeometry = new THREE.BufferGeometry()
    const starCount = 500
    const positions = []
    for (let i = 0; i < starCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      )
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Create floating planets
    const planets = []
    const planetColors = [0xFF6B6B, 0x4ECDC4, 0xFFD700, 0xDDA0DD, 0x45B7D1]
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 2 + 1, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: planetColors[i],
        roughness: 0.7,
      })
      const planet = new THREE.Mesh(geometry, material)
      planet.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20 - 10
      )
      scene.add(planet)
      planets.push(planet)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 30

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.y += 0.0005
      stars.rotation.x += 0.0002
      planets.forEach((planet, i) => {
        planet.rotation.y += 0.005 * (i + 1)
        planet.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01
      })
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current && mountRef.current.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

export default Background3D
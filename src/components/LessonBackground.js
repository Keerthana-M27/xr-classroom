import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function LessonBackground({ lesson }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const objects = []

    // MATH LESSONS
    if (lesson === 'Addition' || lesson === 'Subtraction' || lesson === 'Multiplication' || lesson === 'Division') {
      // Floating numbers as 3D spheres with colors
      const colors = [0xFF6B6B, 0x4ECDC4, 0xFFD700, 0x96CEB4, 0x45B7D1]
      for (let i = 0; i < 20; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
        const material = new THREE.MeshStandardMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          roughness: 0.5
        })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - 5
        )
        sphere.userData = { speedY: (Math.random() - 0.5) * 0.02, speedX: (Math.random() - 0.5) * 0.02 }
        scene.add(sphere)
        objects.push(sphere)
      }
    }

    // SOLAR SYSTEM
    else if (lesson === 'Solar System') {
      // Sun
      const sunGeometry = new THREE.SphereGeometry(3, 32, 32)
      const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.5 })
      const sun = new THREE.Mesh(sunGeometry, sunMaterial)
      sun.position.set(-10, 0, -10)
      scene.add(sun)
      objects.push(sun)

      // Planets
      const planetColors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0x96CEB4, 0xDDA0DD, 0xFF9F43, 0x6C5CE7, 0x00B894]
      const planetSizes = [0.3, 0.5, 0.6, 0.4, 1.2, 1.0, 0.8, 0.7]
      for (let i = 0; i < 8; i++) {
        const geometry = new THREE.SphereGeometry(planetSizes[i], 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: planetColors[i], roughness: 0.7 })
        const planet = new THREE.Mesh(geometry, material)
        planet.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        planet.userData = { speed: Math.random() * 0.01 + 0.005, angle: Math.random() * Math.PI * 2 }
        scene.add(planet)
        objects.push(planet)
      }

      // Stars
      const starsGeometry = new THREE.BufferGeometry()
      const positions = []
      for (let i = 0; i < 500; i++) {
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
      objects.push(stars)
    }

    // ANIMALS
    else if (lesson === 'Animals') {
      // Floating green jungle spheres and trees
      const colors = [0x2ECC71, 0x27AE60, 0x1ABC9C, 0xF39C12, 0xE74C3C]
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.5, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.8 })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        sphere.userData = { speedY: (Math.random() - 0.5) * 0.02 }
        scene.add(sphere)
        objects.push(sphere)
      }
    }

    // PLANTS
    else if (lesson === 'Plants') {
      // Floating leaves and flowers
      const colors = [0x2ECC71, 0x27AE60, 0x1ABC9C, 0xF1C40F, 0xFF6B6B]
      for (let i = 0; i < 20; i++) {
        const geometry = i % 3 === 0
          ? new THREE.TorusGeometry(0.5, 0.2, 16, 100)
          : new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.6 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        mesh.userData = { speedY: (Math.random() - 0.5) * 0.02, speedR: Math.random() * 0.02 }
        scene.add(mesh)
        objects.push(mesh)
      }
    }

    // HUMAN BODY
    else if (lesson === 'Human Body' || lesson === 'Body Parts') {
      // Floating hearts and circles
      const colors = [0xFF6B6B, 0xFF8E8E, 0xFFB3B3, 0xFF4757, 0xEE5A24]
      for (let i = 0; i < 15; i++) {
        const geometry = i % 2 === 0
          ? new THREE.TorusGeometry(0.6, 0.3, 16, 100)
          : new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.5 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        mesh.userData = { speedY: (Math.random() - 0.5) * 0.02, speedR: Math.random() * 0.02 }
        scene.add(mesh)
        objects.push(mesh)
      }
    }

    // ALPHABETS & SPELLINGS & GRAMMAR & STORIES
    else if (['Alphabets', 'Spellings', 'Grammar', 'Stories'].includes(lesson)) {
      // Floating colorful cubes like letter blocks
      const colors = [0xFF6B6B, 0x4ECDC4, 0xFFD700, 0x96CEB4, 0x45B7D1, 0xDDA0DD]
      for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BoxGeometry(
          Math.random() * 1.5 + 0.5,
          Math.random() * 1.5 + 0.5,
          Math.random() * 1.5 + 0.5
        )
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.5 })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        cube.userData = { speedY: (Math.random() - 0.5) * 0.02, speedR: Math.random() * 0.02 }
        scene.add(cube)
        objects.push(cube)
      }
    }

    // COMPUTERS
    else if (['What is Computer', 'Keyboard & Mouse', 'Paint & Draw', 'Fun Games'].includes(lesson)) {
      // Floating cubes like pixels and screens
      const colors = [0x0984E3, 0x6C5CE7, 0x00CEC9, 0xFDCB6E, 0x74B9FF]
      for (let i = 0; i < 20; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 0.2)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.3 })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        cube.userData = { speedY: (Math.random() - 0.5) * 0.02, speedR: Math.random() * 0.01 }
        scene.add(cube)
        objects.push(cube)
      }
    }

    // GEOGRAPHY
    else if (['Continents', 'Oceans', 'Mountains', 'Countries'].includes(lesson)) {
      // Rotating globe like sphere with blue green colors
      const globeGeometry = new THREE.SphereGeometry(4, 32, 32)
      const globeMaterial = new THREE.MeshStandardMaterial({ color: 0x0984E3, roughness: 0.8 })
      const globe = new THREE.Mesh(globeGeometry, globeMaterial)
      globe.position.set(0, 0, -15)
      scene.add(globe)
      objects.push(globe)

      // Floating clouds
      const colors = [0xDFE6E9, 0xB2BEC3, 0x74B9FF, 0x2ECC71]
      for (let i = 0; i < 10; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.5, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.9 })
        const cloud = new THREE.Mesh(geometry, material)
        cloud.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        cloud.userData = { speedX: (Math.random() - 0.5) * 0.02 }
        scene.add(cloud)
        objects.push(cloud)
      }
    }

    // ART
    else if (['Drawing', 'Colours', 'Craft', 'Sculpture'].includes(lesson)) {
      // Floating colorful paint splash shapes
      const colors = [0xFF6B6B, 0x4ECDC4, 0xFFD700, 0x96CEB4, 0x45B7D1, 0xDDA0DD, 0xFF9F43, 0x6C5CE7]
      for (let i = 0; i < 25; i++) {
        const shapes = [
          new THREE.SphereGeometry(Math.random() * 0.8 + 0.2, 32, 32),
          new THREE.TorusGeometry(0.5, 0.2, 16, 100),
          new THREE.OctahedronGeometry(Math.random() * 0.8 + 0.3),
        ]
        const geometry = shapes[Math.floor(Math.random() * shapes.length)]
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.4 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        mesh.userData = { speedY: (Math.random() - 0.5) * 0.02, speedR: Math.random() * 0.03 }
        scene.add(mesh)
        objects.push(mesh)
      }
    }

    // HEALTH & BODY
    else if (['Healthy Food', 'Exercise', 'Hygiene', 'Body Parts'].includes(lesson)) {
      // Floating vegetables and fruits shapes
      const colors = [0x2ECC71, 0xE74C3C, 0xF39C12, 0x9B59B6, 0x1ABC9C, 0xFF6B6B]
      for (let i = 0; i < 20; i++) {
        const geometry = i % 2 === 0
          ? new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
          : new THREE.CylinderGeometry(0.3, 0.5, Math.random() * 1.5 + 0.5, 32)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.6 })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        mesh.userData = { speedY: (Math.random() - 0.5) * 0.02, speedR: Math.random() * 0.02 }
        scene.add(mesh)
        objects.push(mesh)
      }
    }

    // DEFAULT
    else {
      const colors = [0xFF6B6B, 0x4ECDC4, 0xFFD700, 0x96CEB4, 0x45B7D1]
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.3, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)] })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        )
        sphere.userData = { speedY: (Math.random() - 0.5) * 0.02 }
        scene.add(sphere)
        objects.push(sphere)
      }
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 30

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      objects.forEach((obj) => {
        if (obj.userData.speedY) obj.position.y += Math.sin(Date.now() * 0.001) * 0.01
        if (obj.userData.speedX) obj.position.x += obj.userData.speedX
        if (obj.userData.speedR) obj.rotation.y += obj.userData.speedR
        if (obj.userData.speed) {
          obj.userData.angle += obj.userData.speed
          obj.position.x += Math.cos(obj.userData.angle) * 0.02
        }
        obj.rotation.x += 0.005
        obj.rotation.y += 0.005
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
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [lesson])

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

export default LessonBackground
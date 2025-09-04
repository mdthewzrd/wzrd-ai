"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Node class
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.vx = Math.random() * 0.3 - 0.15
        this.vy = Math.random() * 0.3 - 0.15
        this.radius = Math.random() * 2 + 1
        this.color = `rgba(76, 217, 100, ${Math.random() * 0.5 + 0.2})`
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        if (!canvas) return
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
    }

    // Create nodes
    const nodeCount = Math.floor((canvas.width * canvas.height) / 10000)
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    // Draw connections between nodes
    function drawConnections() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update()
        nodes[i].draw()

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            const opacity = 1 - distance / 100
            ctx.strokeStyle = `rgba(76, 217, 100, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    let animationId: number
    function animate() {
      drawConnections()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
}

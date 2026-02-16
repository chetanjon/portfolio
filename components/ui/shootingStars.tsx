"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  distance: number
}

export interface ShootingStarsProps {
  className?: string
  children?: React.ReactNode
  /** Minimum star speed */
  minSpeed?: number
  /** Maximum star speed */
  maxSpeed?: number
  /** Minimum delay between stars (ms) */
  minDelay?: number
  /** Maximum delay between stars (ms) */
  maxDelay?: number
  /** Color of the star head */
  starColor?: string
  /** Color of the gradient trail */
  trailColor?: string
  /** Width of the star */
  starWidth?: number
  /** Height of the star */
  starHeight?: number
}

export function ShootingStars({
  className,
  children,
  minSpeed = 5,
  maxSpeed = 15,
  minDelay = 1500,
  maxDelay = 4000,
  starColor = "#FFFFFF",
  trailColor = "#e0e0e0",
  starWidth = 12,
  starHeight = 2,
}: ShootingStarsProps) {
  const [stars, setStars] = useState<ShootingStar[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Pattern of 5: 3 bottom-left (true) and 2 random (false), not consecutive.
  // Index: 0  1    2   3    4
  // Value: T  F    T   F    T
  const spawnPattern = useRef<boolean[]>([true, false, true, false, true])
  const patternIndexRef = useRef(0)

  const getRandomStartPoint = useCallback(
    (forceBottomLeft: boolean) => {
      const container = containerRef.current
      if (!container) return { x: 0, y: 0, angle: 45 }

      if (forceBottomLeft) {
        // Bottom-left region: tweak for more or less spread if you want
        return {
          x: Math.random() * 80,          // 0–80 near left
          y: 900 + Math.random() * 100,   // 900–1000 near bottom
          angle: 315,                     // up-right
        }
      }

      // Original random-edge logic
      const side = Math.floor(Math.random() * 4)

      switch (side) {
        case 0: // Top edge
          return { x: Math.random() * 1000, y: 0, angle: 45 }
        case 1: // Right edge
          return { x: 1000, y: Math.random() * 1000, angle: 135 }
        case 2: // Bottom edge
          return { x: Math.random() * 1000, y: 1000, angle: 225 }
        case 3: // Left edge
          return { x: 0, y: Math.random() * 1000, angle: 315 }
        default:
          return { x: 0, y: 0, angle: 45 }
      }
    },
    []
  )

  const createStar = useCallback(() => {
    // Decide from pattern: true => bottom-left, false => random
    const pattern = spawnPattern.current
    const idx = patternIndexRef.current
    const forceBottomLeft = pattern[idx]

    // Advance pattern index for next star
    patternIndexRef.current = (idx + 1) % pattern.length

    const { x, y, angle } = getRandomStartPoint(forceBottomLeft)

    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
    }

    setStars(prev => [...prev, newStar])

    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
    timeoutRef.current = setTimeout(createStar, randomDelay)
  }, [getRandomStartPoint, minSpeed, maxSpeed, minDelay, maxDelay])

  useEffect(() => {
    // Start spawning stars after mount
    const initialDelay = setTimeout(createStar, 100)

    return () => {
      clearTimeout(initialDelay)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [createStar])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const moveStars = () => {
      setStars(prevStars =>
        prevStars
          .map(star => {
            const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180)
            const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180)
            const newDistance = star.distance + star.speed
            const newScale = 1 + newDistance / 100

            // Remove if out of bounds (viewBox is 0-1000)
            if (newX < -50 || newX > 1050 || newY < -50 || newY > 1050) {
              return null
            }

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              scale: newScale,
            }
          })
          .filter((star): star is ShootingStar => star !== null)
      )

      animationRef.current = requestAnimationFrame(moveStars)
    }

    animationRef.current = requestAnimationFrame(moveStars)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full relative", className)}
    >
      {/* Blur overlay layer */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ backdropFilter: 'blur(8px)' }} />
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="shooting-star-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={trailColor} stopOpacity={0} />
            <stop offset="100%" stopColor={starColor} stopOpacity={1} />
          </linearGradient>
        </defs>

        {stars.map(star => (
          <rect
            key={star.id}
            fill="url(#shooting-star-gradient)"
            width={starWidth * star.scale}
            height={starHeight}
            x={star.x}
            y={star.y}
            transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
          />
        ))}
      </svg>

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default function ShootingStarsDemo() {
  return <ShootingStars />
}

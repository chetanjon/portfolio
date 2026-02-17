'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother spring configs
  const dotSpringConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const ringSpringConfig = { damping: 25, stiffness: 200, mass: 0.8 };

  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setIsVisible(true);

    // Check what element is under cursor
    const target = e.target as HTMLElement;
    if (target) {
      const computedStyle = window.getComputedStyle(target);
      const isClickable =
        computedStyle.cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null;

      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        computedStyle.cursor === 'text';

      setIsPointer(isClickable);
      setIsHidden(isInput);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Check for touch device
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    if (isTouchDevice) return;

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouchDevice, handleMouseMove]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && !isHidden && (
        <>
          {/* Outer ring - minimal and elegant */}
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isPointer ? 0.8 : 0.4,
              scale: isPointer ? 1.5 : isPressed ? 0.8 : 1,
              width: isPointer ? 48 : 32,
              height: isPointer ? 48 : 32,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div
              className="w-full h-full rounded-full border border-text-primary/30 dark:border-text-primary/40"
              style={{
                backdropFilter: 'blur(1px)',
              }}
            />
          </motion.div>

          {/* Inner dot - precise and responsive */}
          <motion.div
            ref={cursorRef}
            className="fixed pointer-events-none z-[9999]"
            style={{
              x: dotX,
              y: dotY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isPressed ? 0.6 : 1,
              width: isPointer ? 6 : 4,
              height: isPointer ? 6 : 4,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="w-full h-full rounded-full bg-text-primary/80 dark:bg-text-primary/90" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

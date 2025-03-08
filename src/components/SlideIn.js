import React, { useState, useEffect, useRef } from 'react';

/**
 * SlideIn component that animates children when they enter the viewport
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {string} props.direction - Animation direction ('top', 'right', 'bottom', 'left')
 * @param {number} props.duration - Animation duration in milliseconds
 * @param {number} props.delay - Animation delay in milliseconds
 * @param {number} props.distance - Animation distance in pixels
 * @param {string} props.easing - CSS easing function
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {string} props.className - Additional CSS classes
 */
const SlideIn = ({
  children,
  direction = 'bottom',
  duration = 600,
  delay = 0,
  distance = 50,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Get transform value based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'top': return `translateY(-${distance}px)`;
        case 'right': return `translateX(${distance}px)`;
        case 'bottom': return `translateY(${distance}px)`;
        case 'left': return `translateX(-${distance}px)`;
        default: return `translateY(${distance}px)`;
      }
    }
    return 'translate(0, 0)';
  };

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(elementRef.current);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  // Animation styles
  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
    willChange: 'opacity, transform',
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default SlideIn;
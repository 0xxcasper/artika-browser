'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { Flex, Image } from '@chakra-ui/react';
import { ARTWALK_COLLECTION } from '@/constants/artwalk';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SubMenuType } from '@/locales/types';
import { artwalkRouter } from '@/constants/router';
import type { ArtwalkContent } from '@/types/artwalk';

interface HorizontalListProps {
  otherProjects?: ArtwalkContent[];
  currentProjectId?: string;
  title?: string;
}

const HorizontalList: React.FC<HorizontalListProps> = ({ 
  otherProjects, 
  currentProjectId, 
  title = "OTHER PROJECTS" 
}) => {
  const { slug } = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  
  const COLLECTIONS = useMemo(() => {
    // If otherProjects provided, use them
    if (otherProjects && otherProjects.length > 0) {
      return [...otherProjects]
        .filter(project => project.id !== currentProjectId) // Exclude current project
        .map(project => ({
          id: project.id,
          title: project.name,
          material: project.material,
          description: project.subName,
          image: project.thumb || '/images/gallery/collections/glr-1.jpg'
        }));
    }
    
    // Fallback to hardcoded data
    const collections = ARTWALK_COLLECTION?.[slug as SubMenuType]?.collections;
    if (!collections) {
      return [];
    }
    return collections;
  }, [otherProjects, currentProjectId, slug]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsMouseDown(true);
    setIsDragging(false);
    setDragDistance(0);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !containerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    const distance = Math.abs(walk);
    
    setDragDistance(distance);
    containerRef.current.scrollLeft = scrollLeft - walk;
    
    // Set dragging to true if there's significant movement
    if (distance > 10) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // Reset dragging state after a longer delay to prevent immediate clicks
    setTimeout(() => {
      setIsDragging(false);
      setDragDistance(0);
    }, 150);
  };

  const handleItemClick = (collectionId: string) => {
    // Only navigate if not dragging and drag distance is minimal
    if (!isDragging && dragDistance < 5) {
      router.push(artwalkRouter.getDetailRouter({ id: collectionId, slug: slug as string }));
    }
  };

  // Handle wheel scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    containerRef.current.scrollLeft += e.deltaY;
  };

  // Prevent window scroll when scrolling horizontally
  const handleContainerScroll = (e: React.UIEvent) => {
    e.stopPropagation();
  };

  // Prevent wheel events from bubbling up to window - CAPTURE PHASE
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventWheelBubble = (e: WheelEvent) => {
      // Always prevent wheel events on this container
      e.preventDefault();
      e.stopPropagation();
      
      // Handle horizontal scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        container.scrollLeft += e.deltaX;
      } else {
        container.scrollLeft += e.deltaY;
      }
    };

    // Use capture phase to intercept events before they bubble
    container.addEventListener('wheel', preventWheelBubble, { 
      passive: false, 
      capture: true 
    });
    
    return () => {
      container.removeEventListener('wheel', preventWheelBubble, { capture: true });
    };
  }, []);

  if (COLLECTIONS.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {title}
      </motion.h2>
      <div 
        className={styles.scrollWrapper}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div 
          ref={containerRef}
          className={styles.scrollContainer}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onScroll={handleContainerScroll}
        >
          <div className={styles.scrollContent}>
            {COLLECTIONS.map((collection, index) => (
              <motion.div
                className={styles.item}
                key={`${collection.title}-${index}`}
                onClick={() => handleItemClick(collection.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={!isDragging ? { y: -2, opacity: 0.8, transition: { duration: 0.2, ease: "easeOut" } } : {}}
              >
                <Image draggable={false} src={collection.image} alt={collection.title} aspectRatio="376/452" objectFit="cover" />
                <Flex direction="column" mt={{ base: "16px", md: "24px" }} gap="2px">
                  <Flex flexDirection="row" gap="10px" justifyContent="space-between" alignItems="center">
                    <p className={styles.title}>
                      {collection.title}
                    </p>
                    <p className={styles.material}>
                      {collection.material}
                    </p>
                  </Flex>
                  <p className={styles.description}>
                    {collection.description}
                  </p>
                </Flex>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalList;

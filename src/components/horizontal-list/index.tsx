import React from 'react';
import './styles.scss';

const collections = [
  {
    src: '/images/collections/collection-1.jpg',
    title: 'Caravan Agafay | Morocco',
    desc: 'Our Home in the Agafay Desert',
    cta: 'DISCOVER CARAVAN AGAFAY',
  },
  {
    src: '/images/collections/collection-2.jpg',
    title: 'Caravan Dakhla | Morocco',
    desc: 'Our Home of Wind Adventures',
    cta: 'DISCOVER CARAVAN DAKHLA',
  },
  {
    src: '/images/collections/collection-3.jpg',
    title: 'Namibia | Namibia',
    desc: 'Our Home on the Kalahari Savanna',
    cta: 'DISCOVER NAMIBIA',
  },
  {
    src: '/images/collections/collection-4.jpg',
    title: 'San Miguel | Mexico',
    desc: 'Our Home Where Art & Nature Collide',
    cta: 'DISCOVER SAN MIGUEL',
  },
  {
    src: '/images/collections/collection-5.jpg',
    title: 'Tulum | Mexico',
    desc: 'Our Home Where the Jungle Meets the Sea',
    cta: 'DISCOVER TULUM',
  },
  {
    src: '/images/collections/collection-6.jpg',
    title: 'Bacalar | Mexico',
    desc: 'Our Home on the Blue Lagoon',
    cta: 'DISCOVER BACALAR',
  },
  {
    src: '/images/collections/collection-7.jpg',
    title: 'Marrakech | Morocco',
    desc: 'Our Home in the Red City',
    cta: 'DISCOVER MARRAKECH',
  },
];

const HorizontalList: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollRef.current) return;
      if (e.key === 'ArrowRight') {
        scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="horizontal-list-section">
      <h2 className="horizontal-list-title">Our Homes</h2>
      <div className="horizontal-list-scroll" ref={scrollRef} tabIndex={0} aria-label="Our Homes carousel">
        {collections.map((item, idx) => (
          <div className="horizontal-list-item" key={idx}>
            <div className="horizontal-list-image-wrapper">
              <img src={item.src} alt={item.title} className="horizontal-list-image" draggable={false} />
            </div>
            <div className="horizontal-list-info">
              <h3 className="horizontal-list-item-title">{item.title}</h3>
              <p className="horizontal-list-item-desc">{item.desc}</p>
              <button className="horizontal-list-cta">{item.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalList;

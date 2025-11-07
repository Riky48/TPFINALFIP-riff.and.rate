import React from "react";
import { Galleria } from "primereact/galleria";
import './GalleriaFeed.css'

interface GalleriaFeedProps {
  multimedia: { src: string; title?: string }[];
}

export const GalleriaFeed: React.FC<GalleriaFeedProps> = ({ multimedia }) => {
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 6 },
    { breakpoint: "768px", numVisible: 3 },
    { breakpoint: "560px", numVisible: 1 }
  ];

  const itemTemplate = (item: {
    title: string | undefined; src: string 
}) => {
    const ext = item.src.split(".").pop()?.toLowerCase();
    const fullSrc = `http://localhost:3000${item.src}`;

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext ?? "")) {
      return (
        <img
          src={fullSrc}
          alt={item.title}
          className="galleria-img"
          loading="lazy"
        />
      );
    }

    if (["mp4", "webm", "ogg"].includes(ext ?? "")) {
      return (
        <video
          src={fullSrc}
          controls
          className="galleria-video"
        />
      );
    }

    return (
      <a href={fullSrc} target="_blank" rel="noopener noreferrer">
        Descargar archivo ({item.title ?? "archivo"})
      </a>
    );
  };

  

  return (
    <Galleria
      value={multimedia}
      showIndicators={multimedia.length > 1}
      showIndicatorsOnItem
      item={itemTemplate}
    />
  );
};
export default GalleriaFeed;



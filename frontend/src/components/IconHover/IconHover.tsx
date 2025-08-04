import { useState } from "react";

export const IconHover = ({ icon1, icon2, alt = "" , enlace}:{icon1:string,icon2:string,alt:string, enlace:string}) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="a"
    onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
    <img
      src={hover ? icon2 : icon1}
      alt={alt}
      />
      <p>{enlace}</p>
      </div>
     
  );
};

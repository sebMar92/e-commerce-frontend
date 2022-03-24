import React from "react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Slider({ images }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handleClick = (i) => {
    setIndex(i);
  };

  return (
    <div className="">
      <div className="w-full h-[275px] flex justify-between p-2 lg:h-[400px] 2xl:self-center">
        <button className="w-auto h-fit self-center " onClick={prev}>
          <AiOutlineLeft />
        </button>
        <img
          className="object-contain w-9/12 rounded lg:w-full lg:self-center lg:h-full"
          src={
            images && (images[index] || images[index - 1] || images[index + 1])
          }
          alt=""
        />
        <button className="w-auto h-fit self-center " onClick={next}>
          <AiOutlineRight />
        </button>
      </div>
      <div className="flex gap-2 p-2">
        {images &&
          images.map((el) => (
            <button className="h-16 w-16 border-[1px] p-2 border-primary-300 rounded flex items-center justify-center active:border-[3px] focus:border-[3px]">
              <img
                onClick={() => handleClick(images.indexOf(el))}
                src={el}
                alt="X"
                className="object-contain h-full w-full rounded"
              />
            </button>
          ))}
      </div>
    </div>
  );
}

export default Slider;

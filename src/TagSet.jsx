/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";

const TagSet = ({ items }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const itemRefs = useRef(null);
  const containerRef = useRef(null);
  const overflowRef = useRef(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const resizeHandler = () => {
      setContainerWidth(containerRef.current.offsetWidth);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [items]);

  const getMap = () => {
    if (!itemRefs.current) {
      itemRefs.current = new Map();
    }
    return itemRefs.current;
  };

  const itemRefHandler = (id, node) => {
    const map = getMap();
    if (node && !itemRefs.current?.get(id)) {
      map.set(id, node.clientWidth);
    }
  };

  const getVisibleItems = () => {
    if (!itemRefs.current) return items;
    const map = getMap();
    const maxWidth = containerWidth - overflowRef.current.offsetWidth;
    let childrenWidth = 0;
    let maxReached = false;

    return items.reduce((prev, cur) => {
      if (!maxReached) {
        const itemWidth = map.get(cur.id);
        const fits = itemWidth + childrenWidth < maxWidth;
        if (fits) {
          childrenWidth += itemWidth;
          prev.push(cur);
        } else {
          maxReached = true;
        }
      }
      return prev;
    }, []);
  };

  const visibleItems = getVisibleItems();
  const hiddenItems = items.slice(visibleItems.length);
  return (
    <div className="tagset" ref={containerRef}>
      <div className="tagset-items">
        {visibleItems.map((item) => {
          return (
            <div
              className="tag"
              key={item.id}
              ref={(node) => itemRefHandler(item.id, node)}
            >
              {item.text}
            </div>
          );
        })}
      </div>
      <div className="tagset-overflow">
        <div
          className="tag"
          ref={overflowRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hiddenItems.length}
        </div>
        {hover && (
          <div className="tagset-overflow-content">
            <ul>
              {hiddenItems.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSet;

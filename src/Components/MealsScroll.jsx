import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";

const MealsScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 6 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }
    // mimic async call
    setTimeout(() => {
      setItems((prev) => prev.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4 className="text-center font-semibold">Loading...</h4>}
      endMessage={<p>No more items</p>}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-7 w-[90%] md:w-[75%] mt-9 mx-auto">
        {items.map((_, i) => (
          <div key={i}>
            <Card></Card>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MealsScroll;

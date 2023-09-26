import { useEffect, useState } from "react";

const Hot = () => (
  <div className="flex overflow-x-auto hiddenscrollbar">
    <img src="/img/skin/1.png" width={100} alt="" className="mx-1"/>
    <img src="/img/skin/2.png" width={100} alt="" className="mx-1"/>
  </div>
);
const GridList = () => {
  const [lists, setList] = useState([
    {
      aid: "000000",
      nickname: "Lennie",
      skill: ["cute", "Lively", "Silly"],
      price: "1",
      img: "/img/skin/item-1.png",
    },
    {
      aid: "000001",
      nickname: "Lennie",
      skill: ["cute", "Lively", "Silly"],
      price: "1",
      img: "/img/skin/item-2.png",
    },
    {
      aid: "000002",
      nickname: "Lennie",
      skill: ["cute", "Lively", "Silly"],
      price: "1",
      img: "/img/skin/item-3.png",
    },
    {
      aid: "000003",
      nickname: "Lennie",
      skill: ["cute", "Lively", "Silly"],
      price: "1",
      img: "/img/skin/item-4.png",
    },
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {lists.map((item) => (
        <div className="flex-col h-150">
          <div className="grow-2">
            <img src={item.img} style={{ "object-fit": "cover" }} />
          </div>
          <div className="grow-1 flex-col items-start text-left bg-[#6C727E]">
            <div className="ml-2">{item.nickname}</div>
            <div className="flex items-start my-2">
                {
                    item.skill.map(v => <span className="bg-[#fff]" style={{color:'#000',marginLeft:"6px",padding:"0 5px"}}>{v}</span>)
                }
            </div>
            <div className="font-bold text-xl ml-2">{item.price} SOL</div>
          </div>
        </div>
      ))}
    </div>
  );
};
const Martin = () => {
  return (
    <div style={{ margin: "0" }}>
      <div className="flex justify-center font-bold my-4 text-xl">HOT SKIN</div>
      <Hot />
      <div className="flex justify-center font-bold my-4 text-xl">All SKIN</div>
      <GridList />
    </div>
  );
};

export default Martin;

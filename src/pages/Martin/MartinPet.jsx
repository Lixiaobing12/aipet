import { useEffect, useState } from "react"

const Hot = () =>(
    <div className="flex overflow-x-auto hiddenscrollbar">
        <img src="/img/martin/mm.png" width={100}  alt="" />
        <img src="/img/martin/gg.png"  width={100} alt="" />
        <img src="/img/martin/bobo.png" width={100}  alt="" />
        <img src="/img/martin/lala.png"  width={100} alt="" />
    </div>
)
const GridList = () => {
    const [lists,setList] = useState([
        {aid:"000000",nickname:'Lennie',skill:['cute','Lively','Silly'],price:"1",img:"/img/martin/mm.png"},
        {aid:"000001",nickname:'Lennie',skill:['cute','Lively','Silly'],price:"1",img:"/img/martin/gg.png"},
        {aid:"000002",nickname:'Lennie',skill:['cute','Lively','Silly'],price:"1",img:"/img/martin/bobo.png"},
        {aid:"000003",nickname:'Lennie',skill:['cute','Lively','Silly'],price:"1",img:"/img/martin/lala.png"},
    ]);

    return (
        <div className="grid">
            
        </div>
    )
}
const Martin = () =>{

    return <div style={{margin:'0'}}>
        <div className="flex justify-center font-bold">HOT PET</div>
        <Hot/>
        <div className="flex justify-center font-bold">All PET</div>
        <GridList/>
    </div>
}

export default Martin;
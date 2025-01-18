import Image from "next/image"
interface Item{
    h1:string,
    h2:string,
    img:string
}
interface ItemProps{
    item:Item
}
const Usage = ({item}: ItemProps) => {
    const img = "/image1.png"
    return (
        <div className="flex flex-col h-full w-full items-center justify-center gap-4">
            <h1 className="text-2xl font-serif">{item.h1}</h1>
            <h3 className=" font-sans text-ellipsis text-wrap text-center w-1/2 ">{item.h2}</h3>
            <Image src={item.img} height={200} width={200} alt="img1" className="h-1/2 w-1/2 object-contain shadow-2xl shadow-sky-500/50"/>
        </div>
    )
}
export default Usage

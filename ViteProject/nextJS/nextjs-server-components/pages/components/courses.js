export function Courses() {
    const data = ["Understanding React","Understanding HTML","Javascript: The weird parts"];
    return (
        <ul>
            {data.map((c,index)=> <li key={index}>{c}</li>)}
        </ul>
    )
}
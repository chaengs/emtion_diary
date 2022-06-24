import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App"

import MyHeader from "../components/MyHeader"
import MyButton from "../components/MyButton"
import DiaryList from "../components/DiaryList"

const Home = () => {
    const diaryList = useContext(DiaryStateContext)

    //날짜 저장
    const [data, setData] = useState([])
    const [curDate, setCurDate] = useState(new Date())
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

    useEffect(()=>{
        if(diaryList.length >= 1) {
            //매월 1일
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime()

        //매월 말일
        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth()+1,
            0
        ).getTime()

        setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
        }
    },[diaryList,curDate]) //다이어리 전체 목록이나 날짜(curDate)가 바뀌었을 때 useEffect 실행

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
        )
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
        )
    }

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>} 
                rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home
import { useState } from 'react'

const sortOptionList = [
    {value:'latest', name:'최신순'},
    {value:'oldest', name:'오래된순'},
]

//일기 정렬
const ControlMenu = ({value, onChange, optionList}) => {
    return (
        <select value={value} onChange={(e)=>onChange(e.target.value)}>
            {optionList.map((it,idx)=><option key={idx} value={it.value}>{it.name}</option>)}
        </select>
    )
}
const DiaryList = ({diaryList}) => {

    //정렬 기준 state
    const [sortType, setSortType] = useState('latest')
    //최신순, 오래된순에 따라 정렬된 배열을 반환하는 함수
    const getProcessedDiaryList = () => {
        const compare = (a, b) => {
            if(sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date)
            } else {
                return parseInt(a.date) - parseInt(b.date)
            }
        }
        const copyList = JSON.parse(JSON.stringify(diaryList)) //일기 배열 깊은 복사 json->문자열->json
        const sortedList = copyList.sort(compare)
        return sortedList
    }

    return (
        <div>
            <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
            {getProcessedDiaryList().map((it)=>(
                <div key={it.id}>
                    {it.content}
                </div>
            ))}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList
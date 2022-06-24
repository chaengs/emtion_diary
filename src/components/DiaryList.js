import { useState } from 'react'

//날짜순 옵션
const sortOptionList = [
    {value:'latest', name:'최신순'},
    {value:'oldest', name:'오래된순'},
]

//감정순 옵션
const filterOptionList = [
    {value:'all', name:'전부 다'},
    {value:'good', name:'좋은 감정만'}          ,
    {value:'bad', name:'안좋은 감정만'},
]

//일기 정렬 셀렉트 태그 생성 : 날짜순, 감정순
const ControlMenu = ({value, onChange, optionList}) => {
    return (
        <select value={value} onChange={(e)=>onChange(e.target.value)}>
            {optionList.map((it,idx)=><option key={idx} value={it.value}>{it.name}</option>)}
        </select>
    )
}
const DiaryList = ({diaryList}) => {
    //정렬 기준 state
    const [sortType, setSortType] = useState('latest') //날짜순
    const [filter, setFilter] = useState('all') //감정순

    //감정순으로 정렬하는 함수
    const filterCallBack = (item) => {
        if (filter === 'good') {
            return parseInt(item.emotion) <= 3
        } else {
            return parseInt(item.emotion) > 3
        }
    }

    //정렬하는 함수
    const getProcessedDiaryList = () => {
        const compare = (a, b) => { //날짜순 정렬
            if(sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date)
            } else {
                return parseInt(a.date) - parseInt(b.date)
            }
        }
        const copyList = JSON.parse(JSON.stringify(diaryList)) //일기 배열 깊은 복사 json->문자열->json
        const filteredList = filter === 'all' ? copyList : copyList.filter((it)=>filterCallBack(it))
        const sortedList = filteredList.sort(compare)
        return sortedList
    }

    return (
        <div>
            <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList}/>
            <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList}/>
            {getProcessedDiaryList().map((it)=>(
                <div key={it.id}>
                    {it.content} {it.emotion}
                </div>
            ))}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList
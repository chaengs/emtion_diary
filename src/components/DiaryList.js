import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

//날짜순 옵션
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

//감정순 옵션
const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

//일기 정렬 셀렉트 태그 생성 : 날짜순, 감정순
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  //정렬 기준 state
  const [sortType, setSortType] = useState("latest"); //날짜순
  const [filter, setFilter] = useState("all"); //감정순

  //정렬하는 함수
  const getProcessedDiaryList = () => {
    //감정순으로 정렬하는 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (first, second) => {
      //날짜순 정렬
      if (sortType === "latest") {
        return parseInt(second.date) - parseInt(first.date);
      } else {
        return parseInt(first.date) - parseInt(second.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); //일기 배열 깊은 복사 json->문자열->json
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

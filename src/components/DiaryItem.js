const DiaryItem = ({id, emotion, content, date}) => {
    return (
        <div className="DiaryItem">
            <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`]}>
                <img src={process.env.PUBLIC_URL+`assets/emotion${emotion}.png`}></img>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DiaryItem
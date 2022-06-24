import { useSearchParams, useNavigate } from "react-router-dom"

const Edit = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const id = searchParams.get("id")

    return (
        <div>
            <h1>Edit</h1>
            <p>일기 수정 페이지</p>
        </div>
    )
}

export default Edit
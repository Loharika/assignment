import './index.css'

const EachRecord = props => {
    const {data:{id,title,body}}=props
    return (
        <li key={id} className="record-container">
            <div className="record-title">
                <p className="title">Title</p>
            <p >{title}</p>
            </div>
                <div className="record-body" >
                    <p className="description">Description</p>
                <p >{body}</p>
                </div>
            </li>
    )
}
export default EachRecord
import './index.css'

const EachRecord = props => {
    const {data:{id,title,body}}=props
    return (
        <li key={id} className="record-container-list-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT2CbCGvRv4G7u6q8M6M9q_ux-rlW5j59C2stzaJAvkwMEACFQaM8j547WjHoAPaWPUmQ&usqp=CAU" alt="each-img" className="each-card-img"/>
            <div className="record-container">
            <div className="record-title">
                <p className="title">Title</p>
            <p >{title}</p>
            </div>
                <div className="record-body" >
                    <p className="description">Description</p>
                <p >{body}</p>
                </div>
                </div>
            </li>
    )
}
export default EachRecord
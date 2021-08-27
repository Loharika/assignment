import {Component} from 'react'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import EachRecord from '../EachRecord';
import Header from '../Header';
import './index.css'

class Records extends Component{
    state={
        allRecords:[],
        isFailure:false,
        isLoading:true
    }
    componentDidMount(){
        setTimeout(() => {
            this.getRecords()
        }, 2000);
        
    }
    getRecords=()=>{
        const storedRecords=localStorage.getItem("records");
        if(storedRecords!==undefined){
            this.setState({allRecords:JSON.parse(storedRecords),isLoading:false})
        }
        else{
            this.setState({isFailure:true,isLoading:false})
        }
    }
    renderAllRecords=()=>{
        const {allRecords}=this.state
        if(allRecords!==[]){
            return <div className="all-records-container-view">
                <h1 className="all-records-heading">All Records</h1>
                <Link to="/" className="nav-link">
                    <div className="add-file-btn-container"><button
            type="button"
            className="add-file-btn"
          >
            Add File
          </button></div>
                
              </Link>
            <ul className="all-records-container">{allRecords.map(record=><EachRecord key={record.id} data={record} />)}</ul>
            </div>
        }
        else{
            return <div>
                <h1>No Records Found</h1>
            </div>
        }
    }
    renderFailureUI=()=>(
        <div className="error-view-container">
            <h1 className="failure-heading-text">
                Oops! Something Went Wrong
            </h1>
            <p className="failure-description">
                We are having some trouble processing your request. Please try again.
            </p>
        </div>
    )
    renderUI=()=>{
        const {isFailure}=this.state
        if(!isFailure){
            return this.renderAllRecords()
        }
        else{
            return this.renderFailureUI()
        }
    }
    renderLoadingView = () => (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    render(){
        const {isLoading}=this.state
        return (
            <div>
                <Header />
            {isLoading?this.renderLoadingView():
                this.renderUI()
            }
            </div>
        )
    }
}
export default Records
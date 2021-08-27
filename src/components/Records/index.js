import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Pagination from "react-js-pagination";

import { Link } from 'react-router-dom';
import EachRecord from '../EachRecord';
import Header from '../Header';
import './index.css'

class Records extends Component{
    state={
        allRecords:[],
        isFailure:false,
        isLoading:true,
	activePage:1,
	itemsPerPage:5,
	totalPages:0
    }
    componentDidMount(){
        setTimeout(() => {
            this.getRecords()
        }, 2000);
        
    }
handlePageChange=(pageNumber)=> {
    this.setState({activePage: pageNumber});
  }
    getRecords=()=>{
        const storedRecords=localStorage.getItem("records");
        if(storedRecords!==undefined){
            this.setState({allRecords:JSON.parse(storedRecords),isLoading:false,totalPages:JSON.parse(storedRecords).length})
        }
        else{
            this.setState({isFailure:true,isLoading:false})
        }
    }
	getLimitedRecords=()=>{
		const {activePage,itemsPerPage,totalPages,allRecords}=this.state
		const index=itemsPerPage*(activePage-1)
		if(index+(itemsPerPage-1)<=totalPages){
			const endIndex=index+(itemsPerPage-1)
			const currentPageRecords=allRecords.slice(index,endIndex+1)
			return currentPageRecords
		}
		else{
			const currentPageRecords=allRecords.slice(index,totalPages+1)
			return currentPageRecords
		}
	}
    renderAllRecords=()=>{
        const {allRecords,activePage,totalPages,itemsPerPage}=this.state
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
            <ul className="all-records-container">
		{this.getLimitedRecords().map(record=><EachRecord key={record.id} data={record}  />)}
		</ul>
		<div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalPages}
          pageRangeDisplayed={3}
          innerClass={'pagination-ul-container'}
          activeClass={'pagination-active-li'}
          itemClass={'pagination-li'}
          onChange={this.handlePageChange}
        />
      </div>
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

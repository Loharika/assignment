import {Component} from 'react'
import allRecords from '../../getAllRecords.json'
import './index.css'

class FileUploader extends Component {
    state={
        errorText:'Please select JSON files only!',
        showError:false,
        dataFromFile:""
    }

    componentDidMount(){
      const strigifiedData=JSON.stringify(allRecords)
      localStorage.setItem("records",strigifiedData);
    }
    postTheDataFile=()=>{
      const {dataFromFile}=this.state

      const storedRecords=localStorage.getItem("records");
        if(storedRecords!==undefined){
          const parsedData=JSON.parse(storedRecords)
          const updatedData=[...JSON.parse(dataFromFile),...parsedData]
          const strigifiedData=JSON.stringify(updatedData)
          localStorage.setItem("records",strigifiedData);
        }
      this.onSubmitSuccess()
      
    }
    onSubmitSuccess=()=>{
        alert('Successfully Submitted')
    }
    onSubmitFailure=()=>{
      alert("Something went wrong. Please try again!")
    }
    checkTheFile=({ target: { files: [file] } })=> {
        const reader = new FileReader();
        reader.onload = ({ target: { result } }) => {
          if (!this.validateJSON(result)) {
            this.setState({showError:true})
            return;
          }
          this.setState({showError:false,dataFromFile:result})
        }
        reader.readAsText(file);
      };
      validateJSON = data => {
        try { JSON.parse(data); }
        catch { return false; }
        return true;
      }
      onSubmitForm=(event)=>{
          event.preventDefault()
          const {showError}=this.state
          if(!showError){
            this.postTheDataFile()
          }
          else{
            alert("Please Upload .json file")
          }
          
      }
      render(){
        const{showError}=this.state
        return (
            <div className="form-container">
                <form onSubmit={this.onSubmitForm} className="file-upload-form">
                    <h1>Upload The File</h1>
                    <label htmlFor="file" className="file-label">Choose a file:</label><br/>
                    <input type="file" id="file" className="file-input" name="myfile" onChange={this.checkTheFile}/>
                    {showError?<p className="error-text">please check the file you have uploaded </p>:''}
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    
                    
                    
                </form>
            </div>
            
        )
    }
      }
    
export default FileUploader
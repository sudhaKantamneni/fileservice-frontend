import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    searchValue: "",
    fileObject: []
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = `http://localhost:8762/file/FileList?filePath=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ fileObject: jsonData.fileObject });
      });
  };

  render() {
    return (
      <div >
        <h1>Put Folder path below</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Run Method 1</button>
        {this.state.fileObject ? (
          <div >
            {this.state.fileObject.map((fileObject, index) => (
              <div  key={index}>
                <h4># {index+1} - File Path is :{fileObject.fileFullPath}</h4>
                <h4>File Size:{fileObject.fileSize}</h4>
                <h4>File Type:{fileObject.fileType}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p>Try searching for a Folder</p>
        )}

        
      </div>
    );
  }
}

export default App;
import React, { useState } from 'react';
import '../styles/SearchPage.css';

const App = () => {
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const [thirdOption, setThirdOption] = useState('');
  const [fourthOption, setFourthOption] = useState('');
  const [result, setResult] = useState('');
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const [packaged, setPackaged] = useState(['Microsoft 365', 'Office', 'Office in Microsoft 365', 'SQL Server', 'SQL Server 2019 Standard', 'Windows', 'Windows 7', 'Windows Server']);
  const [preInstalled, setPreInstalled] = useState(['Office in Microsoft 365', 'SQL Server', 'Windows', 'Windows 7', 'Windows Server']);
  const [version, setVersion] = useState(['Microsoft 365 Apps', 'Microsoft 365 Business Standard']);
  const [languages, setLanguages] = useState(['Arabic', 'Bulgarian', 'Chinese Simplified', 'Chinese Traditional', 'English', 'French', 'Greek', 'Korean', 'Ukrainian']);

  const languageFiles = {
    English: 'english_file.txt',
    Arabic: 'arabic_file.txt',
    Greek: 'greek_file.txt'
  };

  const handleFirstChange = (event) => {
    const { value } = event.target;
    setFirstOption(value);
    setSecondOption('');
    setThirdOption('');
    setFourthOption('');
  };

  const handleSecondChange = (event) => {
    const { value } = event.target;
    setSecondOption(value);
  };

  const handleThirdChange = (event) => {
    const { value } = event.target;
    setThirdOption(value);
  };

  const handleFourthChange = (event) => {
    const { value } = event.target;
    setFourthOption(value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (languages.includes(searchValue)) {
      setFourthOption(searchValue);
      setSearchResult('');
    } else {
      setSearchResult('No results found');
    }
  };

  const handleGoClick = () => {
    const selectedFile = `${firstOption}/${secondOption}/${thirdOption}/${fourthOption}`;
    setSelectedFile(selectedFile);

    setResult(selectedFile);

    let selectedLanguage = fourthOption && languages.includes(fourthOption) ? fourthOption : "English";

    let helloText;
    switch (selectedLanguage) {
      case "Arabic":
        helloText = "مرحباً جميعاً";
        break;
      case "Bulgarian":
        helloText = "Здравейте на всички";
        break;
      default:
        helloText = "Hello ";
        break;
    }

    const file = languageFiles[selectedLanguage];
    setSearchResult(helloText);
    setSelectedFile(file); 
  };

  const handleFileOpen = () => {
    window.open(selectedFile, '_blank');
    console.log("Open file:", selectedFile);
  };

  return (
    <div className="container">
      <h1 className='heading'>Search Page</h1>
      <div className="dropdown-container">
        <label>How is the software acquired?  * </label>
        <select value={firstOption} onChange={handleFirstChange}>
          <option value="">Select</option>
          <option value="packaged">From a store as packaged software for end-users or from Microsoft directly?</option>
          <option value="preInstalled">Pre-Installed on your computer from the computer manufacturer? </option>
        </select>

        <label>Product Name:</label>
        <select value={secondOption} onChange={handleSecondChange} disabled={!firstOption}>
          <option value="">Select a Product Name</option>
          {firstOption === "packaged" && packaged.map((software, index) => (
            <option key={index} value={software}>{software}</option>
          ))}
          {firstOption === "preInstalled" && preInstalled.map((software, index) => (
            <option key={index} value={software}>{software}</option>
          ))}
        </select>

        <label>Version:</label>
        <select value={thirdOption} onChange={handleThirdChange} disabled={!secondOption}>
          <option value="">Select a Version</option>
          {firstOption === "packaged" && version.map((version, index) => (
            <option key={index} value={version}>{version}</option>
          ))}
          {firstOption === "preInstalled" && version.map((version, index) => (
            <option key={index} value={version}>{version}</option>
          ))}
        </select>

        <label>Language:</label>
        <select value={fourthOption} onChange={handleFourthChange} disabled={!thirdOption}>
          <option value="">Select a Language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>{language}</option>
          ))}
        </select>

        <button onClick={handleGoClick} disabled={!firstOption || !secondOption || !thirdOption}>Go</button>
      </div>

      <div className="search-container">
        <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="Search language" />
        <button onClick={handleSearchClick}>Go</button>
      </div>

      <div className="result">
        {searchResult && searchResult !== 'No results found'
          ? `Result: ${searchResult}`
          : searchResult}
      </div>

      <div className="selected-file">
        {selectedFile && (
          <div>
            <p onClick={handleFileOpen} style={{ cursor: 'pointer' }}>Selected File: {selectedFile}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

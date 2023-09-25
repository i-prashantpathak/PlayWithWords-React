import React, { useState } from "react";
import PropTypes from "prop-types";

let word = 0;

export default function Main(props) {
  const handleUpCLick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to Uppercase", "success");
  };
  const handleLowerCLick = () => {
    setText(text.toLowerCase());
    props.showAlert("Converted to Lowercase", "success");
  };
  const handleOnchange = (e) => {
    setText(e.target.value);
  };
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("TextArea Cleared.", "info");
  };

  //find and replace events
  const handleFindChange = (e) => {
    setFind(e.target.value);
  };
  const btnOnClickFind = () => {
    if (text === "Enter Text Here!") {
      props.showAlert("Nothing here in text box", "danger");
    } else {
      if (text.includes(find)) {
        props.showAlert(`${find} is available in you text area at index ${text.indexOf(find)}`, "success");
        setReplace(find);
      } else {
        props.showAlert("Not Find", "danger");
      }
    }
  };

  const handleReplaceChange = (e) => {
    setReplace(e.target.value);
  };
  const btnOnClickReplace = () => {
    if (find === "Enter something to find and replace") {
      props.showAlert("Please find something to replace!", "info");
    } else {
    
      if (text.includes(find) && replace !== "" && replace !== " " && replace.length >= 1) {
        let tempValueForReplace = text;

        tempValueForReplace = tempValueForReplace.replace(find, replace);
        setText(tempValueForReplace);

        props.showAlert("Word Replaced", "success");
      } else {
        props.showAlert("Something is wrong, Try Again", "danger");
      }
    }
  };

  const btnOnClickDownloadtxt = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("textArea").value], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "pwwdownloadedFile.txt";
    document.body.appendChild(element);
    element.click();
    props.showAlert("Text downloaded", "success");
  };

  // Declare a new state variable, which we'll call variable as class
  const [text, setText] = useState("Enter Text Here!");
  const [find, setFind] = useState("To Find");
  const [replace, setReplace] = useState("To Replace");

  // //word bug improve
  let arrString = text.split(" ");
  word = arrString.filter((e) => e).length;

  return (
    <div className="container-fluid">
      <h1 className={`fs-3 my-3 display-6 text-${props.textColor}`}>{props.headingMain}</h1>
      <textarea
        className="text-muted p-2 form-control"
        name="textArea"
        // placeholder={text}
        value={text}
        id="textArea"
        rows="6"
        onChange={handleOnchange}
      ></textarea>
      <div className="my-3">
        {/* dropdowns and buttons */}
        <div>
          <button className="nav-link link-danger dropdown-toggle d-inline" data-bs-toggle="dropdown" aria-expanded="false">
            Change Case
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={handleUpCLick}>
                Capital Case
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLowerCLick}>
                Lower Case
              </button>
            </li>
          </ul>
          {/* giving line break for better view of link or button in small screen */}
          <br className="d-none brForSmallScreen"></br>
          {/* badges - word */}
          <button className="nav-link link-danger pe-none d-inline mx-2 toSetMargin " id="word">
            Word <span className="badge text-bg-secondary">{(word)}</span>
          </button>
          {/* giving line break for better view of link or button in small screen */}
          <br className="d-none brForSmallScreen"></br>
          {/* badges - Character */}
          <button className="nav-link link-danger pe-none d-inline mx-2 toSetMargin" id="characters">
            Chanracter <span className="badge text-bg-secondary">{text.length}</span>
          </button>
          {/* giving line break for better view of link or button in small screen */}
          <br className="d-none brForSmallScreen"></br>
          {/* badges - Reading time */}
          <button className="nav-link link-danger pe-none d-inline mx-2 toSetMargin">
            Reading Time <span className="badge text-bg-secondary">{word / 200} min</span>
          </button>
          {/* giving line break for better view of link or button in small screen */}
          <br className="d-none brForSmallScreen"></br>
          <button className="nav-link link-danger d-inline mx-2 toSetMargin" onClick={handleClearClick}>
            Clear Me
          </button>
          {/* giving line break for better view of link or button in small screen */}
          <br className="d-none brForSmallScreen"></br>
          <button className="nav-link link-danger d-inline mx-2 toSetMargin" onClick={btnOnClickDownloadtxt}>
            Download(.txt)
          </button>
        </div>
        {/* output area */}
        <div>
          <h3 className={`display-6 mt-3 text-${props.textColor}`}>Output</h3>
          <div className="mb-3">
            <p className={`text-${props.textColor}`}>{text === "Enter Text Here!" || text.length < 1 ? "Enter something to view output here!" : text}</p>
          </div>
        </div>
        {/* find replace */}
        <h2 className={`display-6 fs-3 mt-3 text-${props.textColor}`}>Find / Replace</h2>
        {/* Find */}
        <div className="row mb-3">
          <div className="col-md-5">
            <div className="input-group mb-3">
              <input type="text" className="form-control" id="find" value={text===""?'To Find':find} onChange={handleFindChange} />
              <button className={`btn btn-outline-${props.textColor === "light" ? "danger" : "secondary"}`} type="button" id="button-addon2" onClick={btnOnClickFind}>
                Find
              </button>
            </div>
          </div>
          {/* Replace */}
          <div className="col-md-5">
            <div className="input-group mb-3">
              <input type="text" className="form-control" id="replace" value={replace} onChange={handleReplaceChange} />
              <button className={`btn btn-outline-${props.textColor === "light" ? "danger" : "secondary"}`} type="button" id="button-addon" onClick={btnOnClickReplace}>
                Replace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// data type check : it works as a validation
Main.prototypes = {
  headingMain: PropTypes.string,
};

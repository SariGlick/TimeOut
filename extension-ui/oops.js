
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GenericButton } from 'client-side';

const HEADER_TEXT = "Access Blocked";
const PARAGRAPH_TEXT = "You don't have permission to view this site.";
const BUTTON_TEXT = "Go Back";

function App() {
  useEffect(() => {
    document.getElementById("header").innerHTML = HEADER_TEXT;
    document.getElementById("paragraph").innerHTML = PARAGRAPH_TEXT;
  }, []);

  return (
    <div className="container">
      <div>
        <div className="content">
          <h1 id="header" className="header"></h1>
          <p id="paragraph" className="paragraph"></p>
        </div>
        <div className="btn-class">
          <GenericButton id="btn" className="btn">
            {BUTTON_TEXT}
          </GenericButton>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

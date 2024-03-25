import logo from './logo.svg';
import './App.css';
import { EditorSingle, DualEditor, EditorMulti, ImageSelect } from './components/editPage';
import { useState } from 'react';

function App() {
  const boxes = ["Title", "Summary", "Author(s)", "Editor(s)"]

  const [formData, setFormData] = useState({});

  const handleFormChange = (form, index, title) => {
    // console.log(form, index, title);
    // console.log(typeof form);
    const newData = formData;

    // console.log(!newData[title], index === null, typeof form === 'object')

    if (!newData[title]) {
      // if (typeof form === 'object') {
      //   newData[title] = {};
      // } else if (index !== null) {
      //   newData[title] = [];
      // } else {
      //   newData[title] = ""
      // }
      newData[title] = typeof form === 'object' ? {} : index === null ? "" : [];
    }

    if (typeof form === 'object') {
      newData[title] = form
    } else if (index === null) {
      newData[title] = form;
    } else {
      newData[title][index] = form;
    }
    // console.log(formData);
    setFormData(newData);
  }

  const postData = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('data', JSON.stringify(formData));
    for (let i = 0; i < formData["Images"].length; i++) {
      const file = formData["Images"][i]
      data.append(file.name, file.image);
    }

    const response = await fetch('/submitArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const jsonData = await response.json();
  }


  return (
    <div className='App'>
      <EditorSingle title="Title" onFormChange={handleFormChange} />
      <EditorSingle title="Summary" onFormChange={handleFormChange} />
      <EditorMulti title="Author(s)" onFormChange={handleFormChange} />
      <EditorMulti title="Editor(s)" onFormChange={handleFormChange} />
      <EditorMulti title="Tag(s)" onFormChange={handleFormChange} />
      <DualEditor title={"Pros"} title2={"Cons"} onFormChange={handleFormChange} />
      <EditorSingle title="Body" onFormChange={handleFormChange} />
      <ImageSelect title="Images" onFormChange={handleFormChange} />
      <button onClick={postData}></button>
    </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import { EditorSingle, DualEditor, EditorMulti } from './components/editPage';

function App() {
  const boxes = ["Title", "Summary", "Author(s)", "Editor(s)"]


  return (
    <div className='App'>
      <EditorSingle title="Title" />
      <EditorSingle title="Summary" />
      <EditorMulti title="Author(s)" />
      <EditorMulti title="Editor(s)" />
      <EditorMulti title="Tag(s)" />
      <DualEditor title={"Pros"} title2={"Cons"} />
      <EditorSingle title="Body" />
    </div>
  );
}

export default App;

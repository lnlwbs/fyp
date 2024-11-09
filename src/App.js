import './App.css';
import Employee from './components/Employee';

function App() {
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
        <>
          <Employee name = "Lionel" role = "Developer"/>
          <Employee name = "Tan" />
        </>
      ) : (
      <p>you cannot see the employees</p>
      )}
    </div>
  );
}

export default App;

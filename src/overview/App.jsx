import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Chatbot from "./components/Chatbot";
import Courses from "./components/Courses";
import GrammarChecker from "./components/GrammarChecker";
import "./styles.css";
import Cookies from 'js-cookie'

function App() {
  const [activeItem, setActiveItem] = useState("overview");

  const handleSetActiveItem = (item) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return <Overview />;
      case "chatbot":
        return <Chatbot />;
      case "courses":
        return <Courses />;
      case "grammarchecker":
        return <GrammarChecker userId={"default-user"} />; // Berikan userId (contoh: "default-user")
      case "settings":
        return (
          <div className="dashboard-container">
            <div className="dashboard-content">
              <div className="main-content">
                <h1>Settings</h1>
              </div>
            </div>
          </div>
        );
      default:
        return <Overview />;
    }
  };

  return (
    <div className="app-content">
      <Sidebar activeItem={activeItem} setActiveItem={handleSetActiveItem} />
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default App;

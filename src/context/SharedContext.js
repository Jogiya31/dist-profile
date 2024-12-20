import React, { createContext, useContext, useState } from "react";

// Create a context for shared data
const SharedContext = createContext();

// Provider component to wrap around the application
export const SharedProvider = ({ children }) => {
  // State variables for shared data
  const [sharedData, setSharedData] = useState(null);
  const [activeSideMenu, setActiveSideMenu] = useState(null);
  const [miniSideMenu, setMiniSideMenu] = useState(false);
  const [cardView, setCardView] = useState(false);
  const [departmentFilterValue, setDepartmentFilterValue] = useState(null);
  const [schemeFilterValue, setSchemeFilterValue] = useState(null);
  const [iframeProjectCode, setIframeProjectCode] = useState(null);

  // Function to update shared data
  const updateSharedData = (newData) => {
    setSharedData(newData);
  };

  // Function to update active side menu
  const updateActiveSideMenu = (newData) => {
    setActiveSideMenu(newData);
  };

  // Function to update department filter value
  const updateDepartmentFilter = (newData) => {
    setDepartmentFilterValue(newData);
  };

  // Function to update scheme granularity filter value
  const updateSchemeGranularityFilter = (newData) => {
    setSchemeFilterValue(newData);
  };

  // Function to update mini side menu
  const updateMiniSideMenu = (newData) => {
    setMiniSideMenu(newData);
  };

  // Function to update card view
  const updateCardView = (newData) => {
    setCardView(newData);
  };

  // Function to update iframe project code
  const updateIframeProjectCode = (newData) => {
    setIframeProjectCode(newData);
  };

  // Provide context values to children components
  return (
    <SharedContext.Provider
      value={{
        sharedData,
        updateSharedData,
        activeSideMenu,
        updateActiveSideMenu,
        departmentFilterValue,
        updateDepartmentFilter,
        schemeFilterValue,
        updateSchemeGranularityFilter,
        miniSideMenu,
        updateMiniSideMenu,
        cardView,
        updateCardView,
        iframeProjectCode,
        updateIframeProjectCode
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};

// Custom hook to access the shared context
export const UseSharedContext = () => {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error("useSharedContext must be used within a SharedProvider");
  }
  return context;
};

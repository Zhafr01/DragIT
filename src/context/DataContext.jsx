import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [materials, setMaterials] = useState({ chapters: [] });
  const [evaluations, setEvaluations] = useState({ evaluations: [] });
  const [questions, setQuestions] = useState({ levels: [] });
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [matRes, evRes, qRes] = await Promise.all([
        fetch('https://dragit-dogl.onrender.com/api/materials'),
        fetch('https://dragit-dogl.onrender.com/api/evaluations'),
        fetch('https://dragit-dogl.onrender.com/api/questions')
      ]);

      const matData = await matRes.json();
      const evData = await evRes.json();
      const qData = await qRes.json();

      setMaterials(matData);
      setEvaluations(evData);
      setQuestions(qData);
    } catch (err) {
      console.error('Failed to fetch data from API:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ materials, setMaterials, evaluations, setEvaluations, questions, setQuestions, loadingData, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

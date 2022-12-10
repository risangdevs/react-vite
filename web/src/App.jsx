import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import LineChartComponent from "./LineChart";
import PieChartComponent from "./PieChart";
import Source from "./Source";

function App() {
  const [data, setData] = useState([]);
  const [source, setSource] = useState([]);
  const fetchData = () => {
    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setSource(json.source);
      })
      .catch((e) => alert(e));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const getYear = (date) => new Date(date).getFullYear();

  useEffect(() => {
    if (getYear(startDate) && getYear(endDate)) {
      setFilteredData(() =>
        data.filter(
          (e) =>
            e["ID Year"] >= getYear(startDate) &&
            e["ID Year"] <= getYear(endDate)
        )
      );
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [startDate, endDate]);
  return (
    <div className="bg-slate-100 justify-center flex flex-col h-screen">
      {source[0] && <Source source={source} />}
      <div className="w-1/2 bg-slate-300 h-auto flex justify-center flex-row my-auto mx-auto items-center p-4">
        <div className="w-1/3">
          <h1 className="font-bold">Filter by Date Range:</h1>
        </div>
        <div className="w-1/3">
          <label className="justify-start">Start Date</label>
          <DatePicker
            showYearDropdown
            className="bg-slate-100 rounded-md px-1"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="Set Start Date!"
          />
        </div>
        <div className="w-1/3">
          <label className="justify-start">End Date</label>
          <DatePicker
            showYearDropdown
            className="bg-slate-100 rounded-md px-1"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            isClearable
            placeholderText="Set End Date!"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center flex-wrap">
        {data[0] && (
          <LineChartComponent data={isFiltered ? filteredData : data} />
        )}
        {data[0] && (
          <PieChartComponent data={isFiltered ? filteredData : data} />
        )}
      </div>
    </div>
  );
}

export default App;

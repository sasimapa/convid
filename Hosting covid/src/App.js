import React from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";
// import "leaflet/dist/leaflet.css";
// import LineGraph from "./LineGraph.txt";

function App() {
  const [countries, setCountries] = React.useState([]);
  const [country, setCountry] = React.useState("worldwide");
  const [countryInfo, setCountryInfo] = React.useState({});
  const [tableData, setTableData] = React.useState([]);
  const [mapCenter, setMapCenter] = React.useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = React.useState(3);

  React.useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // FETCHING THE DATA
  React.useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  // GETTING THE COUNTRY NAME FROM THE DROPDOWN MENU
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        // console.log("Map center before ", mapCenter);
        setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
        setMapZoom(4);
        // console.log("Map center after ", mapCenter);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID TRACKER</h1>
          {/* DROPDOWN MENU */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem className="app__dropdown" value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* INFO BOXEXS */}
        <div className="app__status">
          <InfoBox
            title="coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovers"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* MAP */}
        <Map center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* <h3>Worldwide new Cases</h3> */}
          {/* <LineGraph /> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

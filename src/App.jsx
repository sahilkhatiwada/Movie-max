/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration } from "./store/homeSlice";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Search from "./pages/searchResult/Search";
import Explore from "./pages/explore/Explore";
import NoPage from "./pages/404/NoPages";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(res));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["movie", "tv"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

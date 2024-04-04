import './App.css';

import Post from "./components/articleIcon.js"
import Header from "./components/header.js"
import ArticlesPage from './pages/ArticlesPage.js';
import ArticlePage from './pages/ArticlePage.js'



import { Route, Routes } from "react-router-dom"
import Layout from './components/layout.js';
import AboutUs from './pages/AboutUs.js';
import { useState, useEffect } from 'react';

function App() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/tags`)
            .then(response => {
                response.json().then(articleInfo => {
                    setTags(articleInfo);
                })
            })
    }, []);

    console.log(tags)

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ArticlesPage key={"default"} />} />
                <Route path="/page">
                    {/* <Route index element={<ArticlesPage key={"default"} />} /> */}
                    <Route path={'inversiones'} element={<ArticlesPage key={"inversiones"} tag="inversiones" />} />
                    <Route path={'finanzas'} element={<ArticlesPage key={"finanzas"} tag="finanzas" />} />
                    <Route path={'negocios'} element={<ArticlesPage key={"negocios"} tag="negocios" />} />
                    <Route path={'ecomomia'} element={<ArticlesPage key={"ecomomia"} tag="ecomomia" />} />
                    <Route path={'banca'} element={<ArticlesPage key={"banca"} tag="banca" />} />
                    <Route path={'stocks'} element={<ArticlesPage key={"stocks"} tag="stocks" />} />
                    {tags.length > 0 && tags.map(tag => {
                        return <Route path={tag} element={<ArticlesPage key={tag} tag={tag} />} />
                    })}
                    <Route path={'aboutus'} element={<AboutUs />} />
                </Route>
                <Route path={'post/:id'} element={<ArticlePage />} />
            </Route>
        </Routes>
    );
}
export default App;
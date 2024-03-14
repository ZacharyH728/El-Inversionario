import './App.css';

import Post from "./components/articleIcon.js"
import Header from "./components/header.js"
import ArticlesPage from './pages/ArticlesPage.js';
import ArticlePage from './pages/ArticlePage.js'
import NegociosPage from './pages/NegociosPage.js'
import InverstionesPage from './pages/InversionesPage.js';
import BancarioPage from './pages/BancarioPage.js';
import EcommiaPage from './pages/EcomomiaPage.js';
import FinanzasPage from './pages/FinanzasPage.js';




import { Route, Routes } from "react-router-dom"
import Layout from './components/layout.js';

function App() {
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
                    <Route path={'bancario'} element={<ArticlesPage key={"bancario"} tag="bancario" />} />
                    <Route path={'stocks'} element={<ArticlesPage key={"stocks"} tag="stocks" />} />
                </Route>
                <Route path={'post/:id'} element={<ArticlePage />} />
            </Route>
        </Routes>
    );
}
export default App;
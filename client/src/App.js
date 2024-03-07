import './App.css';

import Post from "./articleIcon.js"
import Header from "./header.js"
import ArticlesPage from './pages/ArticlesPage.js';
import ArticlePage from './pages/ArticlePage.js'
import NegociosPage from './pages/NegociosPage.js'
import InverstionesPage from './pages/InversionesPage.js';
import BancarioPage from './pages/BancarioPage.js';
import EcommiaPage from './pages/EcomomiaPage.js';
import FinanzasPage from './pages/FinanzasPage.js';




import { Route, Routes } from "react-router-dom"
import Layout from './layout.js';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ArticlesPage key={"default"} />} />
                {/* <Route index element={<ArticlePage />} /> */}
                <Route path={'/page/inversiones'} element={<ArticlesPage key={"inversiones"} tag="inversiones" />} />
                {/* <Route path={'/finanzas'} element={<FinanzasPage />} />
                <Route path={'/negocios'} element={<NegociosPage />} />
                <Route path={'/ecomomia'} element={<EcommiaPage />} />
                <Route path={'/bancario'} element={<BancarioPage />} /> */}
                <Route path={'/post/:id'} element={<ArticlePage />} />
            </Route>
        </Routes>
    );
}

export default App;
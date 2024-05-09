import ArticleIcon from "../components/articleIcon";
import { useEffect, useState } from "react"



export default function AritcleGrid({ header, tag, limit }) {
    const [articles, setArticles] = useState([]);

    tag = tag ? tag : ""


    useEffect(() => {
        fetch(`https://3.144.124.221:4000/${tag}`)
            .then(response => {
                response.json().then(articles => {
                    setArticles(articles)
                });
            });
    }, []);

    return (
        <div>
            <div className="postHeader">
                <div className="headerLine" ></div>
                <h1>{!tag ? "Latest Articles" : tag.charAt(0).toUpperCase() + tag.slice(1)}</h1>
            </div>
            <div className="posts small">
                {articles.length > 0 && articles.slice(0, limit).map((article, index) => {
                    return <ArticleIcon key={article._id} {...article} />;
                })}
            </div>
        </div>
    );
}
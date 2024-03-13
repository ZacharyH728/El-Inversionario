import ArticleIcon from "../components/articleIcon";
import { useEffect, useState } from "react"


export default function AritcleGrid({ header, tag }) {
    const [articles, setArticles] = useState([]);

    tag = tag ? tag : ""

    useEffect(() => {
        fetch(`http://localhost:4000/page/${tag}`)
            .then(response => {
                response.json().then(articles => {
                    setArticles(articles)
                });
            });
    }, []);

    return (
        <div>
            <div className="postHeader">
                <h1>{!tag ? "Latest Articles" : tag.charAt(0).toUpperCase() + tag.slice(1)}</h1>
            </div>
            <div className="posts">
                {articles.length > 0 && articles.map(article => {
                    return <ArticleIcon key={article._id} {...article} />;
                })}
            </div>
        </div>
    );
}
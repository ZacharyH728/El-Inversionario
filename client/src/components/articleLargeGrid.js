import ArticleLargeIcon from "../components/articleLargeIcon";
import { useEffect, useState } from "react"

export default function AritcleLargeGrid({ tag }) {
    const [articles, setArticles] = useState([]);

    tag = tag ? tag : ""

    useEffect(() => {
        fetch(`http://3.144.124.221:4000/${tag}`)
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
            <div className="posts large">
                {articles.length > 0 && articles.slice(0, 4).map(article => {
                    return <ArticleLargeIcon key={article._id} {...article} />;
                })}
            </div>
        </div>
    );
}
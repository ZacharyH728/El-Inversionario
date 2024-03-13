import { Link } from "react-router-dom";

export default function ArticleIcon({ article, _id, authors, editors, date_created }) {
    const tags = article.tags.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' > ');
    return (
        < div className="post">
            <Link className="image" to={`/post/${_id}`} >
            </Link>
            <div className="text">
                <Link className="link" to={`/post/${_id}`} >
                    <h2>{article.title}</h2>
                </Link>
                <div className="info">
                    <h3 className="tag">{tags}</h3>
                    <time>{new Date(date_created).toDateString()}</time>
                </div>
                <p>{article.summary}</p>
            </div>
        </div>
    );
}
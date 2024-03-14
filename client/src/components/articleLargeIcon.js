import { Link } from "react-router-dom";

export default function ArticleLargeIcon({ article, _id, authors, editors, date_created }) {
    const tags = article.tags.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' > ');
    return (
        < div className="post large">
            <div className="text">
                <Link className="link" to={`/post/${_id}`} >
                    <h2>{article.title}</h2>
                </Link>
                <div className="info">
                    {/* <div className="tags">
                        {article.tags.length > 0 && article.tags.map((tag, idx) => {
                            return <div>{idx === article.tags.length - 1 ? <h3>{">"}</h3> : ""
                            }<Link className="link" to={`/page/${tag}`}><h3 className="tag link" key={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</h3></Link></div>
                        })}
                    </div> */}
                    <h3 className="tag">{tags}</h3>
                    <time>{new Date(date_created).toDateString()}</time>
                </div>
                {/* <p>{article.summary}</p> */}
            </div>
            <Link className="image" to={`/post/${_id}`} >
            </Link>
        </div>
    );
}
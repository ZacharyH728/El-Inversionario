import { Link } from "react-router-dom";

export default function ArticleIcon({ article, _id, authors, editors, date_created }) {
    const tags = article.tags.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' > ');
    return (
        < div className="post">
            <div className="image">
                <Link className="link" to={`/post/${_id}`} >
                    {/* <img src={article.photos}></img> */}
                </Link>
            </div>
            <div className="text">
                <Link className="link" to={`/post/${_id}`} >
                    <h2>{article.title}</h2>
                </Link>
                <div className="info">
                    <h3 className="tag">{tags}</h3>
                    {/* <div className="people">
                        <div className="authors">
                            <h3>Authors:</h3>
                            {authors.length > 0 && authors.map(author => {
                                return <p className="author">{author}</p>
                            })}
                        </div>
                        <div className="editors">
                            <h3>Editors:</h3>
                            {editors.length > 0 && editors.map(editor => {
                                return <p className="editor">{editor}</p>
                            })}
                        </div>
                    </div> */}
                    <time>{new Date(date_created).toDateString()}</time>
                </div>
                <p>{article.summary}</p>
            </div>
        </div>
    );
}
//Filler text, also known as placeholder text or lorem ipsum, is commonly used in design and typesetting to simulate the appearance of real text.It is used when the actual content is not yet available or is not a priority, allowing designers to focus on the layout and formatting of a document or website.
//https://www.investopedia.com/thmb/blwkUdsKbfOsgd5PjIDuu2_c28E=/600x320/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1921103583-e1627a5af07c484889a553caa09c582c.jpg
//Stocks
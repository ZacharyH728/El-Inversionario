import { useEffect, useState } from "react"
import AritcleGrid from "../components/articleGrid";
import ArticleLargeGrid from "../components/articleLargeGrid";

export default function ArticlesPage({ tag }) {
    // const [articles, setArticles] = useState([]);

    // tag = tag ? tag : ""

    // useEffect(() => {
    //     fetch(`http://localhost:4000/page/${tag}`)
    //         .then(response => {
    //             response.json().then(articles => {
    //                 setArticles(articles)
    //             });
    //         });
    // }, []);

    return (
        <div className="content">
            <div className="ad">
                AD
            </div>
            <div className="body">
                <div className="ad">
                    AD
                </div>
                <div className="content">
                    < ArticleLargeGrid tag="" />
                    < AritcleGrid tag="finanzas" />
                </div>
            </div>
        </div>
    )
}

// <Post
//                             image="https://www.investopedia.com/thmb/blwkUdsKbfOsgd5PjIDuu2_c28E=/600x320/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1921103583-e1627a5af07c484889a553caa09c582c.jpg"
//                             summary="Filler text, also known as placeholder text or lorem ipsum, is commonly used in design and typesetting to simulate the appearance of real text.It is used when the actual content is not yet available or is not a priority, allowing designers to focus on the layout and formatting of a document or website."
//                             title="This is a very long and realistic title"
//                             tags={["Stocks", "Special Stock"]} />
//                         <Post
//                             image="https://www.investopedia.com/thmb/blwkUdsKbfOsgd5PjIDuu2_c28E=/600x320/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1921103583-e1627a5af07c484889a553caa09c582c.jpg"
//                             summary="Filler text, also known as placeholder text or lorem ipsum, is commonly used in design and typesetting to simulate the appearance of real text.It is used when the actual content is not yet available or is not a priority, allowing designers to focus on the layout and formatting of a document or website."
//                             title="This is a very long and realistic title"
//                             tags={["Stocks", "Special Stock"]} />
//                         <Post
//                             image="https://www.investopedia.com/thmb/blwkUdsKbfOsgd5PjIDuu2_c28E=/600x320/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1921103583-e1627a5af07c484889a553caa09c582c.jpg"
//                             summary="Filler text, also known as placeholder text or lorem ipsum, is commonly used in design and typesetting to simulate the appearance of real text.It is used when the actual content is not yet available or is not a priority, allowing designers to focus on the layout and formatting of a document or website."
//                             title="This is a very long and realistic title"
//                             tags={["Stocks", "Special Stock"]} />
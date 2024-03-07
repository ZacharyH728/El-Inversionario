import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom"
import parse from 'html-react-parser';

//test

export default function ArticlePage() {
    const [articleInfo, setArticleInfo] = useState(null);
    const { id } = useParams();
    const domParser = new DOMParser();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id ? id : 0}`)
            .then(response => {
                response.json().then(articleInfo => {
                    setArticleInfo(articleInfo);
                })
            })
    }, []);

    if (!articleInfo) {
        return '';
    }
    return (
        <div className="article">
            <div className="left">
                <div className="tableOfContents">
                    <h2>Table of Contents</h2>
                    <ul>
                        {Array.from(document.getElementsByTagName('h2')).map(element => { if (element.innerHTML === "Table of Contents") { return "" } else { return (<a href={`#${element.innerHTML}`}><li key={element.innerHTML}>{element.innerHTML}</li></a>) } })}
                    </ul>
                </div>
                <div className="ad">
                    AD
                </div>
            </div>
            <div className="centre">
                <div className="info">
                    <h3 className="tag">{articleInfo.article.tags.join(' > ')}</h3>
                    <h1 className="title">{articleInfo.article.title}</h1>
                    <div className="subInfo">
                        <div className="people">
                            <div className="authors">
                                <h3>Authors:</h3>
                                {articleInfo.authors.length > 0 && articleInfo.authors.map(author => {
                                    return <p className="author" key={author} >{author}</p>
                                })}
                            </div>
                            <div className="editors">
                                <h3>Editors:</h3>
                                {articleInfo.editors.length > 0 && articleInfo.editors.map(editor => {
                                    return <p className="editor" key={editor}>{editor}</p>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image">
                    <img src="https://www.investopedia.com/thmb/-pHVGUrLA2OzieX3XXDcz8fSAn0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-1246026356-22220ea971dc4eff8d5fe628cb9cba98.jpg"></img>
                </div>
                {/* <div className="ad">
                    AD
                </div> */}
                <div className="content">
                    {/* TODO fix this shit */}
                    {Array.from(
                        domParser.parseFromString(articleInfo.article.body, "text/html")
                            .body.getElementsByTagName("*"))
                        // .map(item => console.log("test"))
                        .map(item => parse(item.outerHTML,
                            {
                                replace(item) {
                                    // console.log(item)
                                    if (item.name === 'h2') {
                                        // console.log(item.children[0].data);
                                        // console.log(item.children)
                                        // item.id = item.children[0].data
                                        item.attribs.id = item.children[0].data
                                        return item;

                                        // return React.createElement(
                                        //     'h2',
                                        //     { id: item.children[0].data, dangerouslySetInnerHTML: { __html: item.children[0] } }
                                        // )
                                    }
                                }
                            }))
                    }
                </div>
                <div>
                    <h2>Referencias</h2>
                    {articleInfo.article.refrences.length > 0 && articleInfo.article.refrences.map(refrence => {
                        return <p key={refrence.name}>{refrence.name}</p>
                    })}
                </div>
            </div>
            <div className="right">
                <div className="ad">
                    AD
                </div>
            </div>
        </div>
    )
}
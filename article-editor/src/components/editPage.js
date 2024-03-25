import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function EditorMulti({ title, onFormChange }) {
    const [inputs, setInputs] = useState([""])

    const handleInputAdd = () => {
        setInputs([...inputs, ''])
    }

    const handleInputChange = (event, index) => {
        const newInputs = [...inputs];
        newInputs[index] = event;
        setInputs(newInputs);
        onFormChange(event, index, title)
    }


    return (
        <div className='formSection'>
            <h1>{title}</h1>
            <div className='textBox'>
                {/* <ReactQuill key={"test"} className="editor" theme="snow" value={value} onChange={setValue} /> */}


                {inputs.map((input, index) => {
                    return (
                        <ReactQuill key={index} className="editor" theme="snow" value={input} onChange={event => handleInputChange(event, index)} />
                    )
                })}
                <button onClick={handleInputAdd}>+</button>
                {/* 
                {inputs.map() => {
                    <ReactQuill key={i} className="editor" theme="snow" value={value} onChange={setValue} />
                })} */}
            </div>
        </div>
    )
}

export function EditorSingle({ title, onFormChange }) {
    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        setValue(event);
        onFormChange(event, null, title);
    }

    return (
        <div className='formSection'>
            <h1>{title}</h1>
            <div className='textBox'>
                <ReactQuill key={title} className="editor" theme="snow" value={value} onChange={event => handleInputChange(event)} />
            </div>
        </div>
    )
}

export function ImageSelect({ title, onFormChange }) {
    const [images, setImages] = useState([{ 'image': "", 'name': "" }]);

    const handleNameChange = (event, index) => {
        event.preventDefault();
        const newImages = [...images];
        newImages[index].name = event.target.value;
        setImages(newImages);
    }

    const handleImageChange = (event, index) => {
        event.preventDefault();
        // console.log(event.target.files[0])
        const newImages = [...images];
        newImages[index].image = event.target.files[0];
        setImages(newImages);
    }

    const handleInputAdd = () => {
        setImages([...images, { 'image': "", 'name': "" }])
    }

    return (
        <div className='formSection'>
            <h2>{title}</h2>
            {images.map((image, index) => {
                return (
                    <form key={index} onSubmit={event => event.preventDefault()} onChange={event => { event.preventDefault(); onFormChange(images, null, title) }}>
                        <input type='file' accept='image/*' onChange={event => handleImageChange(event, index)} />
                        <input type='text' value={image.name} onChange={event => handleNameChange(event, index)} />
                    </form>
                )
            })}
            <button onClick={handleInputAdd}>+</button>
        </div>
    )
}

export function DualEditor({ title, title2, onFormChange }) {
    const [inputs1, setInputs1] = useState([""])
    const [inputs2, setInputs2] = useState([""])

    const handleInput1Add = () => {
        setInputs1([...inputs1, ''])
    }
    const handleInput2Add = () => {
        setInputs2([...inputs2, ''])
    }

    const handleInput1Change = (event, index) => {
        const newInputs = [...inputs1];
        newInputs[index] = event;
        setInputs1(newInputs);
        onFormChange(event, index, title);
    }
    const handleInput2Change = (event, index) => {
        const newInputs = [...inputs2];
        newInputs[index] = event;
        setInputs2(newInputs);
        onFormChange(event, index, title2);
    }



    return (
        <div className='doubleSection'>
            <div className='formSection'>
                <h1>{title}</h1>
                <div className='textBox'>
                    {inputs1.map((input1, index) => {
                        return (
                            <ReactQuill key={index} className="editor" theme="snow" value={input1} onChange={event => handleInput1Change(event, index)} />
                        )
                    })}
                    {/* <ReactQuill className="editor" theme="snow" value={value} onChange={event => handleInput1Change(event, index)} /> */}
                    <button onClick={handleInput1Add}>+</button>
                </div>
            </div>
            <div className='formSection'>
                <h1>{title2}</h1>
                <div className='textBox'>
                    {inputs2.map((input2, index) => {
                        return (
                            <ReactQuill key={index} className="editor" theme="snow" value={input2} onChange={event => handleInput2Change(event, index)} />
                        )
                    })}
                    {/* <ReactQuill className="editor" theme="snow" value={value} onChange={event => handleInput2Change(event, index)} /> */}
                    <button onClick={handleInput2Add}>+</button>
                </div>
            </div>
        </div>
    )
}
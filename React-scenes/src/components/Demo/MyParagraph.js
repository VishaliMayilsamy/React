import React from "react";

const MyParagraph = (props) => {
    return <p>{props.show ? 'This is new!' : ''}</p>
}

export default MyParagraph;
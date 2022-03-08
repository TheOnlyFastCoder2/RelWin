

const Button = ({text,onclick}) => {
    return (
        <button className="winButton" onClick={onclick}>{text}</button>
    )
}

export default Button;
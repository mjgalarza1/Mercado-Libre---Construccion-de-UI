import './LargeBlueButton.css'

function BlueButton({text,onClick}) {
    return <button type="button" className="blue-btn lg-blue-btn" onClick={onClick}>{text}</button>;
}

export default BlueButton;
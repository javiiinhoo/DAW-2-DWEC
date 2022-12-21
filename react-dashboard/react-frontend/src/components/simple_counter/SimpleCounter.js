const SimpleCounter = (props) => {
    return <div>
        <p>Número: {props.number}</p>
        <button data-cy='issue3button' onClick={props.onClickCounter}>Incrementar</button>
      </div>
  
}
export default SimpleCounter;
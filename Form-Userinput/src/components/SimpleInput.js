import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {

  //const nameInputRef = useRef()
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched,setEnteredNameTouched] = useState(false);
 // const [formIsValid, setaFormIsValid] = useState(false);

 const [enteredEmail, setEnteredEmail] = useState('');
 const [enteredEmailTouched,setEnteredEmailTouched] = useState(false);

 
  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid = enteredEmail.includes('@');
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  // useEffect(()=>{
  //   if(enteredNameIsValid){
  //     setaFormIsValid(true);
  //   }
  //   else{
  //     setaFormIsValid(false);
  //   }

  // }, [enteredNameIsValid])

  if(enteredNameIsValid && enteredEmailIsValid ){
    formIsValid = true;
  }

  const nameInputChangeHandler = event =>{
    setEnteredName(event.target.value);
  }

  const nameInputBlurHandler = event =>{
    setEnteredNameTouched(true);
  }

  const emailInputChangeHandler = event =>{
    setEnteredEmail(event.target.value);
  }

  const emailInputBlurHandler = event =>{
    setEnteredEmailTouched(true);
  }


  const formSubmissionHandler = event =>{
    event.preventDefault();

    setEnteredNameTouched(true);

    if(!enteredNameIsValid){
      return;
    }

    console.log(enteredName);

    //const enteredValue = nameInputRef.current.value;
    //console.log(enteredValue);

   //nameInputRef.current.value = ''; ==> not possible bcoz it directly manipulated DOM
    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  const emailInputClasses = enteredEmailIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
       // ref={nameInputRef} 
        type='text' id='name' 
        onChange={nameInputChangeHandler} 
        onBlur = {nameInputBlurHandler}
        value={enteredName} />
       { nameInputIsInvalid && <p className="error-text">Name must not be empty!</p> }
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
       // ref={nameInputRef} 
        type='email' id='email' 
        onChange={emailInputChangeHandler} 
        onBlur = {emailInputBlurHandler}
        value={enteredEmail} />
       { enteredEmailIsInvalid && <p className="error-text">Please ensure a valid email!</p> }
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

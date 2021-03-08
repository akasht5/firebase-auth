import React,{ Component } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { withRouter } from 'react-router-dom'
import { auth,signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

class SignIn extends Component{
    constructor(props){
        super(props);   

        this.state = {
            email    : '',
            password : ''
        } 
    }

    handleGoogleSignIn = async () => {
        const { history } = this.props;

        await signInWithGoogle();

        history.push('/');
    }

    handleChange = (e) => {
        const {name,value} = e.target;

        this.setState({ [name]:value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email,password } = this.state;
        const { history } = this.props;

        try {
            await auth.signInWithEmailAndPassword(email,password);

            history.push('/');

            this.setState({
                email : '',
                password : ''
            })

        } catch (error) {
            console.log('ERROR : ',error.message);
        }
    }


    render(){
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with email and password</span>
                <form onSubmit={this.handleSubmit}>  
                    <FormInput
                     type="email"
                     name="email"  
                     value={this.state.email} 
                     handleChange={this.handleChange}
                     label="email"
                     required 
                     />
                    <FormInput
                     type="password" 
                     name="password" 
                     value={this.state.password}
                     handleChange={this.handleChange} 
                     label="password"
                     required 
                     />
                     <div className="buttons">
                        <CustomButton type="submit" value="Submit">Sign in</CustomButton>
                        <CustomButton type="button" googleSignIn onClick={this.handleGoogleSignIn}>Sign in with Google</CustomButton>
                     </div>
                </form>
            </div>
        )
    }
    
}

export default withRouter(SignIn)

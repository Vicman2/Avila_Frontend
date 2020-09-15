
exports.SignUp = {
    name: {
        label:"Name",
        elemType: "input",
        config: {
            type: 'text',
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            if(this.value.trim() !== '' && this.value.length >=3){
                valid = true;
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please enter your name",
        touched: false,
    },
    phone: {
        label:"Phone",
        elemType: "input",
        config: {
            type: 'text',
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            const phoneRegex = /^[0]\d{10}$/
            if(phoneRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please enter a valid nigerian phone number",
        touched: false,
    },
    
    email: {
        label:"Email",
        elemType: "input",
        config: {
            type: 'text', 
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(emailRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
    },
    password: {
        label:"Password",
        elemType: "input",
        config: {
            type: 'password',
            required:"required" 
        },
        value:"",
        validation: function(){
            let valid = true;
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
    },
    address: {
        label:"Address",
        elemType: "input",
        config: {
            type: 'text', 
            required:"required"
        },
        value:"",
        validation: function(){
            let valid = false;
            if(this.value.trim() !== '' && this.value.length >=10){
                valid = true;
            }
            return valid
        },
        isValid: false,
        errorMessage: "Enter a default address please",
        touched: false,
    },
    sex: {
        elemType: 'select',
        value: "", 
        isValid: false,
        touched: false,
        name: 'sex',
        validation: function(){
            let valid = false;
            if(this.value.trim() !== ''){
                valid = true;
            }
            return valid
        },
        options: [
            {name: 'Select Gender', value: ''},
            {name: 'Female', value: 'female'},
            {name: "Male", value: 'male'}, 
        ], 
        errorMessage: "Select is a gender please"
    }
}


exports.Login = {
    email: {
        label:"Email",
        elemType: "input",
        config: {
            type: 'text',
            required: "required"
        },
        value:"",
        validation: function(){
            let valid = false;
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(emailRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
    },
    password: {
        label:"Password",
        elemType: "input",
        config: {
            type: 'password', 
            required: "required"
        },
        value:"",
        validation: function(){
            let valid = true;
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false,
    },
}
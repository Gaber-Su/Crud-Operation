const baseUrl = 'http://localhost:3000'


$("#signin").click(()=> {
    const email = $('#email').val();
    const password = $('#password').val()
    const data = {
        email,
        password
    }
    // console.log({data})

    axios({ // request
        method:'post',
        url:`${baseUrl}/signin`,
        data:data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }).then(function (response){ //  response
        // console.log(response.data)
        const {message , result} = response.data
        if (message == "Done") {
            localStorage.setItem("userID", result[0].id)
            window.location.replace("file:///E:/WEB/Route%20Academy/Back%20End%20%20Node%20js/Assignments/Assignement%204%20Node%20js/Code%20Front/index.html")
        } else {
            console.log('in-valid email, password')
        }
    }).catch(function (error) { // error 
        console.log(error)
    })


})









if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
    return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
}
if (!(/^[\s]*[6-9]\d{9}[\s]*$/).test(phone)) {
    return res.status(400).send({ status: false, msg: "Please Enter valid phone Number" })
}
if (!(/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/).test(email)) {
    return res.status(400).send({ status: false, msg: "Please Enter valid Email" })
}
if (!(/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/).test(password)) {                                            
    return res.status(400).send({ status: false, msg: "please Enter valid Password and it's length should be 8-15" })
}
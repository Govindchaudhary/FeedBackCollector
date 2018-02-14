const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default (emails)=> {
    //split the string on comma bases and store in array then remove all whitesace from start or and
    const invalidEmails = emails
    .split(',').
    map(email=>email.trim())
    .filter(email =>re.test(email)===false) //return emails which are invalid
    if(invalidEmails.length) {
        return `These emails are invalid:${invalidEmails}`;  //template string
    }
    return;
}
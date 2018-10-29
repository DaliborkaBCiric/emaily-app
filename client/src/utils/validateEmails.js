const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEmail = emails.split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  if(invalidEmail.length){
    return `These email are invalid: ${invalidEmail}`
  }

  return;
};
var calls = [];

function logFormValues() {
  let form = document.querySelector('form');
  var reason = document.getElementById('requestStaff').value;

  calls.push(reason);

  console.log(calls);

 
  localStorage.setItem('calls', JSON.stringify(calls));

  return false;
}


var calls = [];




function logFormValues() {
    let form = document.querySelector('form');
    var reason = document.getElementById('requestStaff').value;

    calls.push(reason);

    console.log(calls);

    for (let i = 0; i < calls.length; i++) {
      console.log(calls[i]);
    }

    return false;
  }

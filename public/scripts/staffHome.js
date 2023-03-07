var calls = JSON.parse(localStorage.getItem('calls')) || [];
var callsList = document.getElementById('callsList');

for (let i = 0; i < calls.length; i++) {
  
  var callItem = document.createElement('div');
  callItem.classList.add('call-item');

  var callTitle = document.createElement('div');
  callTitle.classList.add('box-title');
  var callTitleText = document.createTextNode('Customer Call #' + (i+1));
  callTitle.appendChild(callTitleText);
  callItem.appendChild(callTitle);

  var callDetails = document.createElement('div');
  callDetails.classList.add('call-details');
  var callDetailsText = document.createTextNode('Reason: ' + calls[i]);
  callDetails.appendChild(callDetailsText);
  callItem.appendChild(callDetails);

  var deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteCall(i);
    callItem.remove();
  });
  callItem.appendChild(deleteButton);

  callsList.appendChild(callItem);
}

function deleteCall(index) {
  calls.splice(index, 1);
  localStorage.setItem('calls', JSON.stringify(calls));
}

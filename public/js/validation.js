document.getElementById('registerForm').addEventListener('submit', function(event) {
    var password = document.getElementsByName('password')[0].value;
    var confirmPassword = document.getElementsByName('confirmPassword')[0].value;
    var terms = document.getElementById('terms').checked;
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      event.preventDefault();
    } else if (!terms) {
      alert('You must agree to the terms and conditions!');
      event.preventDefault();
    }
  });
  
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('name-error').textContent = '';
    document.getElementById('address-error').textContent = '';
    document.getElementById('contact-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('payment-method-error').textContent = '';
  
    const name = document.getElementById('name').value.trim();
    if (!name) {
      document.getElementById('name-error').textContent = 'Name is required';
      return;
    }
  
    const address = document.getElementById('address').value.trim();
    if (!address) {
      document.getElementById('address-error').textContent = 'Address is required';
      return;
    }
  
    const contact = document.getElementById('contact').value.trim();
    if (!contact) {
      document.getElementById('contact-error').textContent = 'Contact is required';
      return;
    }
  
    const email = document.getElementById('email').value.trim();
    if (!email) {
      document.getElementById('email-error').textContent = 'Email is required';
      return;
    }
  
    const paymentMethod = document.getElementById('payment-method').value;
    if (!paymentMethod) {
      document.getElementById('payment-method-error').textContent = 'Payment Method is required';
      return;
    }
  
    alert('Order placed successfully!');
    window.location.href = '../index.html'; 
  });
  
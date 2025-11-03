// ==================== WEB3FORMS CONTACT FORM HANDLER ====================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (!form) return; // Exit if form doesn't exist on current page
    
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Hide any previous messages
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        
        // Get form data
        const formData = new FormData(form);
        
        try {
            // Submit to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Show success message
                successMsg.style.display = 'flex';
                
                // Reset form
                form.reset();
                
                // Scroll to success message
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide success message after 10 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 10000);
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            errorMsg.style.display = 'flex';
            
            // Scroll to error message
            errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            // Re-enable submit button and remove loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
});


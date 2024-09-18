// Example using fetch to upload an image and get its description

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file); // 'image' is the field name expected by the server

    try {
        const response = await fetch('http://localhost:3800/describe-image', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Image Description:', data.description);
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Example usage with an input element
document.getElementById('imageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadImage(file);
    }
});

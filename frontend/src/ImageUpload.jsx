import { useState } from 'react';

const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [description, setDescription] = useState(''); // For displaying the image description
  const [error, setError] = useState(''); // For error handling

  // Function to handle image preview
  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to upload the image and get the description
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file); // 'image' is the field name expected by the server

    try {
      const response = await fetch('http://localhost:3801/describe-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setDescription(`Image Description: ${data.description}`);
        setError(''); // Clear any previous errors
      } else {
        setError(`Error: ${data.error}`);
        setDescription(''); // Clear the description
      }
    } catch (error) {
      setError('Error uploading image.');
      setDescription('');
      console.error('Error uploading image:', error);
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImagePreview(event); // Preview the image
      uploadImage(file); // Upload the image
    }
  };

  return (
    <div style={styles.container}>
      <h1>Upload an Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={styles.imagePreview}
        />
      )}
      <p id="description">{description}</p>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Inline styles for the React component
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    marginTop: '20px',
  },
  imagePreview: {
    marginTop: '20px',
    maxWidth: '100%',
    height: 'auto',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default ImageUpload;

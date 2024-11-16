import { useState } from 'react';
import { Upload, Download, Loader2 } from 'lucide-react';

// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-800 text-gray-100 rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-700">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-teal-400">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

// Button Component
const Button = ({ children, onClick, disabled = false, className = '', variant = 'primary' }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center";
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-500",
    outline: "border border-teal-600 text-teal-400 hover:bg-teal-700 hover:text-white"
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {children}
    </button>
  );
};

const RemoveBG = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeBgFromImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'tDJgZy5dBt3TjSghc2APgyXY',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to remove background');
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const processImage = async () => {
    if (!image) return;
    setLoading(true);
  
    try {
      const imageFile = await fetch(image)
        .then((res) => res.blob())
        .then((blob) => new File([blob], 'image.png', { type: 'image/png' }));
  
      const processedImageUrl = await removeBgFromImage(imageFile);
      setProcessedImage(processedImageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please check your internet connection.');
    }
    setLoading(false);
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = 'processed-image.png';
      link.href = processedImage;
      link.click();
    }
  };

  return (
    <div className='min-h-screen p-4 bg-gradient-to-b from-gray-900 to-gray-800'>
      <Card className="w-full max-w-3xl mx-auto mt-24">
        <CardHeader>
          <CardTitle>AI Background <span className='text-teal-400'>Remover</span></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* File Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-teal-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-input"
              />
              <label
                htmlFor="image-input"
                className="flex flex-col items-center cursor-pointer"
              >
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="max-h-64 mb-4 rounded-lg"
                  />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                )}
                <span className="text-sm text-gray-500">
                  Click to upload an image
                </span>
              </label>
            </div>

            {/* Action Button */}
            <Button
              onClick={processImage}
              disabled={!image || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Remove Background
                </>
              )}
            </Button>

            {/* Processed Image Result */}
            {processedImage && (
              <div className="flex justify-center flex-col items-center gap-4 mt-4" id="processed-image-section">
                <h3 className="text-lg font-semibold mb-2 mt-10 text-teal-400">Processed Image</h3>
                <img
                  src={processedImage}
                  alt="Processed"
                  className="w-3/4 rounded-lg bg-gray-900"
                  onLoad={() => {
                    document.getElementById('processed-image-section').scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    });
                  }}
                />
                <Button
                  onClick={downloadImage}
                  className="mt-2"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <footer className="bottom-0 left-0 right-0 p-4 pt-32 text-center">
        <h2 className="font-semibold text-sm text-gray-400">
          Made by <span className="text-teal-400 font-bold text-lg">Sagar</span>
        </h2>
      </footer>
    </div>
  );
};

export default RemoveBG;
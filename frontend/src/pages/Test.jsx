import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fetchedImageUrl, setFetchedImageUrl] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    // Make sure an image is selected
    if (!image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      // Use fetch to send the POST request without manually setting Content-Type
      const response = await fetch('/api/images/', {
        method: 'POST',
        body: formData,  // formData handles the Content-Type automatically
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      setImageUrl(result.fileUrl);  // Assuming the server responds with a 'fileUrl' key

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchImageById = async () => {
    const imageId = 'logoDefault.png';
    
    try {
      // Fetch the image by ID from the server
      const response = await fetch(`/api/images/id/${imageId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const result = await response.json();
      setFetchedImageUrl(result.fileUrl); // Assuming the server returns a 'fileUrl' key
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div>
        <div className='ArticleContent'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sequi sed possimus neque! Omnis doloribus tempora reprehenderit sed, quia deleniti quo illo doloremque voluptatum laboriosam adipisci ipsam, nesciunt sint ad.
                        <br/><br/>
                        Ad, vitae eum commodi, quis ipsa rerum officia ab dicta soluta neque hic sunt perferendis eveniet veritatis ex ipsum eius praesentium mollitia, aut velit itaque adipisci! Adipisci repellendus, eos, nesciunt explicabo nostrum fugit, eum deserunt natus omnis quae quas hic commodi maiores.
                        <br/><br/>
                        Fuga temporibus saepe cum sapiente ab eum expedita non eligendi at fugit neque ducimus, nihil, numquam iusto. Veritatis cupiditate, in adipisci mollitia soluta dolorem sapiente. Suscipit, commodi deserunt at accusamus adipisci ducimus.
                        <br/><br/>
                        Accusantium quibusdam delectus voluptate necessitatibus iusto voluptas obcaecati fugit cupiditate commodi sunt corrupti corporis aliquam pariatur earum odit, provident quae quisquam! Rerum veritatis unde commodi veniam earum fuga tenetur autem doloremque facilis odit, officiis adipisci nam amet minima? Corrupti distinctio quo velit fuga ullam sed ex deleniti veniam, ab, qui quisquam eius eveniet. Repellendus, magni obcaecati, doloremque quidem expedita incidunt alias dolor numquam ipsa error aspernatur, harum sint unde. Vel veniam placeat facilis, amet culpa laboriosam ipsam quo quae magnam repellendus nulla eaque ipsa quis, voluptates aspernatur. Delectus, sequi? Autem, labore consectetur.
                        <br/><br/>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo nesciunt, deleniti natus modi et pariatur, error vel aspernatur deserunt repellendus numquam iusto odio aliquid delectus laboriosam quis esse aut.
                        <br/><br/>
                        Dolore, temporibus. Modi, neque sed dolores suscipit voluptatum nihil, deleniti excepturi recusandae dolorem vitae distinctio vero et molestias beatae sapiente possimus commodi, eligendi est sunt iure sit ut. Dolore ratione esse eos.
                        <br/><br/>
                        Inventore repellendus assumenda sequi, a totam laboriosam mollitia unde iure porro amet dicta, ipsum officia vel animi dolorem doloribus cumque reprehenderit ipsam. Facilis blanditiis ratione, eos explicabo provident error eaque sunt illum laborum voluptatibus facere aspernatur enim quas dignissimos adipisci est. Obcaecati!
                        <br/><br/>
                        Itaque, nam aspernatur ratione dolorum libero ab eaque. Fuga, doloremque quas maxime voluptatibus, ipsum minima dignissimos a sequi possimus quidem mollitia quos sit illo eum amet iste cupiditate similique. Quidem, non itaque repudiandae quis quod, numquam commodi deserunt dolores exercitationem necessitatibus iure asperiores ab beatae sunt velit sint accusantium temporibus, voluptatem aspernatur!
                    </div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: '200px' }} />
        </div>
      )}

      <button onClick={fetchImageById}>Fetch Image by ID</button>

      {fetchedImageUrl && (
        <div>
          <h3>Fetched Image by ID:</h3>
          <img src={fetchedImageUrl} alt="Fetched" style={{ width: '200px' }} />
        </div>
      )}

    </div>
  );
};

export default ImageUpload;

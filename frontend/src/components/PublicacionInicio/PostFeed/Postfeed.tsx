type Props = {
  formData: FormData;
  handleCloseClick: () => void;
  
}

const PostFeed = async ({ formData, handleCloseClick}: Props): Promise<void> => {

  try {
    const res = await fetch('http://localhost:3000/posts/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    console.log('Post creado:', data);
    alert('¡Publicacion subir correctamente!');
    handleCloseClick();
  } catch (err) {
    console.error(err);
    alert('Ocurrio un error inesperado al subir la Publicación');
    handleCloseClick()
    throw err;
  }
}

export default PostFeed;



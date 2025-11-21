type Props = {
  formData: FormData;
  handleCloseClick: () => void;
}

const PostFeed = async ({ formData, handleCloseClick }: Props): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const res = await fetch('http://localhost:3000/feed/posts', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error('Error al crear post:', errData);
      alert(errData.message || 'Error al crear post');
      return;
    }

    const data = await res.json();
    console.log('Post creado:', data);
    alert('¡Publicación subida correctamente!');
    handleCloseClick();
  } catch (err) {
    console.error(err);
    alert('Ocurrió un error inesperado al subir la publicación');
    handleCloseClick();
    throw err;
  }
}

export default PostFeed;

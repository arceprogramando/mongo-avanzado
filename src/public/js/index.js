document.getElementById('noteForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  const form = event.target; // Obtener el formulario

  const titleInput = document.getElementById('title');
  const priceInput = document.getElementById('price');
  const statusSelect = document.getElementById('status');
  const stockInput = document.getElementById('stock');

  const formData = new FormData();
  formData.append('title', titleInput.value);
  formData.append('price', priceInput.value);
  formData.append('status', statusSelect.value);
  formData.append('stock', stockInput.value);

  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // La solicitud se realizó con éxito
      const data = await response.json();
      console.log(data); // Hacer algo con la respuesta del servidor
    } else {
      // La solicitud no se completó correctamente
      console.log('Error al realizar la solicitud:', response.status);
    }
  } catch (error) {
    console.log('Error de red:', error);
  }
});
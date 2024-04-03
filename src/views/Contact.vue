<template>
  <div class="container" style="margin-bottom: 40px;margin-top: 20px;">
    <h1 style="text-align: center;">Contacto</h1>
    <br>
    <div class="row">
      <div class="col-md-6">
        <h2>Información de Contacto</h2>
        <p>¡Estamos aquí para ayudarte! Ponte en contacto con nosotros para cualquier consulta o pregunta que tengas
          sobre nuestros cursos y servicios.</p>
        <ul>
          <li><strong>Teléfono:</strong> +57 313 3457896</li>
          <li><strong>Correo electrónico:</strong> info@proyectocafe.com</li>
          <li><strong>Dirección:</strong> Av. Los Estudiantes #9-82, Bucaramanga, Colombia</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h2>Formulario de Contacto</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="name" v-model="formData.name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="email" v-model="formData.email" required>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Mensaje</label>
            <textarea class="form-control" id="message" v-model="formData.message" rows="4" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar mensaje</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes implementar la lógica para enviar el formulario
      console.log('Formulario enviado:', this.formData);
      // Por ejemplo, puedes hacer una solicitud HTTP POST utilizando axios
      axios.post('http://localhost:5000/email/contact', this.formData)
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: response.data.message,
            timer: 1500
          });
          // Limpiar los campos del formulario
          this.formData.name = '';
          this.formData.email = '';
          this.formData.message = '';
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
          });
          //console.error('Error al enviar el formulario:', error);
        });
    }
  }
};
</script>

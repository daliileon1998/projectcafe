<template>
  <div class="d-flex" id="wrapper">
    <!-- Page Content -->
    <div id="page-content-wrapper" class="col-md-10">

      <div class="container-fluid">
        <div class="row justify-content-center"> <!-- Alinear el contenido al centro horizontalmente -->
          <div class="col-md-6 text-center"> <!-- Utilizar la mitad del ancho de la página para el texto -->
            <h1 class="text-center" style="font-size:60px;margin-top: 15px;">Curso</h1>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-2">
            <h2 style="text-align: center;">Modulos Cursos</h2> <!-- Utilizar 3 columnas -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3"> <!-- Añadir margen inferior -->
              <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column" style="width: 100%;">
                      <button class="nav-link btn btn-primary gold btn-lg mb-3 modulo-button text-white" aria-current="page">Modulo 1</button>
                    <button class="nav-link btn btn-primary gold btn-lg mb-3 modulo-button text-white">Modulo 2</button>
                    <button class="nav-link btn btn-primary gold btn-lg mb-3 modulo-button text-white">Modulo 3</button>
                    <button class="nav-link btn btn-primary gold btn-lg mb-3 modulo-button text-white">Modulo 4</button>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div class="col-md-8"> <!-- Utilizar 8 columnas -->
            <div class="row justify-content-center align-items-center" style="height: 100%;"> <!-- Alinear el contenido al centro horizontalmente y verticalmente -->
              <img src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg" alt="Imagen" style="width: 100%; height: auto;"> <!-- Ajustar el tamaño de la imagen -->
              <div style="text-align: center; padding: 20px;"> <!-- Centrar la descripción horizontalmente y agregar espacio alrededor del texto -->
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, deleniti, neque vitae iste iure culpa sapiente, adipisci corporis hic accusantium doloremque architecto porro voluptatum nulla reiciendis? Excepturi voluptatum deleniti necessitatibus eveniet, quasi blanditiis fugiat, veritatis reprehenderit officiis fugit, eos quam eum enim est! Labore possimus est ab, harum fugit dicta, nam eos, corporis cupiditate obcaecati quod unde? Quam, et? Possimus adipisci tempora, impedit laudantium cupiditate temporibus, maiores, eaque placeat blanditiis dignissimos distinctio. Nesciunt aspernatur totam voluptate dolores, voluptatum quos reiciendis autem. Ipsa temporibus sed architecto neque? Dolore, commodi quaerat. Illum vero, eum optio magni tenetur dolorum exercitationem voluptas. Rem, officiis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <!-- /#page-content-wrapper -->
  </div>
  <!-- /#wrapper -->
</template>

<style>

.gold {
  background-color: #efb810 !important; /* Código hexadecimal para el color dorado */
  border-color: #FFD700 !important; /* Puedes ajustar el color del borde si es necesario */
}

.modulo-button {
  font-size: 20px !important;
}

</style>

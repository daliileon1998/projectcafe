<template>
    <div class="d-flex" id="wrapper">
      <!-- Page Content -->
      <div id="page-content-wrapper" class="col-md-10">
  
        <div class="container-fluid">
          <div class="row justify-content-center"> <!-- Alinear el contenido al centro horizontalmente -->
            <div class="col-md-6 text-center"> <!-- Utilizar la mitad del ancho de la página para el texto -->
              <h1 class="text-center" style="font-family: 'Caveat', cursive;font-size: 75px;margin-top: 10px;">Curso</h1>
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
                <h3 style="font-family: 'Caveat', cursive;font-size: 50px;text-align: center;">Modulo 1</h3>
                <img src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg" alt="Imagen" style="width:800px; height: 161px;"> <!-- Ajustar el tamaño de la imagen -->
                <h3 style="font-family: 'Caveat', cursive;font-size: 50px;">Lección 1</h3>
                <div>Actividades</div>
                <h3>Lección 1</h3>
                <div>Actividades</div>
                <h3>Lección 1</h3>
                <div>Actividades</div>
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
  
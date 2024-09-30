<?php
    include("conexion.php");

    if(isset($_POST['name'])) {
        if(!empty($_POST['name']) && !empty($_POST['password']) && !empty($_POST['email']) && !empty($_POST['phone'])) {
            $name = trim($_POST['name']);
            $password = trim($_POST['password']);
            $email = trim($_POST['email']);
            $phone = trim($_POST['phone']);
            $fecha = date("d/m/Y");
            $consulta = "INSERT INTO datos(nombre, contraseña, email, telefono, fecha) VALUES ('$name', '$password', '$email', '$phone', '$fecha')";
            $resultado = mysqli_query($conex, $consulta);

            if($resultado) {
                echo "<h3 class='success'>Tu registro se ha completado</h3>";
            } else {
                echo "<h3 class='error'>Ocurrió un error</h3>";
            }
        } else {
            echo "<h3 class='error'>Llena todos los campos</h3>";
        }
    }
?>

<?php
    $conex = mysqli_connect("localhost", "root", "", "formulario");

    if(!$conex) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
    
?>
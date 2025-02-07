//Obtenemos el canvas y referencia del contexto para pintar un rectangulo
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Obtenemos la info de los pixeles como un imageData
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//Desestructuramos la variable imageData en sus 3 componentes
const {width, height, data} = imageData; //data es un array q contiene su RGBA

//Convertimos a un tensor 3d con forma [alto, ancho, 3] (que incluye el RGB dejando el alpha fuera)
const tensorRGB = tf.tidy( () => {
    //Convertir a tensor de 1d
    let tensor = tf.tensor1d(data, 'int32'); //Para pasarlos a num enteros
    //reorganizamos en [alto, ancho, 4] (con RGBA)
    tensor = tensor.reshape([height, width, 4]);

    // ** El -1 en slice (start, size) se refiere a que tome todo el tamaño disponible en esa dimensión
    // Y eliminamos el canal alfa (q es la últ dimensión)
    return tensor.slice([0, 0, 0], [-1, -1, 3]) //Para mantener solo el RGB
});




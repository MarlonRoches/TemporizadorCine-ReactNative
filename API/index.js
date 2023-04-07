const express = require('express');
const app = express();
const fs = require('fs');
const fileName = '/Users/marlonroches/Documents/data.json'; // ruta del archivo

app.use(express.json()); // permite recibir datos en formato JSON

// Endpoint para la raíz
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

// Endpoint POST
app.post('/sendData', (req, res) => {
    // const { startTime, queueEndTime, attendEndTime, totalTime, nickname, key } = req.body;
    // console.log(req.body)
    // Aquí se puede procesar la información recibida
    console.log(req.body)
    addOrUpdateObject((req.body))
    res.send({mes:'Petición POST recibida', data: JSON.stringify(req.body)} );
  });  
// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});


// Función para leer los datos del archivo
function readData() {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName, 'utf-8');
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  
  // Función para escribir los datos en el archivo
  function writeData(data) {
    fs.writeFileSync(fileName, JSON.stringify(data), 'utf-8');
  }
  
  // Función para agregar o actualizar un objeto en el archivo
  function addOrUpdateObject(obj) {
    const data = readData(); // Leer los datos del archivo
    const index = data.findIndex(item => item.key === obj.key); // Buscar el índice del objeto con la misma clave
  
    if (index === -1) {
      data.push(obj); // Si no existe un objeto con la misma clave, lo inserta en el arreglo
    } else {
      data[index] = obj; // Si existe un objeto con la misma clave, lo actualiza
    }
  
    writeData(data); // Escribir los datos actualizados en el archivo
  }

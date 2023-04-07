import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput , StyleSheet} from 'react-native';

const urlAPI = "https://b1ee-190-148-252-51.ngrok.io/sendData"

export default Timer = ({id, Operador}) => {
  const [startTime, setStartTime] = useState(null);
  const [queueEndTime, setQueueEndTime] = useState(null);
  const [attendEndTime, setAttendEndTime] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [nickname, setNickname] = useState('');
  const [idNumber, setIdNumber] = useState(id);
  const [ope, setOperador] = useState(Operador);

    // alert(idNumber)
  const startTimer = () => {
    setStartTime(new Date());
    setQueueEndTime(null)
    setAttendEndTime(null)
    setTotalTime(null)
  };

  const markQueueEnd = () => {
    setQueueEndTime(new Date());
  };

  const markAttendEnd = () => {
    setAttendEndTime(new Date());
  };
  const getStateData=() =>{
    const data= {
        startTime:startTime,
        queueEndTime:queueEndTime,
        attendEndTime:attendEndTime,
        totalTime:totalTime,
        nickname:nickname,
        key:`${ope} - ${idNumber}`
    }
    return (JSON.stringify(data))
  }

  const calculateTotalTime = () => {
    const queueTime = queueEndTime - startTime;
    const attendTime = attendEndTime - queueEndTime;
    const totalTime = queueTime + attendTime;
    setTotalTime(totalTime);
    SenData( getStateData(),urlAPI)
  };

  const renderTimer = () => {
    if (!startTime) {
      return <Text>Presione el botón "Inicio" para comenzar el temporizador.</Text>;
    } else if (!queueEndTime) {
      return <Text>Presione el botón "Fin de cola" cuando finalice la espera en la cola.</Text>;
    } else if (!attendEndTime) {
      return <Text>Presione el botón "Fin de atender" cuando finalice la atención.</Text>;
    } else {
      return <Text>Tiempo total de atención: {totalTime/1000} segundos.</Text>;
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del temporizador"
        onChangeText={(value) => setNickname(value)}
        value={nickname}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startTimer}>
          <Text style={styles.buttonText}>Inicio</Text>
          <Text>StarTime: {formatTime(startTime)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.redButton]} onPress={markQueueEnd}>
          <Text style={styles.buttonText}>Fin de cola</Text>
          <Text>Fin Cola: {formatTime(queueEndTime)}</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.orangeButton]} onPress={markAttendEnd}>
          <Text style={styles.buttonText}>Fin de atender</Text>
          <Text>Tiempo Atencion: {formatTime(attendEndTime)}</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={calculateTotalTime}>
          <Text style={styles.buttonText}>Tiempo de atención</Text>
        </TouchableOpacity>
      </View>
      {renderTimer()}
    </View>
  );
};

function formatTime(date) {
    if (date === null || date === undefined) {
      return '0';
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  
function SenData(data, url) {
    fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: data,
})
  .then(response => response.json())
  .then(data => console.log("todo ok"))
  .catch(error => console.error(error));

}

const styles = StyleSheet.create ({
    // container: {
    //   alignItems: 'center',
    //   marginTop: 60
    // },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: "center",
      marginVertical: 20,
      width: '100%',
    //   backgroundColor: "re d"
    },
    button: {
      backgroundColor: '#5cb85c',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: "25%",
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    redButton: {
      backgroundColor: '#d9534f',
    },
    orangeButton: {
      backgroundColor: '#f0ad4e',
    },
    blueButton: {
      backgroundColor: '#337ab7',
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
    //   marginBottom: 5,
      width: '80%',
    },
  });
  
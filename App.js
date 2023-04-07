import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import Timer from './Components/Timer';

const App = () => {
  const [timers, setTimers] = useState([]);
  const [logged, setLogged] = useState(false)
  const [Operador, setOperador] = useState('');

  const scrollViewRef = useRef();

  const handleAddTimer = () => {
    const newTimer = <Timer key={timers.length.toString()}  id={timers.length.toString()} Operador={Operador}/>;
    setTimers([...timers, newTimer]);
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  const Selection=()=>{
    if (logged) {
      return ( <View style={[styles.container, Platform.select({android: {marginTop: '5%'}})]}>
      <ScrollView ref={scrollViewRef}>
        {timers.map((timer) => {
          return (
            <>
              <Separador id={timer.key} />
              {timer}
            </>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleAddTimer}>
        <Text style={styles.buttonText}>Agregar Timer</Text>
      </TouchableOpacity>
    </View>)
    } else {
      return (<Login/>)
    }
  }
  
  const Login = () => {
    const [nickname, setNickname] = useState('');
  
    const handlePress = () => {
      alert(`¡Hola ${nickname}!`);
      setOperador(nickname)
      setLogged(true)
    };
  
    return (
      <>
        <Text>¿Quién opera el teléfono?</Text>
        <TextInput
          style={stylesLogin.input}
          placeholder="Ingresa tu nombre"
          onChangeText={setNickname}
          value={nickname}
        />
        <TouchableOpacity style={stylesLogin.button} onPress={handlePress}>
          <Text style={stylesLogin.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView>
      {/* <Text>xd</Text> */}
     <Selection/>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    maxHeight: '100%', // establecer altura máxima del contenedor
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

const stylesLogin = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

function Separador({ id }) {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text style={{ width: 50, textAlign: 'center' }}>{id}</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
    </>
  );
}

export default App;

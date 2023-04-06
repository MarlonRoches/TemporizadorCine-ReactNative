import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import Timer from './Components/Timer';

const App = () => {
  const [timers, setTimers] = useState([]);
  const scrollViewRef = useRef();

  const handleAddTimer = () => {
    const newTimer = <Timer key={timers.length.toString()} />;
    setTimers([...timers, newTimer]);
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, Platform.select({android: {paddingTop: '3%'}})]}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    maxHeight: '100%', // establecer altura máxima del contenedor
  },
  button: {
    backgroundColor: '#5cb85c',
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

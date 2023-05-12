import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button,Text, View, TouchableOpacity} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';


export function ScannerQr() {
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions =  () => {
      const { status } =  BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text >No access to camera</Text>;
  }

  return (
    <View style={styles.item} >
      <Text style={styles.title}>Scan QR Code</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.absoluteFillObject} />
          {
            scanned &&  <View style={styles.buttonContainer}>
                          <Button color={"#ff5f"} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                        </View>
                        
          }
    </View>
    );
}

export default function App() {
  return (
    <View style={styles.container}>
      
      
      <ScannerQr />

    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#965',
    margin: 15
  },
  item: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#455',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    bottom: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#23f',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  },
  absoluteFillObject: {
    position: 'absolute',
    backgroundColor: '#458',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    bottom: 50,
    width: 350,
    height: 300
  }
});

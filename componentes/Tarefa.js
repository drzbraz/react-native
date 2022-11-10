import React, { useState } from 'react'
import { Text, View, TextInput, Keyboard, TouchableOpacity, Image } from 'react-native'
import styles from '../estilos'

export default function Tarefa(props) {
  const [musica, setMusica] = useState(props.musica)
  const [altera, setAltera] = useState(false)
  const confirma = () => {
    setAltera(false)
    Keyboard.dismiss
    props.onAltera(props.id, musica)
  }

  return altera ? (
    <View>
      <TextInput
        style={styles.input}
        defaultValue={musica}
        onChangeText={(musica) => setMusica(musica)}
        onSubmitEditing={confirma}
        onBlur={confirma}
        autoFocus
      />
    </View>
  ) : (
    <View style={styles.li}>
      <Text style={styles.liText}>{props.musica}</Text>
      <TouchableOpacity onPress={() => setAltera(true)}>
        <View style={[styles.button, styles.primary]}>
          <Image source={require('../assets/edit1.png')} style={styles.buttonImg} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onApaga(props.id)}>
        <View style={[styles.button, styles.danger]}>
          <Image source={require('../assets/delete1.png')} style={styles.buttonImg} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

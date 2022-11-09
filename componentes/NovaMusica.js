import React, { useState } from 'react'
import { Text, View, FlatList, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native'
import styles from '../estilos'
import Tarefa from './Tarefa'
import { Link } from 'react-router-native'

export default function NovaMusica(props) {
  const [campo, setCampo] = useState('')
  const adiciona = () => {
    props.onAdiciona(campo)
    setCampo('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.component}>
      <View style={styles.componentHeader}>
        <Text style={styles.h1}>Adicionar música</Text>
      </View>
      <View style={styles.componentContent}>
        <View style={[styles.field, styles.mt2]}>
          <TextInput
            style={styles.input}
            placeholder="Artista"
            defaultValue={campo}
            onChangeText={(campo) => setCampo(campo)}
            onSubmitEditing={adiciona}
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Música"
            defaultValue={campo}
            onChangeText={(campo) => setCampo(campo)}
            onSubmitEditing={adiciona}
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Url"
            defaultValue={campo}
            onChangeText={(campo) => setCampo(campo)}
            onSubmitEditing={adiciona}
            onBlur={Keyboard.dismiss}
          />
          <Link to="/musica">
            <View style={[styles.button, styles.primary]}>
              <Image source={require('../assets/plus1.png')} style={styles.buttonImg} />
            </View>
          </Link>
        </View>
      </View>
    </View>
  )
}

import React, { useState } from 'react'
import { Text, View, FlatList, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native'
import styles from '../estilos'
import Tarefa from './Tarefa'
import { Link } from 'react-router-native'

export default function NovaMusica(props) {
  const [artista, setArtista] = useState('')
  const [musica, setMusica] = useState('')
  const [url, setUrl] = useState('')

  const adiciona = () => {
    props.onAdiciona(musica)
    setArtista('')
    setMusica('')
    setUrl('')
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
            value={artista}
            onChangeText={(artista) => setArtista(artista)}
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Música"
            value={musica}
            onChangeText={(musica) => setMusica(musica)}
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Url"
            value={url}
            onChangeText={(url) => setUrl(url)}
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity onPress={() => adiciona()}>
            <View style={[styles.button, styles.primary]}>
              <Image source={require('../assets/plus1.png')} style={styles.buttonImg} />
            </View>
          </TouchableOpacity>
          <Link to="/" style={styles.mt4}>
            <View style={[styles.primary, { alignItems: 'center', borderWidth: 1, borderRadius: 15 }]}>
              <Text style={{ padding: 20, fontSize: 20, color: 'white' }}>Voltar</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  )
}

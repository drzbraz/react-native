import React, { useState } from 'react'
import { Text, View, FlatList, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native'
import styles from '../estilos'
import Tarefa from './Tarefa'
import { Link } from 'react-router-native'

export default function Tarefas(props) {
  const [campo, setCampo] = useState('')
  const adiciona = () => {
    props.onAdiciona(campo)
    setCampo('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.component}>
      <View style={styles.componentHeader}>
        <Text style={styles.h1}>Playlist - Total {props.tarefas.length}</Text>
      </View>
      <View style={styles.componentContent}>
        {props.tarefas.length === 0 ? (
          <View style={styles.blank}>
            <Image source={require('../assets/headphone.png')} style={styles.blankImg} />
            <Text>Sem músicas por aqui</Text>
          </View>
        ) : (
          <FlatList
            data={props.tarefas}
            renderItem={({ item }) => (
              <Tarefa id={item.id} descricao={item.descricao} onAltera={props.onAltera} onApaga={props.onApaga} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.liSeparator} />}
            ListFooterComponent={() => <View style={styles.liSeparator} />}
            style={styles.list}
          />
        )}
        <View style={[styles.field, styles.mt2]}>
          <TextInput
            style={styles.input}
            placeholder="Nova música"
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

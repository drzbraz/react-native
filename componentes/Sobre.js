import React from 'react'
import { Text, View } from 'react-native'
import styles from '../estilos'
import { Link } from 'react-router-native'

export default function Sobre() {
  return (
    <View style={styles.component}>
      <View style={styles.componentHeader}>
        <Text style={styles.h1}>Sobre...</Text>
      </View>
      <View style={[styles.componentContent, { justifyContent: 'flex-start' }]}>
        <Text style={[styles.h2, styles.mt2]}>SpotiMy</Text>
        <Text style={[styles.h3, styles.mt1]}>Versão React 1.0.0</Text>
        <Text style={styles.mt2}>
          Aplicação mobile com o objetivo de armazenar as músicas favoritas do usuário, com o nome do artista, música e
          o link para ouvir.
        </Text>
        <Text>Autor: Daniel Braz - PUC Minas</Text>
        <Link to="/" style={styles.mt4}>
          <View style={[styles.primary, { alignItems: 'center', borderWidth: 1, borderRadius: 15 }]}>
            <Text style={{ padding: 20, fontSize: 20, color: 'white' }}>Voltar</Text>
          </View>
        </Link>
      </View>
    </View>
  )
}

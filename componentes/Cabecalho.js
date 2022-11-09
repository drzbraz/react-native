import React from 'react'
import { Text, View } from 'react-native'
import styles from '../estilos'
import { Link } from 'react-router-native'

export default function Cabecalho() {
  return (
    <View style={[styles.headerBar, styles.dark]}>
      <Link to="/sobre">
        <Text style={styles.appName}>SpotiMy</Text>
      </Link>
    </View>
  )
}

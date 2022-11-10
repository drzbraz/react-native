import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Alert, Text, TouchableOpacity } from 'react-native'
import styles from './estilos'
import Tarefas from './componentes/Tarefas'
import Cabecalho from './componentes/Cabecalho'
import Sobre from './componentes/Sobre'
import NovaMusica from './componentes/NovaMusica'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import { NativeRouter, Routes, Route } from 'react-router-native'

export default function App() {
  const [tarefas, setTarefas] = useState([])
  const [compativel, setCompativel] = useState(false)
  const [autenticavel, setAutenticavel] = useState(false)
  const [autenticado, setAutenticado] = useState(false)

  async function armazenaDados() {
    try {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas))
    } catch (error) {
      Alert.alert('As tarefas não foram armazenados')
    }
  }

  async function recuperaDados() {
    try {
      const t = await AsyncStorage.getItem('tarefas')
      if (t !== null) setTarefas(JSON.parse(t))
    } catch (error) {
      Alert.alert('As tarefas não foram carregadas')
    }
  }

  async function verificaCompatibilidade() {
    let comp = await LocalAuthentication.hasHardwareAsync()
    if (comp) setCompativel(true)
    let aut = await LocalAuthentication.isEnrolledAsync()
    if (aut) setAutenticavel(true)
  }

  const autenticar = async () => {
    let auted = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autorização'
    })
    if (auted.success) setAutenticado(true)
  }

  useEffect(() => {
    recuperaDados()
    verificaCompatibilidade()
  }, [])

  useEffect(() => {
    armazenaDados()
  }, [tarefas])

  const adicionaTarefa = (t) => {
    if (t.length > 0) {
      const novaTarefa = {
        id: Math.random().toString(),
        musica: t.musica,
        artista: t.artista,
        url: t.url
      }

      setTarefas([...tarefas, novaTarefa])
    }
  }
  const alteraTarefa = (id, t) => {
    const i = tarefas.findIndex((x) => x.id === id)
    let novaLista = [...tarefas]
    novaLista[i].descricao = t
    setTarefas(novaLista)
  }
  const apagaTarefa = (id) => setTarefas(tarefas.filter((t) => t.id !== id))

  return !compativel || !autenticavel || autenticado ? (
    <NativeRouter>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.app}>
        <View style={styles.conteudo}>
          <Cabecalho pendentes={tarefas.length} />
          <Routes>
            <Route
              path="/"
              element={
                <Tarefas
                  tarefas={[
                    {
                      id: Math.random().toString(),
                      musica: 'testaa1',
                      artista: 'test',
                      url: 'url'
                    },
                    {
                      id: Math.random().toString(),
                      musica: 'testaa2',
                      artista: 'test',
                      url: 'urla'
                    }
                  ]}
                  onAdiciona={adicionaTarefa}
                  onAltera={alteraTarefa}
                  onApaga={apagaTarefa}
                />
              }
            />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/musica" element={<NovaMusica onAdiciona={adicionaTarefa} tarefas={tarefas} />} />
          </Routes>
        </View>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </NativeRouter>
  ) : (
    <View style={styles.login}>
      <Text style={styles.loginTitulo}>SpotiMy 1.0</Text>
      <TouchableOpacity style={styles.loginBotao} onPress={autenticar}>
        <Text style={styles.loginBotaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}

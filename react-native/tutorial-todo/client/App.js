import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Task from './components/Task';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {InputTask} from './components/InputTask';

export default function App() {
  const [todos, setTodos] = useState([]);

  async function fetchData() {
    const response = await fetch('http://192.168.18.24:8080/todos/1');
    const data = await response.json();

    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {...todo, completed: todo.completed === 1 ? 0 : 1}
          : todo
      )
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
              data={todos}
              keyExtractor={(todo, index) =>
                todo.id ? todo.id.toString() : index.toString()
              }
              renderItem={({item}) => {
                // console.log('Rendering item:', item);

                return (
                  <Task
                    {...item}
                    toggleTodo={toggleTodo}
                    clearTodo={clearTodo}
                  />
                );
              }}
              ListHeaderComponent={() => (
                <Text style={styles.title}>Today</Text>
              )}
              contentContainerStyle={styles.contentContainerStyle}
            />

            <InputTask todos={todos} setTodos={setTodos} />
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9ef',
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 15,
  },
});

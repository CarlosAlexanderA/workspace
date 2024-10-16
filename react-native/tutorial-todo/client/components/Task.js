import {Feather} from '@expo/vector-icons';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SharedTodoModalContent} from './SharedTodoModalContent';

function CheckMark({id, completed, toggleTodo}) {
  async function toggle() {
    const response = await fetch(`http://192.168.18.24:8080/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });

    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }
  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        {backgroundColor: completed === 0 ? '#e9e9ef' : '#0ea5e9'},
      ]}
    ></Pressable>
  );
}

export default function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
}) {
  const [isDeleteActive, setIsDeleteActive] = useState(false);

  // modales
  const bottomSheetModalRef = useRef(null);
  const sharedBottomSheetRef = useRef(null);

  // que tanto de la pantalla se va a mostrar
  const snapPoints = useMemo(() => ['25%', '48%', '75%'], []);
  const snapPointsShared = useMemo(() => ['40%', '50%'], []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentShared = useCallback(() => {
    sharedBottomSheetRef.current?.present();
  }, []);

  async function deleteTodo() {
    const response = await fetch(`http://192.168.18.24:8080/todos/${id}`, {
      method: 'DELETE',
    });

    clearTodo(id);
    console.log(response.status);
  }

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={styles.text}>{title}</Text>
      </View>
      {shared_with_id !== null ? (
        <Feather
          onPress={handlePresentModal}
          name="users"
          size={20}
          color="#383839"
        />
      ) : (
        <Feather
          onPress={handlePresentShared}
          name="share"
          size={20}
          color="#383839"
        />
      )}
      {isDeleteActive && (
        <Pressable
          // onPress={deleteTodo}
          style={styles.deleteButton}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>x</Text>
        </Pressable>
      )}

      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{borderRadius: 50, borderWidth: 4}}
      >
        <BottomSheetView style={styles.contentContainer}>
          <SharedTodoModalContent
            id={id}
            title={title}
            share_with_id={shared_with_id}
            completed={completed}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#383839',
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  title: {
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 14,
  },
  subTitle: {
    color: '#101318',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    color: '#56636f',
    fontSize: 13,
    fontWeight: 'normal',
    width: '100%',
  },
});

// me quede en 1:28:50 / 1:44:25

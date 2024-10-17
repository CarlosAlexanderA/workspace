import {AntDesign} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';

export function InputTask({todos, setTodos}) {
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0.1));

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      // Primero mostramos los emojis
      setShowEmojies(true);

      // Luego animamos la opacidad a 1 (visible)
      Animated.timing(fadeAnim, {
        toValue: 1, // Full visibility
        duration: 500,
        useNativeDriver: true, // Animación más eficiente
      }).start();
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      // Una vez la animación termina, ocultamos los emojis
      setShowEmojies(false);
      // Animamos la opacidad a 0 (oculto)
      Animated.timing(fadeAnim, {
        toValue: 0, // Total transparencia
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (messageBody === '') {
      return;
    } else {
      const response = await fetch(`http://192.168.18.24:8080/todos`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          user_id: 1,
          title: messageBody,
        }),
      });

      const newTodo = await response.json();
      console.log(newTodo);

      setTodos((prev) => [...prev, {...newTodo, shared_with_id: null}]);

      Keyboard.dismiss();
      setMessageBody('');
    }
  };

  const RenderEmoji = ({emoji}) => (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={'transparent'}
      onPress={() => setMessageBody(messageBody + emoji)}
    >
      <Text style={styles.emoji}>{emoji}</Text>
    </TouchableHighlight>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {showEmojies && (
          <Animated.View style={[styles.emojiesContainer, {opacity: fadeAnim}]}>
            <RenderEmoji emoji="✅" />
            <RenderEmoji emoji="🚨" />
            <RenderEmoji emoji="📑" />
            <RenderEmoji emoji="🎁" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🎉" />
            <RenderEmoji emoji="🏃" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write a new task"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />

          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="checkcircle"
              size={40}
              color={messageBody ? 'black' : '00000050'}
              style={{paddingLeft: 5}}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: '#00000030',
    alignItems: 'baseline',
  },
  emojiesContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingLeft: 10,
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 25,
    paddingVertical: 5,
    marginRight: 10,
  },

  containerTextInput: {
    width: windowWidth - 100,
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 16,
    paddingVertical: 5,
    borderColor: 'lightgray',
    backgroundColor: '#fff',
    marginBottom: 5,
    fontWeight: '600',
  },
});

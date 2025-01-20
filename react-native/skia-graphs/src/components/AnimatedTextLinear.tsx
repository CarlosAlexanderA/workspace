import {useWindowDimensions} from 'react-native';

import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Canvas, SkFont, Text} from '@shopify/react-native-skia';

type Props = {
  font: SkFont;
  selectedValue: SharedValue<number>;
};

export const AnimatedTextLinear = ({font, selectedValue}: Props) => {
  const {width} = useWindowDimensions();
  const MARGIN_VERTICAL = 80;

  //* convertir el valor seleccionado a un string usando => useDerivedValue
  const animatedText = useDerivedValue(
    () => `$${Math.round(selectedValue.value)}`
  );

  const fontSize = font.measureText('0');

  //* centar el texto en el canvas
  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(animatedText.value);
    return width / 2 - _fontSize.width / 2;
  });

  return (
    <Canvas style={{height: fontSize.height + MARGIN_VERTICAL}}>
      <Text
        font={font}
        text={animatedText}
        color={'white'}
        x={textX}
        y={fontSize.height + MARGIN_VERTICAL / 2}
      />
    </Canvas>
  );
};

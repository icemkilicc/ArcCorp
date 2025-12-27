import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: React.ComponentProps<typeof TextInput>['keyboardType'];
  autoCapitalize?: React.ComponentProps<typeof TextInput>['autoCapitalize'];
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  errorText?: string | null;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function FormTextInput({
  label,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
  errorText,
  disabled,
  style,
  testID,
}: Props) {
  const hasError = Boolean(errorText);
  const [secure, setSecure] = React.useState(Boolean(secureTextEntry));

  React.useEffect(() => {
    setSecure(Boolean(secureTextEntry));
  }, [secureTextEntry]);

  const right =
    secureTextEntry === true
      ? (
          <TextInput.Icon
            icon={secure ? 'eye' : 'eye-off'}
            onPress={() => setSecure(s => !s)}
            forceTextInputFocus={false}
          />
        )
      : undefined;

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secure}
        error={hasError}
        disabled={disabled}
        style={style}
        testID={testID}
        right={right}
      />
      <HelperText type="error" visible={hasError}>
        {errorText ?? ' '}
      </HelperText>
    </>
  );
}



